import { UserEvent } from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';
import { act, render, screen, waitFor } from '@testing-library/react';
import { PostDetail } from './PostDetail';
import { Post } from '@/types/domain/post';
import { User } from '@/types/domain/user';

const useAuth = jest.fn();

const usePostService = {
	updatePost: jest.fn(),
	deletePost: jest.fn(),
};

const navigate = jest.fn();

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

jest.mock('@/hooks/usePostService.ts', () => ({
	usePostService: () => usePostService,
}));

let originalUpdateConfirm: any;
let originalDeleteConfirm: any;

const useConfirmModalMocks = {
	openModal: jest.fn(),
	closeModal: jest.fn(),
	handleConfirm: jest.fn(),
};

const useConfirmModal = jest.fn();

jest.mock('@/hooks/useConfirmModal.ts', () => ({
	useConfirmModal: (args: any) => useConfirmModal(args),
}));

describe('PostDetail', () => {
	let user: UserEvent;
	let post: Post;
	let fullname: string;

	beforeEach(() => {
		jest.clearAllMocks();
		originalUpdateConfirm = undefined;
		originalDeleteConfirm = undefined;
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
			likesCount: 11,
		} as Post;

		useAuth.mockReturnValue({
			user: { id: 1, username: 'test123' } as User,
			token: 'fake-token',
		});

		useConfirmModal.mockImplementation(({ onConfirm }: any) => {
			if (!originalUpdateConfirm) {
				originalUpdateConfirm = onConfirm;
			} else if (!originalDeleteConfirm) {
				originalDeleteConfirm = onConfirm;
			}
			return useConfirmModalMocks;
		});

		fullname = post.user.firstName + ' ' + post.user.lastName;
	});

	describe('Component renders properly when ...', () => {
		let fullnameDisplay: RegExp;
		let usernameDisplay: RegExp;
		let commentsCountDisplay: RegExp;

		beforeEach(() => {
			fullnameDisplay = new RegExp(fullname, 'i');
			usernameDisplay = new RegExp(`@${post.user.username}`, 'i');
			commentsCountDisplay = new RegExp(`${post.commentsCount}\\s+comments?`, 'i');
		});

		it('user IS owner', async () => {
			render(<PostDetail post={post} />);

			expect(screen.getByRole('img', { name: fullnameDisplay })).toHaveAttribute('src', post.user.avatarUrl);
			expect(screen.getByText(fullnameDisplay)).toBeInTheDocument();
			expect(screen.getByText(usernameDisplay)).toBeInTheDocument();
			expect(screen.getByText(post.title)).toBeInTheDocument();
			expect(screen.getByText(post.content)).toBeInTheDocument();
			expect(screen.getByText(commentsCountDisplay)).toBeInTheDocument();
			expect(screen.getByLabelText(/likes-display/i)).toHaveTextContent(post.likesCount.toString());

			expect(screen.getByRole('button', { name: /more-options/i })).toBeInTheDocument();

			await user.click(screen.getByRole('button', { name: /more-options/i }));

			expect(screen.getByRole('menuitem', { name: /edit post/i })).toBeInTheDocument();
			expect(screen.getByRole('menuitem', { name: /delete post/i })).toBeInTheDocument();
		});

		it('user IS NOT owner', () => {
			post.userId = 2;

			render(<PostDetail post={post} />);

			expect(screen.getByRole('img', { name: fullnameDisplay })).toHaveAttribute('src', post.user.avatarUrl);
			expect(screen.getByText(fullnameDisplay)).toBeInTheDocument();
			expect(screen.getByText(usernameDisplay)).toBeInTheDocument();
			expect(screen.getByText(post.title)).toBeInTheDocument();
			expect(screen.getByText(post.content)).toBeInTheDocument();
			expect(screen.getByText(commentsCountDisplay)).toBeInTheDocument();
			expect(screen.getByLabelText(/likes-display/i)).toHaveTextContent(post.likesCount.toString());

			expect(screen.queryByRole('button', { name: 'more-options' })).not.toBeInTheDocument();
		});
	});

	describe('When edit is clicked it...', () => {
		it('should show edit form with prefilled data from post', async () => {
			render(<PostDetail post={post} />);

			await user.click(screen.getByRole('button', { name: /more-options/i }));
			await user.click(screen.getByRole('menuitem', { name: /edit post/i }));

			expect(screen.getByRole('heading', { name: /edit post/i })).toBeInTheDocument();
			expect(screen.getByDisplayValue(post.title)).toBeInTheDocument();
			expect(screen.getByDisplayValue(post.content)).toBeInTheDocument();
			expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
			expect(screen.getByRole('button', { name: /update post/i })).toBeInTheDocument();
		});
	});

	it('should open confirmation modal when "Update Post" is clicked', async () => {
		render(<PostDetail post={post} />);

		await user.click(screen.getByRole('button', { name: /more-options/i }));
		await user.click(screen.getByRole('menuitem', { name: /edit post/i }));

		expect(screen.getByRole('button', { name: /update post/i })).toBeInTheDocument();

		await user.click(screen.getByRole('button', { name: /update post/i }));

		expect(useConfirmModalMocks.openModal).toHaveBeenCalledTimes(1);
	});

	it('should cancel editting and return to normal view when "Cancel" is clicked', async () => {
		render(<PostDetail post={post} />);

		await user.click(screen.getByRole('button', { name: /more-options/i }));
		await user.click(screen.getByRole('menuitem', { name: /edit post/i }));

		expect(screen.getByRole('heading', { name: /edit post/i })).toBeInTheDocument();

		await user.click(screen.getByRole('button', { name: /cancel/i }));

		expect(screen.queryByRole('heading', { name: /edit post/i })).not.toBeInTheDocument();
		expect(screen.getByText(post.title)).toBeInTheDocument();
		expect(screen.getByText(post.content)).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /more-options/i })).toBeInTheDocument();
	});

	it('should call "updatePost" when update is confirmed', async () => {
		usePostService.updatePost.mockResolvedValue({ success: true });
		const onUpdate = jest.fn();
		render(<PostDetail post={post} onUpdate={onUpdate}  />);

		await user.click(screen.getByRole('button', { name: /more-options/i }));
		await user.click(screen.getByRole('menuitem', { name: /edit post/i }));

		const titleInput = screen.getByDisplayValue(post.title);
		await user.clear(titleInput);
		await user.type(titleInput, 'Updated Title');

		await user.click(screen.getByRole('button', { name: /update post/i }));

		await act(async () => await originalUpdateConfirm());

		await waitFor(() => {
			expect(usePostService.updatePost).toHaveBeenCalledWith(post.id, {
				title: 'Updated Title',
				content: post.content,
			});

			expect(onUpdate).toHaveBeenCalled();
		});
	});

	it('should call "deletePost" and navigate when delete is confirmed', async () => {
		usePostService.deletePost.mockResolvedValue({ success: true });

		render(<PostDetail post={post} />);

		await user.click(screen.getByRole('button', { name: /more-options/i }));
		await user.click(screen.getByRole('menuitem', { name: /delete post/i }));

		expect(useConfirmModalMocks.openModal).toHaveBeenCalled();

		await act(async () => await originalDeleteConfirm());

		await waitFor(() => {
			expect(usePostService.deletePost).toHaveBeenCalledWith(post.id);
			expect(navigate).toHaveBeenCalledWith('/');
		});
	});
});
