import type { ApiResponse, ErrorResponse } from '@/types/api/response';
import { toastService } from '@/services/common/toastService';
import { isDev } from '@/services/utils/getEnvironmentMode';
import { useCallback } from 'react';

export interface FetchOptions extends RequestInit {
	toast?: boolean;
}

function isErrorResponse<T>(json: ApiResponse<T>): json is ErrorResponse {
	return json.success === false;
}

export function useFetch() {
	const fetchJson = useCallback(
		async <T>(
			url: string,
			options?: FetchOptions
		): Promise<ApiResponse<T> | never> => {
			try {
				const { toast = false, ...fetchOptions } = options || {};

				const res = await fetch(url, {
					headers: { 'Content-Type': 'application/json' },
					...fetchOptions,
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
				toastService.error(
					isDev
						? `Fetch Error: ${err.message}`
						: 'Oops! Something went wrong! Unexpected Error Occurred!'
				);
				throw err;
			}
		},
		[]
	);

	return { fetchJson };
}
