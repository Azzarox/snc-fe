import { render, screen } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';
import Header from './Header';
import { MemoryRouter } from 'react-router';

jest.mock('./HeaderAuthButtons', () => ({
	__esModule: true,
	default: () => <div>Auth Buttons</div>,
}));

jest.mock('./MobileMenu', () => ({
	MobileMenu: () => null,
}));

describe('Header', () => {
	let user: UserEvent;

	beforeEach(() => {
		jest.clearAllMocks();
		user = userEvent.setup();
	});

	describe('renders correctly', () => {
		it('should render logo and navigation', () => {
			render(
				<MemoryRouter>
					<Header />
				</MemoryRouter>
			);

			expect(screen.getByText('StringHub')).toBeInTheDocument();
			expect(screen.getByText('Feed')).toBeInTheDocument();
			expect(screen.getByText('Discover')).toBeInTheDocument();
			expect(screen.getByText('Lessons')).toBeInTheDocument();
			expect(screen.getByText('Gear')).toBeInTheDocument();
		});
	});

	describe('HeaderAuthButtons', () => {
		it('should render auth buttons', () => {
			render(
				<MemoryRouter>
					<Header />
				</MemoryRouter>
			);

			expect(screen.getByText('Auth Buttons')).toBeInTheDocument();
		});
	});
});
