import { act, render, screen, waitFor } from '@testing-library/react';
import { CommentForm } from './CommentForm';
import userEvent, { UserEvent } from '@testing-library/user-event';

const useCommentService = {
	createComment: jest.fn(),
	updateComment: jest.fn(),
};

const useConfirmModalMocks = {
	openModal: jest.fn(),
	closeModal: jest.fn(),
	handleConfirm: jest.fn(),
};

const useConfirmModal = jest.fn();

jest.mock('@/hooks/useCommentService.ts', () => ({
	useCommentService: () => useCommentService,
}));

let originalConfirm: any;
jest.mock('@/hooks/useConfirmModal.ts', () => ({
	useConfirmModal: (config: { onConfirm: () => any }) => useConfirmModal(config),
}));

describe('CommentForm', () => {
	let user: UserEvent;

	beforeEach(() => {
		jest.clearAllMocks();
		originalConfirm = undefined;
		user = userEvent.setup();
		useConfirmModal.mockImplementation(({ onConfirm }: any) => {
			originalConfirm = onConfirm;
			return useConfirmModalMocks;
		});
	});

	describe('Create Mode', () => {
		it('should render properly when it is "create" mode', () => {
			render(<CommentForm postId={1} />);

			expect(screen.getByRole('button', { name: /comment/i })).toBeInTheDocument();
			expect(screen.getByPlaceholderText(/share your thoughts/i)).toBeInTheDocument();
			expect(screen.getByText(/markdown formatting supported/i)).toBeInTheDocument();

			expect(screen.queryByRole('button', { name: /update/i })).not.toBeInTheDocument();
			expect(screen.queryByRole('button', { name: /cancel/i })).not.toBeInTheDocument();
		});

		it('should open the confirm modal when "Comment" is clicked', async () => {
			render(<CommentForm postId={1} />);

			const textarea = screen.getByRole('textbox');
			const commentButton = screen.getByRole('button', { name: /comment/i });
			await user.type(textarea, 'some data');

			expect(commentButton).toBeInTheDocument();
			expect(textarea).toBeInTheDocument();

			await user.click(commentButton);

			expect(useConfirmModalMocks.openModal).toHaveBeenCalled();
		});

		it('should call the "createComment" when confirmed', async () => {
			useCommentService.createComment.mockResolvedValueOnce({ success: true });
			const onCommentCreated = jest.fn();
			render(<CommentForm postId={1} onCommentCreated={onCommentCreated} />);

			const textarea = screen.getByRole('textbox');
			const commentButton = screen.getByRole('button', { name: /comment/i });
			await user.type(textarea, 'some data');

			expect(commentButton).toBeInTheDocument();
			expect(textarea).toBeInTheDocument();

			await user.click(commentButton);

			expect(useConfirmModalMocks.openModal).toHaveBeenCalled();

			await act(async () => await originalConfirm());
			await waitFor(() => {
				expect(useCommentService.createComment).toHaveBeenCalledWith(1, {
					content: 'some data',
				});
				expect(onCommentCreated).toHaveBeenCalled();
			});
		});
	});

	describe('Edit Mode', () => {
		it('should render properly when it is "edit" mode', () => {
			const initialValue = 'some initial value';

			render(<CommentForm postId={1} mode="edit" onCancel={jest.fn()} commentId={1} initialValue={initialValue} />);

			expect(screen.getByDisplayValue(initialValue)).toBeInTheDocument();

			expect(screen.getByRole('button', { name: /update/i })).toBeInTheDocument();
			expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();

			expect(screen.queryByRole('button', { name: /comment/i })).not.toBeInTheDocument();
		});

		it('should open the confirm modal when "Update" is clicked', async () => {
			render(<CommentForm postId={1} mode="edit" commentId={1} initialValue="some data" />);

			const updateButton = screen.getByRole('button', { name: /update/i });

			expect(updateButton).toBeInTheDocument();

			await user.click(updateButton);

			expect(useConfirmModalMocks.openModal).toHaveBeenCalled();
		});

		it('should call "onCancel" when "Cancel" button is clicked', async () => {
			const onCancel = jest.fn();

			render(<CommentForm mode="edit" postId={1} commentId={1} initialValue="test" onCancel={onCancel} />);

			const cancelButton = screen.getByRole('button', { name: /cancel/i });
			await user.click(cancelButton);

			expect(onCancel).toHaveBeenCalled();
		});

		it('should call the "updateComment" when confirmed', async () => {
			useCommentService.updateComment.mockResolvedValueOnce({ success: true });
			const onCommentCreated = jest.fn();
			const onCancel = jest.fn();

			render(<CommentForm mode="edit" postId={1} commentId={1} onCommentCreated={onCommentCreated} onCancel={onCancel} />);

			const updateButton = screen.getByRole('button', { name: /update/i });
			const textarea = screen.getByRole('textbox');

			await user.type(textarea, 'some data');
			await user.click(updateButton);

			expect(useConfirmModalMocks.openModal).toHaveBeenCalled();

			await act(async () => await originalConfirm());
			await waitFor(() => {
				// TODO: Change the 'with' check to use variables
				expect(useCommentService.updateComment).toHaveBeenCalledWith(1, 1, {
					content: 'some data',
				});
				expect(onCommentCreated).toHaveBeenCalled();
				expect(onCancel).toHaveBeenCalled();
			});
		});
	});
});
