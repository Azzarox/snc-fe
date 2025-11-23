import { act, render, screen, waitFor } from '@testing-library/react';
import { PostForm } from './PostForm';
import userEvent, { UserEvent } from '@testing-library/user-event';
import { SuccessResponse } from '@/types/api/response';

const usePostService = {
	createPost: jest.fn(),
};

const useConfirmModal = {
	openModal: jest.fn(),
	closeModal: jest.fn(),
	handleConfirm: jest.fn(),
};

jest.mock('@/hooks/usePostService', () => ({
	usePostService: () => usePostService,
}));

let originalHandleConfirm;
jest.mock('@/hooks/useConfirmModal', () => ({
	useConfirmModal: ({ onConfirm }) => {
		originalHandleConfirm = onConfirm;
		return {
			...useConfirmModal,
		};
	},
}));

describe('PostForm', () => {
	let user: UserEvent;
	beforeEach(() => {
		jest.clearAllMocks();
		user = userEvent.setup();
	});

	it('should render the form', async () => {
		render(<PostForm />);

		expect(screen.getByText(/share with the community/i)).toBeInTheDocument();
		expect(screen.getByPlaceholderText(/post title/i)).toBeInTheDocument();
		expect(screen.getByPlaceholderText(/what's on your mind/i)).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /post/i })).toBeInTheDocument();
	});

	it('should call openModal when "Post" button is clicked', async () => {
		render(<PostForm />);

		const postInputData = {
			title: 'My Post Title',
			content: 'My Post Content',
		};

		await user.type(screen.getByPlaceholderText(/post title/i), postInputData.title);
		await user.type(screen.getByPlaceholderText(/what's on your mind/i), postInputData.content);
		await user.click(screen.getByRole('button', { name: /post/i }));
		expect(useConfirmModal.openModal).toHaveBeenCalled();
	});

	it('should create post when confirmed from modal', async () => {
		const postInputData = {
			title: 'My Post Title',
			content: 'My Post Content',
		};
		const response = { success: true } as SuccessResponse<any>;
		usePostService.createPost.mockResolvedValue(response);

		const onPostCreated = jest.fn();

		render(<PostForm onPostCreated={onPostCreated} />);

		await user.type(screen.getByPlaceholderText(/post title/i), postInputData.title);
		await user.type(screen.getByPlaceholderText(/what's on your mind/i), postInputData.content);

		await user.click(screen.getByRole('button', { name: /post/i }));

		await act(async () => await originalHandleConfirm());

		await waitFor(() => {
			expect(usePostService.createPost).toHaveBeenCalledWith(postInputData);
		});

		expect(onPostCreated).toHaveBeenCalled();
	});
});
