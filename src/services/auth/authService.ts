import type {
	LoginFormData,
	RegisterFormData,
} from '@/schemas/auth/registerSchema';

type Response<T> = {
	status: number;
	success: boolean;
	message: string; // TODO: Should type it properly because backends returns string | null
	data?: T;
	errors?: { [key: string]: any };
};

const registerUser = async (
	body: RegisterFormData
): Promise<Response<{  username: string; password: string  }>> => {
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

const loginUser = async (
	body: LoginFormData
): Promise<Response<{  accessToken: string  }>> => {
	const res = await fetch('/@api/auth/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	});

	const data = await res.json();
	return data;
};

const getAuthenticatedUserData = async (token: string): Promise<Response<{username: string}>> => {
    const res = await fetch('/@api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    return data;
}

export const authService = {
	registerUser,
	loginUser,
    getAuthenticatedUserData,
};
