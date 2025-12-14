import userEvent, { UserEvent } from '@testing-library/user-event';
import { CommentList } from './CommentList';
import { render, screen } from '@testing-library/react';
import type { Comment } from '@/types/domain/comment';
jest.mock('./CommentItem', () => ({
	CommentItem: ({ comment }: any) => <div>{comment.content}</div>,
}));

const comments: Comment[] = [
	{
		id: 1,
		content: 'First comment',
		userId: 1,
		postId: 1,
		createdAt: '2024-01-01T00:00:00Z',
		updatedAt: '2024-01-01T00:00:00Z',
		user: {
			username: 'test123',
			firstName: 'Test',
			lastName: 'Testing',
			avatarUrl: null,
		},
	},
	{
		id: 2,
		content: 'Second comment',
		userId: 2,
		postId: 1,
		createdAt: '2024-01-02T00:00:00Z',
		updatedAt: '2024-01-02T00:00:00Z',
		user: {
			username: 'test123',
			firstName: 'Test',
			lastName: 'Testing',
			avatarUrl: null,
		},
	},
];

describe('CommentList', () => {
	let user: UserEvent;
	beforeEach(() => {
		jest.clearAllMocks();
		user = userEvent.setup();
	});

	describe('Loading State', () => {
		it('should render spinned when loading is true', () => {
			render(<CommentList comments={comments} loading={true} />);
			expect(screen.getByRole('status')).toBeInTheDocument();
		});
	});

	describe('Empty State', () => {
		it('should render empty message when there are no comments', () => {
			render(<CommentList comments={[]} loading={false} />);
			expect(screen.getByText(/no comments yet/i)).toBeInTheDocument();
			expect(screen.getByText(/be the first to share your thoughts/i)).toBeInTheDocument();
		});
	});

	describe('With Comments', () => {
		it('should render all comments', () => {
			render(<CommentList comments={comments} loading={false} />);
			expect(screen.getByText(new RegExp(`Comments \\(${comments.length}\\)`, 'i'))).toBeInTheDocument();
			for (const comment of comments) {
				expect(screen.getByText(comment.content)).toBeInTheDocument();
			}
		});
	});
});
