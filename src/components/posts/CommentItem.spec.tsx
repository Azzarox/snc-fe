import { act, render, screen, waitFor } from '@testing-library/react';
import { CommentItem } from './CommentItem';
import userEvent, { UserEvent } from '@testing-library/user-event';
import type { Comment } from '@/types/domain/comment';

const comment: Comment = {
	id: 1,
	postId: 1,
	userId: 1,
	content: 'This is a test comment',
	createdAt: '2024-01-01T00:00:00Z',
	updatedAt: '2024-01-01T00:00:00Z',
	user: {
		username: 'testuser',
		firstName: 'Test',
		lastName: 'User',
		avatarUrl: 'some url',
	},
};

const useAuth = jest.fn();

const useCommentService = {
	deleteComment: jest.fn(),
};

const useConfirmModalMocks = {
	modalRef: { current: null },
	openModal: jest.fn(),
	closeModal: jest.fn(),
	handleConfirm: jest.fn(),
};

const useCommonActions = {
	handleNavigateToProfile: jest.fn(() => jest.fn()),
};

let originalConfirm: any;
const useConfirmModal = jest.fn();

jest.mock('react-markdown', () => {
	return ({ children }: { children: string }) => <div>{children}</div>;
});

jest.mock('remark-gfm', () => {
	return () => {};
});

jest.mock('@/context/AuthContext', () => ({
	useAuth: () => useAuth(),
}));

jest.mock('@/hooks/useCommentService.ts', () => ({
	useCommentService: () => useCommentService,
}));

jest.mock('@/hooks/useConfirmModal.ts', () => ({
	useConfirmModal: (config: { onConfirm: () => any }) => useConfirmModal(config),
}));

jest.mock('@/hooks/useCommonActions.ts', () => ({
	useCommonActions: () => useCommonActions,
}));

describe('CommentItem', () => {
	let user: UserEvent;
	let fullName: string;

	beforeEach(() => {
		jest.clearAllMocks();
		originalConfirm = undefined;
		user = userEvent.setup();
		useConfirmModal.mockImplementation(({ onConfirm }: any) => {
			originalConfirm = onConfirm;
			return useConfirmModalMocks;
		});

		fullName = comment.user.firstName + ' ' + comment.user.lastName;
	});

	describe('Component renders properly when ...', () => {
		let fullNameDisplay: RegExp;
		let usernameDisplay: RegExp;

		beforeEach(() => {
			fullNameDisplay = new RegExp(fullName, 'i');
			usernameDisplay = new RegExp(`@${comment.user.username}`, 'i');
		});

		it('user IS owner', async () => {
			useAuth.mockReturnValue({
				user: { id: 1 },
			});

			render(<CommentItem comment={comment} />);

			expect(screen.getByRole('img', { name: fullNameDisplay })).toHaveAttribute('src', comment.user.avatarUrl);
			expect(screen.getByText(fullNameDisplay)).toBeInTheDocument();
			expect(screen.getByText(usernameDisplay)).toBeInTheDocument();
			expect(screen.getByText(comment.content)).toBeInTheDocument();
			expect(screen.getByRole('button', { name: '' })).toBeInTheDocument();

			await user.click(screen.getByRole('button', { name: '' }));

			expect(screen.getByText('Edit Comment')).toBeInTheDocument();
			expect(screen.getByText('Delete Comment')).toBeInTheDocument();
		});

		it('user IS NOT owner', () => {
			useAuth.mockReturnValue({
				user: { id: 2 },
			});

			render(<CommentItem comment={comment} />);

			expect(screen.getByRole('img', { name: fullNameDisplay })).toHaveAttribute('src', comment.user.avatarUrl);
			expect(screen.getByText(fullNameDisplay)).toBeInTheDocument();
			expect(screen.getByText(usernameDisplay)).toBeInTheDocument();
			expect(screen.getByText(comment.content)).toBeInTheDocument();
			expect(screen.queryByRole('button', { name: '' })).not.toBeInTheDocument();
		});
	});

	describe('When edit is clicked it...', () => {
		it('should show edit form with prefilled data from comment', async () => {
			useAuth.mockReturnValue({
				user: { id: 1 },
			});

			render(<CommentItem comment={comment} />);

			await user.click(screen.getByRole('button', { name: '' }));
			await user.click(screen.getByText('Edit Comment'));

			expect(screen.getByRole('textbox')).toBeInTheDocument();
			expect(screen.getByDisplayValue(comment.content)).toBeInTheDocument();
		});
	});

	it('should open confirmation modal when "Delete Comment" is clicked', async () => {
		useAuth.mockReturnValue({
			user: { id: 1 },
		});

		render(<CommentItem comment={comment} />);

		await user.click(screen.getByRole('button', { name: '' }));
		await user.click(screen.getByText('Delete Comment'));

		expect(useConfirmModalMocks.openModal).toHaveBeenCalled();
	});

	it('should call "deleteComment" when delete is confirmed', async () => {
		useAuth.mockReturnValue({
			user: { id: 1 },
		});

		useCommentService.deleteComment.mockResolvedValueOnce({ success: true });
		const onUpdate = jest.fn();

		render(<CommentItem comment={comment} onUpdate={onUpdate} />);

		await user.click(screen.getByRole('button', { name: '' }));
		await user.click(screen.getByText('Delete Comment'));

		expect(useConfirmModalMocks.openModal).toHaveBeenCalled();

		await act(async () => await originalConfirm());
		await waitFor(() => {
			expect(useCommentService.deleteComment).toHaveBeenCalledWith(comment.postId, comment.id);
			expect(onUpdate).toHaveBeenCalled();
		});
	});
});
