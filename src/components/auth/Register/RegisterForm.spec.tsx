import { render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { RegisterForm } from './RegisterForm';
import userEvent from '@testing-library/user-event';
import { ErrorResponse, SuccessResponse } from '@/types/api/response';
import { register } from 'module';

const navigate = jest.fn();
const registerUser = jest.fn();

jest.mock('@/services/utils/getEnvironmentMode', () => ({
	getEnvironmentMode: () => 'development',
	isDev: true,
	isProd: false,
}));

jest.mock('@/hooks/useAuthService', () => ({
	useAuthService: () => ({
		registerUser,
	}),
}));

jest.mock('react-router', () => ({
	...jest.requireActual('react-router'),
	useNavigate: () => navigate,
}));

describe('RegisterForm', () => {
	afterEach(() => jest.clearAllMocks());

	it('should render all form elements for step 1', () => {
		render(
			<MemoryRouter>
				<RegisterForm />
			</MemoryRouter>
		);

		expect(screen.getByText(/create an account/i)).toBeInTheDocument();
		expect(screen.getByText(/enter your account information below/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
		expect(screen.getByLabelText('Password', { exact: true })).toBeInTheDocument();
		expect(screen.getByLabelText('Confirm Password', { exact: true })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument();
	});

	it('should render all form elements for step 2', async () => {
		render(
			<MemoryRouter>
				<RegisterForm />
			</MemoryRouter>
		);

		const user = userEvent.setup();

		await user.type(screen.getByLabelText(/username/i), 'test123');
		await user.type(screen.getByLabelText(/email/i), 'test123@gmail.com');
		await user.type(screen.getByLabelText('Password', { exact: true }), 'test123');
		await user.type(screen.getByLabelText('Confirm Password', { exact: true }), 'test123');

		await user.click(screen.getByRole('button', { name: /next/i }));

		// step 2 visible
		expect(screen.getByText(/create an account/i)).toBeInTheDocument();
		expect(screen.getByText(/complete your profile/i)).toBeInTheDocument();

		expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();

		expect(screen.getByLabelText(/bio/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/description/i)).toBeInTheDocument();

		expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
	});

	it('should submit register form with user data', async () => {
		const mockResponse = {
			success: true,
			status: 200,
			message: null,
		} as SuccessResponse<any>;

		registerUser.mockResolvedValue(mockResponse);

		render(
			<MemoryRouter>
				<RegisterForm />
			</MemoryRouter>
		);

		const user = userEvent.setup();

		await user.type(screen.getByLabelText(/username/i), 'test123');
		await user.type(screen.getByLabelText(/email/i), 'test123@gmail.com');
		await user.type(screen.getByLabelText('Password', { exact: true }), 'test123');
		await user.type(screen.getByLabelText('Confirm Password', { exact: true }), 'test123');

		await user.click(screen.getByRole('button', { name: /next/i }));

		await user.type(screen.getByLabelText(/first name/i), 'John');
		await user.type(screen.getByLabelText(/last name/i), 'Doe');

		await user.type(screen.getByLabelText(/bio/i), 'Testing John Doe Bio');
		await user.type(screen.getByLabelText(/description/i), 'Testing John Doe Description');

		await user.click(screen.getByRole('button', { name: /create account/i }));

		await waitFor(() => {
			expect(registerUser).toHaveBeenCalledWith({
				username: 'test123',
				email: 'test123@gmail.com',
				password: 'test123',
				confirmPassword: 'test123',
				firstName: 'John',
				lastName: 'Doe',
				bio: 'Testing John Doe Bio',
				description: 'Testing John Doe Description',
			});
		});

		expect(navigate).toHaveBeenCalledWith('/login');
	});

	it('should show error element when submit and response has errors', async () => {
		const mockResponse = {
			success: false,
			status: 401,
			message: 'Username or email aready exists',
		} as ErrorResponse;

		registerUser.mockResolvedValue(mockResponse);

		render(
			<MemoryRouter>
				<RegisterForm />
			</MemoryRouter>
		);

		const user = userEvent.setup();

		await user.type(screen.getByLabelText(/username/i), 'test123');
		await user.type(screen.getByLabelText(/email/i), 'test123@gmail.com');
		await user.type(screen.getByLabelText('Password', { exact: true }), 'test123');
		await user.type(screen.getByLabelText('Confirm Password', { exact: true }), 'test123');

		await user.click(screen.getByRole('button', { name: /next/i }));

		await user.type(screen.getByLabelText(/first name/i), 'John');
		await user.type(screen.getByLabelText(/last name/i), 'Doe');

		await user.type(screen.getByLabelText(/bio/i), 'Testing John Doe Bio');
		await user.type(screen.getByLabelText(/description/i), 'Testing John Doe Description');

		await user.click(screen.getByRole('button', { name: /create account/i }));

		await waitFor(() => {
			expect(registerUser).toHaveBeenCalledWith({
				username: 'test123',
				email: 'test123@gmail.com',
				password: 'test123',
				confirmPassword: 'test123',
				firstName: 'John',
				lastName: 'Doe',
				bio: 'Testing John Doe Bio',
				description: 'Testing John Doe Description',
			});
		});

		await waitFor(() => {
			const alert = screen.getByRole('alert');
			expect(alert).toBeInTheDocument();

			expect(within(alert).getByText('Registration Failed')).toBeInTheDocument();
			expect(within(alert).getByText(mockResponse.message)).toBeInTheDocument();
		});

		expect(navigate).not.toHaveBeenCalledWith('/login');

		expect(screen.getByLabelText('Username')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
		expect(screen.queryByLabelText(/first name/i)).not.toBeInTheDocument();
	});
});
