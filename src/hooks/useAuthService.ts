import { useFetch, type FetchOptions } from '@/hooks/useFetch';
import type {
	LoginFormData,
	RegisterFormData,
} from '@/schemas/auth/registerSchema';

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
