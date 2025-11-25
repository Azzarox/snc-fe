import { UserEvent } from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { PostDetail } from './PostDetail';
import { Post } from '@/types/domain/post';
import { User } from '@/types/domain/user';

const useAuth = jest.fn();

const usePostService = {
	updatePost: jest.fn(),
	deletePost: jest.fn(),
};

const navigate = jest.fn();

const useConfirmModal = {
	openModal: jest.fn(),
	closeModal: jest.fn(),
	handleConfirm: jest.fn(),
};

jest.mock('@/context/AuthContext', () => ({
	useAuth: () => useAuth(),
}));

jest.mock('react-router', () => ({
	...jest.requireActual('react-router'),
	useNavigate: () => navigate,
}));

jest.mock('react-markdown', () => {
	return ({ children }: { children: string }) => <div>{children}</div>;
});

jest.mock('remark-gfm', () => {
	return () => {};
});

const useConfirmModalMock = jest.fn();

jest.mock('@/hooks/useConfirmModal', () => ({
	useConfirmModal: (config: { onConfirm: () => Promise<void> }) => {
		return useConfirmModalMock(config);
	},
}));

jest.mock('@/hooks/usePostService.ts', () => ({
	usePostService: () => usePostService,
}));

jest.mock('@/hooks/useConfirmModal.ts', () => ({
	useConfirmModal: () => useConfirmModal,
}));

describe('PostDetail', () => {
	let user: UserEvent;
	let post: Post;
	let fullname: string;
	beforeEach(() => {
		jest.clearAllMocks();
		user = userEvent.setup();
		post = {
			id: 1,
			userId: 1,
			user: {
				username: 'test123',
				firstName: 'Test',
				lastName: 'Testing',
				avatarUrl: 'some url',
			},
			title: 'My Post',
			content: 'My content',
			commentsCount: 10,
		} as Post;

		useAuth.mockReturnValue({
			user: { id: 1, username: 'test123' } as User,
			token: 'fake-token',
		});

		fullname = post.user.firstName + ' ' + post.user.lastName;

		let originalDeleteConfirm: () => Promise<void>;
		let originalUpdateConfirm: () => Promise<void>;

		useConfirmModalMock
			.mockImplementationOnce(({ onConfirm }) => {
				originalUpdateConfirm = onConfirm;
				return useConfirmModal;
			})
			// Second call = deleteConfirmModal
			.mockImplementationOnce(({ onConfirm }) => {
				originalDeleteConfirm = onConfirm;
				return useConfirmModal;
			});
	});

	describe('Component should render properly when ...', () => {
		let fullnameDisplay: RegExp;
		let usernameDisplay: RegExp;
		let commentsCountDisplay: RegExp;

		beforeEach(() => {
			fullnameDisplay = new RegExp(fullname, 'i');
			usernameDisplay = new RegExp(`@${post.user.username}`, 'i');
			commentsCountDisplay = new RegExp(`${post.commentsCount}\\s+comments?`, 'i');
		});

		it('when user IS owner', async () => {
			render(<PostDetail post={post} />);

			expect(screen.getByRole('img', { name: fullnameDisplay })).toHaveAttribute('src', post.user.avatarUrl);
			expect(screen.getByText(fullnameDisplay)).toBeInTheDocument();
			expect(screen.getByText(usernameDisplay)).toBeInTheDocument();
			expect(screen.getByText(post.title)).toBeInTheDocument();
			expect(screen.getByText(post.content)).toBeInTheDocument();
			expect(screen.getByText(commentsCountDisplay)).toBeInTheDocument();
			expect(screen.getByRole('button', { name: /more-options/i })).toBeInTheDocument();

			await user.click(screen.getByRole('button', { name: /more-options/i }));

			expect(screen.getByRole('menuitem', { name: /edit post/i })).toBeInTheDocument();
			expect(screen.getByRole('menuitem', { name: /delete post/i })).toBeInTheDocument();
		});

		it('when user IS NOT owner', () => {
			post.userId = 2;

			render(<PostDetail post={post} />);

			expect(screen.getByRole('img', { name: fullnameDisplay })).toHaveAttribute('src', post.user.avatarUrl);
			expect(screen.getByText(fullnameDisplay)).toBeInTheDocument();
			expect(screen.getByText(usernameDisplay)).toBeInTheDocument();
			expect(screen.getByText(post.title)).toBeInTheDocument();
			expect(screen.getByText(post.content)).toBeInTheDocument();
			expect(screen.getByText(commentsCountDisplay)).toBeInTheDocument();
			expect(screen.queryByRole('button', { name: 'more-options' })).not.toBeInTheDocument();
		});
	});
});
