import { useFetch, type FetchOptions } from '@/hooks/useFetch';
import type {
	RegisterFormData,
} from '@/schemas/auth/registerSchema';
import type {
	LoginFormData,
} from '@/schemas/auth/loginSchema';
import z from 'zod';
import type { User } from '@/types/domain/user';
import type { ApiResponse } from '@/types/api/response';

type AuthServiceOptions = {
	registerUser?: FetchOptions;
	loginUser?: FetchOptions;
	getAuthenticatedUserData?: FetchOptions;
};


type RegisterData = {
	id: number,
	profile: {
		id: number,
		firstName: string,
		lastName: string,
	}
};

type LoginData = { accessToken: string };

export function useAuthService(options?: AuthServiceOptions) {
	const { fetchJson } = useFetch();

	const registerUser = (body: RegisterFormData) =>
		fetchJson<RegisterData>(
			'/@api/auth/register',
			{
				method: 'POST',
				body: JSON.stringify(body),
				...options?.registerUser,
			}
		);

	const loginUser = (body: LoginFormData) => {
		const isEmail = z.email().safeParse(body.identifier).success;

		const payload = {
			...(isEmail ? { email: body.identifier } : { username: body.identifier }),
			password: body.password,
		};

		return fetchJson<LoginData>('/@api/auth/login', {
			method: 'POST',
			body: JSON.stringify(payload),
			...options?.loginUser,
		});
	}
	const getAuthenticatedUserData = (token: string) =>
		fetchJson<User>('/@api/auth/me', {
			headers: { Authorization: `Bearer ${token}` },
			...options?.getAuthenticatedUserData,
		});

	return { registerUser, loginUser, getAuthenticatedUserData };
}
