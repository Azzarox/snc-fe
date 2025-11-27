import { Post } from '@/types/domain/post';
import { MemoryRouter } from 'react-router';
import FeedPost from './FeedPost';
import { render, screen } from '@testing-library/react';
import { User } from '@/types/domain/user';
import userEvent, { UserEvent } from '@testing-library/user-event';
import React from 'react';

const useAuth = jest.fn();

const usePostActions = {
	handleViewDetails: jest.fn(),
	deleteConfirmModal: {
		openModal: jest.fn(),
		closeModal: jest.fn(),
		handleConfirm: jest.fn(),
	},
	handleTogglePostLike: jest.fn(),
};

const navigate = jest.fn();
const useCommonActions = {
	handleNavigateToProfile: jest.fn(() => navigate),
};

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
	usePostActions: () => usePostActions,
}));

jest.mock('@/hooks/useCommonActions', () => ({
	useCommonActions: () => useCommonActions,
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

		render(<FeedPost post={post} />);

		const fullName = `${post.user.firstName} ${post.user.lastName}`;

		expect(screen.getByText(post.title)).toBeInTheDocument();
		expect(screen.getByText(post.content)).toBeInTheDocument();
		expect(screen.getByText(fullName)).toBeInTheDocument();
		expect(screen.getByRole('img', { name: new RegExp(fullName, 'i') })).toHaveAttribute('src', post.user.avatarUrl);
		expect(screen.getByText(`@${post.user.username}`)).toBeInTheDocument();
		expect(screen.getByText(post.commentsCount)).toBeInTheDocument();
		expect(screen.queryByRole('button', { name: /more options/i })).not.toBeInTheDocument();
	});

	describe('When user is logged in ...', () => {
		const mock = {
			token: 'fake-token',
			user: { id: 1, username: 'test 123' } as User,
		};

		let user: UserEvent;
		beforeEach(() => {
			user = userEvent.setup();
			useAuth.mockReturnValue(mock);
		});

		it('should render post when the user IS the owner of the post', async () => {
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
			expect(screen.getByText(post.likesCount)).toBeInTheDocument();
			expect(screen.getByRole('button', { name: /more options/i })).toBeInTheDocument();

			await user.click(screen.getByRole('button', { name: /more options/i }));
			expect(screen.getByRole('menuitem', { name: /view details/i })).toBeInTheDocument();
			expect(screen.getByRole('menuitem', { name: /delete/i })).toBeInTheDocument();
		});

		it('should render post when the user IS NOT owner of the post', async () => {
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

		it('should call the handleViewDetails when "View Details" is clicked', async () => {
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

			render(
				<MemoryRouter>
					<FeedPost post={post} />
				</MemoryRouter>
			);

			await user.click(screen.getByRole('button', { name: /more options/i }));
			await user.click(screen.getByRole('menuitem', { name: /view details/i }));

			expect(usePostActions.handleViewDetails).toHaveBeenCalled();
		});

		it('should call openModal upon when "Delete" is clicked', async () => {
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

			render(
				<MemoryRouter>
					<FeedPost post={post} />
				</MemoryRouter>
			);

			await user.click(screen.getByRole('button', { name: /more options/i }));
			await user.click(screen.getByRole('menuitem', { name: /delete/i }));

			expect(usePostActions.deleteConfirmModal.openModal).toHaveBeenCalled();
		});

		it('should call handleToggleLikePostLike upon when like button is clicked', async () => {
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

			render(
				<MemoryRouter>
					<FeedPost post={post} />
				</MemoryRouter>
			);

			await user.click(screen.getByRole('button', { name: 'like-button' }));
			expect(usePostActions.handleTogglePostLike).toHaveBeenCalled();
		});

		describe('should navigate to profile', () => {
			it('when username is clicked', async () => {
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

				render(
					<MemoryRouter>
						<FeedPost post={post} />
					</MemoryRouter>
				);

				await user.click(screen.getByRole('button', { name: `@${post.user.username}` }));
				expect(useCommonActions.handleNavigateToProfile).toHaveBeenCalledWith(post.userId);
				expect(navigate).toHaveBeenCalled();
			});

			it('when avatar image is clicked', async () => {
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

				const fullName = post.user.firstName + ' ' + post.user.lastName;

				render(
					<MemoryRouter>
						<FeedPost post={post} />
					</MemoryRouter>
				);

				await user.click(screen.getByRole('img', { name: new RegExp(fullName, 'i') }));
				expect(useCommonActions.handleNavigateToProfile).toHaveBeenCalledWith(post.userId);
				expect(navigate).toHaveBeenCalled();
			});
		});
	});
});
