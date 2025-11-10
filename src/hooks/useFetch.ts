import type { ApiResponse, ErrorResponse } from '@/types/api/response';
import { toastService } from '@/services/common/toastService';
import { isDev } from '@/services/utils/getEnvironmentMode';
import { isTokenExpired } from '@/services/utils/jwtUtils';
import { useAuth } from '@/context/AuthContext';
import { useCallback } from 'react';
import useLogout from './useLogout';

export interface FetchOptions extends RequestInit {
	toast?: boolean;
}

function isErrorResponse<T>(json: ApiResponse<T>): json is ErrorResponse {
	return json.success === false;
}

export function useFetch() {
	const { token } = useAuth();
	const { handleLogout } = useLogout();

	const fetchJson = useCallback(
		async <T>(
			url: string,
			options?: FetchOptions
		): Promise<ApiResponse<T> | never> => {
			try {
				if (token && isTokenExpired(token)) {
					handleLogout();
					throw new Error('Session Expired', {
						cause: 'Expired JWT',
					});
				}

				const { toast = false, ...fetchOptions } = options || {};
				const headers = {
					'Content-Type': 'application/json',
					...fetchOptions.headers,
				};

				const res = await fetch(url, {
					...fetchOptions,
					headers,
				});

				if (!res.ok && res.status >= 500) {
					throw new Error(`${res.statusText} ${res.status}`);
				}

				const json = (await res.json()) as ApiResponse<T>;

				// Context Free Errors
				if (isErrorResponse(json) && json.status >= 500) {
					throw new Error(json.message!);
				}

				// Context Errors (conditional toast)
				if (isErrorResponse(json)) {
					if (json.errors && toast) {
						toastService.error(
							`Error occurred: ${json.message}; Errors: ${Object.values(json.errors).join(', ')}`
						);
						return json;
					}

					if (toast) {
						toastService.error(`Error occurred: ${json.message};`);
					}

					return json;
				}

				return json;
			} catch (err: any) {
				if (err.cause === 'Expired JWT') {
					toastService.error(err.message, 'Please log in again!', {
						duration: 10000,
					});
				} else {
					toastService.error(
						isDev
							? `Fetch Error: ${err.message}`
							: 'Oops! Something went wrong! Unexpected Error Occurred!'
					);
				}

				throw err;
			}
		},
		[token, handleLogout]
	);

	return { fetchJson };
}
