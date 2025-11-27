import { render, screen } from '@testing-library/react';
import HeaderAuthButtons from './HeaderAuthButtons';
import { MemoryRouter } from 'react-router';

const useAuth = jest.fn();

jest.mock('@/context/AuthContext', () => ({
	useAuth: () => useAuth(),
}));

jest.mock('../profile/AvatarProfileDropdown', () => ({
	__esModule: true,
	default: () => <div>Avatar Dropdown</div>,
}));

describe('HeaderAuthButtons', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('when user is NOT authenticated', () => {
		it('should show Sign In and Join Now buttons', () => {
			useAuth.mockReturnValue({
				token: null,
				user: null,
			});

			render(
				<MemoryRouter>
					<HeaderAuthButtons />
				</MemoryRouter>
			);

			expect(screen.getByText('Sign In')).toBeInTheDocument();
			expect(screen.getByText('Join Now')).toBeInTheDocument();
		});
	});

	describe('when user IS authenticated', () => {
		it('should show avatar dropdown', () => {
			useAuth.mockReturnValue({
				token: 'fake-token',
				user: { id: 1, username: 'test123' },
			});

			render(
				<MemoryRouter>
					<HeaderAuthButtons />
				</MemoryRouter>
			);

			expect(screen.getByText('Avatar Dropdown')).toBeInTheDocument();
			expect(screen.queryByText('Sign In')).not.toBeInTheDocument();
			expect(screen.queryByText('Join Now')).not.toBeInTheDocument();
		});
	});
});
