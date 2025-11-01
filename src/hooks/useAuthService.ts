import { useFetch, type FetchOptions } from '@/hooks/useFetch';
import type {
	LoginFormData,
	RegisterFormData,
} from '@/schemas/auth/registerSchema';

export type SuccessResponse<T> = {
	status: number;
	success: true;
	message: string | null;
	data: T;
};

export type ErrorResponse = {
	status: number;
	success: false;
	message: string | null;
	data: never;
	errors?: { [key: string]: any };
};

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

type AuthServiceOptions = {
	registerUser?: FetchOptions;
	loginUser?: FetchOptions;
	getAuthenticatedUserData?: FetchOptions;
};

export function useAuthService(options?: AuthServiceOptions) {
	const { fetchJson } = useFetch();

	const registerUser = (body: RegisterFormData) =>
		fetchJson<{ username: string; password: string }>(
			'/@api/auth/register',
			{
				method: 'POST',
				body: JSON.stringify(body),
				...options?.registerUser,
			}
		);

	const loginUser = (body: LoginFormData) =>
		fetchJson<{ accessToken: string }>('/@api/auth/login', {
			method: 'POST',
			body: JSON.stringify(body),
			...options?.loginUser,
		});

	const getAuthenticatedUserData = (token: string) =>
		fetchJson<{ username: string }>('/@api/auth/me', {
			headers: { Authorization: `Bearer ${token}` },
			...options?.getAuthenticatedUserData,
		});

	return { registerUser, loginUser, getAuthenticatedUserData };
}
