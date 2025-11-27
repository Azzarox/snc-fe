import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

jest.mock('@/services/utils/getEnvironmentMode', () => ({
	getEnvironmentMode: () => 'development',
	isDev: true,
	isProd: false,
}));

jest.mock('react-error-boundary', () => ({
	ErrorBoundary: ({ children }: any) => children,
}));

jest.mock('react-markdown', () => ({
	__esModule: true,
	default: ({ children }: any) => <div>{children}</div>,
}));

jest.mock('remark-gfm', () => () => {});

jest.mock('@/hooks/usePosts', () => ({
	usePosts: () => ({
		posts: [],
		loading: false,
		refetch: jest.fn(),
		handlePostUpdate: jest.fn(),
	}),
}));

describe('App', () => {
	it('should render home page', () => {
		render(
			<MemoryRouter>
				<App />
			</MemoryRouter>
		);

		expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /join now/i })).toBeInTheDocument();
	});
});
