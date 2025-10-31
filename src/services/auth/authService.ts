import type { RegisterFormData } from '@/schemas/auth/registerSchema';

type Response<T> = {
	status: number;
	success: boolean;
	message: string;
	data?: T;
	errors?: { [key: string]: any };
};

const registerUser = async (
	body: RegisterFormData
): Promise<Response<{ username: string; password: string }>> => {
	const res = await fetch('/@api/auth/register', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	});

	const data = await res.json();
	return data;
};

export const authService = {
	registerUser,
};
