import { render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter, useResolvedPath } from 'react-router';
import { LoginForm } from './LoginForm';
import userEvent from '@testing-library/user-event';
import { ErrorResponse, SuccessResponse } from '@/types/api/response';

const login = jest.fn();
const loginUser = jest.fn();
const navigate = jest.fn();

jest.mock('@/context/AuthContext', () => ({
	useAuth: () => ({
		login,
	}),
}));

jest.mock('@/hooks/useAuthService', () => ({
	useAuthService: () => ({
		loginUser,
	}),
}));

jest.mock('react-router', () => ({
	...jest.requireActual('react-router'),
	useNavigate: () => navigate,
}));

describe('LoginForm', () => {
	beforeEach(() => jest.clearAllMocks());

	it('should render all form elements', () => {
		render(
			<MemoryRouter>
				<LoginForm />
			</MemoryRouter>
		);

		expect(screen.getByText('Login to your account', { exact: true })).toBeInTheDocument();
		expect(screen.getByText(/enter your email or username below/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/email or username/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /sign up/i })).toBeInTheDocument();
	});

	it('should submit form with user credentials', async () => {
		const mockResponse = {
			success: true,
			data: { accessToken: 'fake-token' },
			status: 200,
			message: null,
		} as SuccessResponse<{ accessToken: string }>;

		loginUser.mockResolvedValue(mockResponse);

		const user = userEvent.setup();

		render(
			<MemoryRouter>
				<LoginForm />
			</MemoryRouter>
		);

		await user.type(screen.getByLabelText(/email or username/i), 'test123');
		await user.type(screen.getByLabelText(/password/i), 'test123');

		await user.click(screen.getByRole('button', { name: /login/i }));

		await waitFor(() => {
			expect(loginUser).toHaveBeenCalledWith({
				identifier: 'test123',
				password: 'test123',
			});
		});

		expect(login).toHaveBeenCalledWith(mockResponse.data.accessToken);
		expect(navigate).toHaveBeenCalledWith('/');
	});

	it('should show error element when submit and response has errors', async () => {
		const mockResponse = {
			success: false,
			status: 401,
			message: 'Invalid Credentials',
		} as ErrorResponse;

		loginUser.mockResolvedValue(mockResponse);

		const user = userEvent.setup();

		render(
			<MemoryRouter>
				<LoginForm />
			</MemoryRouter>
		);

		await user.type(screen.getByLabelText(/email or username/i), 'test123');
		await user.type(screen.getByLabelText(/password/i), 'test123');
		await user.click(screen.getByRole('button', { name: /login/i }));

		await waitFor(() => {
			expect(loginUser).toHaveBeenCalledWith({
				identifier: 'test123',
				password: 'test123',
			});
		});

		await waitFor(() => {
			const alert = screen.getByRole('alert');
			expect(alert).toBeInTheDocument();

			expect(within(alert).getByText('Login Failed')).toBeInTheDocument();
			expect(within(alert).getByText(mockResponse.message)).toBeInTheDocument();
		});

		expect(login).not.toHaveBeenCalled();
		expect(navigate).not.toHaveBeenCalledWith('/');
	});
});
