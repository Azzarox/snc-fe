import { Post } from '@/types/domain/post';
import { MemoryRouter } from 'react-router';
import FeedPost from './FeedPost';
import { render, screen, waitFor } from '@testing-library/react';
import { User } from '@/types/domain/user';
import userEvent from '@testing-library/user-event';

const useAuth = jest.fn();

jest.mock('react-markdown', () => {
	return ({ children }: { children: string }) => <div>{children}</div>;
});

jest.mock('remark-gfm', () => {
	return () => {};
});

jest.mock('@/context/AuthContext', () => ({
	useAuth: () => useAuth(),
}));

jest.mock('@/hooks/usePostActions', () => ({
	usePostActions: () => ({
		handleViewDetails: jest.fn(),
		handleTogglePostLike: jest.fn(),
		deleteConfirmModal: {},
	}),
}));

jest.mock('@/hooks/useCommonActions', () => ({
	useCommonActions: () => ({
		handleNavigateToProfile: jest.fn(() => jest.fn()),
	}),
}));

describe('FeedPost', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should render post when the user is not logged in', () => {
		useAuth.mockReturnValue({
			token: null,
			user: null,
		});

		const post = {
			title: 'post title',
			content: 'post content',
			user: {
				firstName: 'Test',
				lastName: 'Testing',
				avatarUrl: 'some url',
				username: 'test123',
			},
			commentsCount: 10,
		} as Post;

		render(
			<MemoryRouter>
				<FeedPost post={post} />
			</MemoryRouter>
		);

		const fullName = `${post.user.firstName} ${post.user.lastName}`;

		expect(screen.getByText(post.title)).toBeInTheDocument();
		expect(screen.getByText(post.content)).toBeInTheDocument();
		expect(screen.getByText(fullName)).toBeInTheDocument();
		expect(screen.getByRole('img', { name: new RegExp(fullName, 'i') })).toHaveAttribute('src', post.user.avatarUrl);
		expect(screen.getByText(`@${post.user.username}`)).toBeInTheDocument();
		expect(screen.getByText(post.commentsCount)).toBeInTheDocument();
		expect(screen.queryByRole('button', { name: /more options/i })).not.toBeInTheDocument();
	});

	describe('should render post when the user is logged in', () => {
		it('should render post when the user is logged in IS owner', async () => {
			const post = {
				id: 1,
				userId: 1,
				title: 'post title',
				content: 'post content',
				user: {
					firstName: 'Test',
					lastName: 'Testing',
					avatarUrl: 'some url',
					username: 'test123',
				},
				commentsCount: 10,
				likesCount: 11,
			} as Post;

			useAuth.mockReturnValue({
				token: 'fake token',
				user: { id: 1, username: 'test123' } as User,
			});

			render(
				<MemoryRouter>
					<FeedPost post={post} />
				</MemoryRouter>
			);

			const user = userEvent.setup();
			const fullName = `${post.user.firstName} ${post.user.lastName}`;

			expect(screen.getByText(post.title)).toBeInTheDocument();
			expect(screen.getByText(post.content)).toBeInTheDocument();
			expect(screen.getByText(fullName)).toBeInTheDocument();
			expect(screen.getByRole('img', { name: new RegExp(fullName, 'i') })).toHaveAttribute('src', post.user.avatarUrl);
			expect(screen.getByText(`@${post.user.username}`)).toBeInTheDocument();
			expect(screen.getByText(post.commentsCount)).toBeInTheDocument();
			expect(screen.getByText(post.likesCount)).toBeInTheDocument();
			expect(screen.getByRole('button', { name: /more options/i })).toBeInTheDocument();

			await user.click(screen.getByRole('button', { name: /more options/i }));
			expect(screen.getByRole('menuitem', { name: /view details/i })).toBeInTheDocument();
			expect(screen.getByRole('menuitem', { name: /delete/i })).toBeInTheDocument();
		});

		it('should render post when the user is logged in IS NOT owner', async () => {
			const post = {
				id: 1,
				userId: 1,
				title: 'post title',
				content: 'post content',
				user: {
					firstName: 'Test',
					lastName: 'Testing',
					avatarUrl: 'some url',
					username: 'test123',
				},
				commentsCount: 10,
				likesCount: 11,
			} as Post;

			useAuth.mockReturnValue({
				token: 'fake token',
				user: { id: 2, username: 'test123' } as User,
			});

			render(
				<MemoryRouter>
					<FeedPost post={post} />
				</MemoryRouter>
			);

			const user = userEvent.setup();
			const fullName = `${post.user.firstName} ${post.user.lastName}`;

			expect(screen.getByText(post.title)).toBeInTheDocument();
			expect(screen.getByText(post.content)).toBeInTheDocument();
			expect(screen.getByText(fullName)).toBeInTheDocument();
			expect(screen.getByRole('img', { name: new RegExp(fullName, 'i') })).toHaveAttribute('src', post.user.avatarUrl);
			expect(screen.getByText(`@${post.user.username}`)).toBeInTheDocument();
			expect(screen.getByText(post.commentsCount)).toBeInTheDocument();
			expect(screen.getByText(post.likesCount)).toBeInTheDocument();
			expect(screen.getByRole('button', { name: /more options/i })).toBeInTheDocument();

			await user.click(screen.getByRole('button', { name: /more options/i }));
			expect(screen.getByRole('menuitem', { name: /view details/i })).toBeInTheDocument();
			expect(screen.queryByRole('menuitem', { name: /delete/i })).not.toBeInTheDocument();
		});
	});
});
