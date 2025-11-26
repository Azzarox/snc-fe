import { CommentForm } from './CommentForm';
import { fn } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/react';
import { CommentList } from './CommentList';
import type { Comment } from '@/types/domain/comment';

const createComment = (id: number) => ({
	id,
	postId: 1,
	userId: 1,
	user: {
		firstName: 'Test',
		lastName: 'Testing',
		username: 'test123',
		avatarUrl: 'some url',
	},
	content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
	createdAt: '2024-01-15T10:30:00Z',
	updatedAt: '2024-01-15T10:30:00Z',
});

const comments: Comment[] = Array.from({ length: 5 }, (_, i) => createComment(i));

const meta = {
	title: 'Components/Posts/CommentList',
	component: CommentList,
	parameters: {
		layout: 'padded',
	},
	args: {
		comments,
		loading: false,
		onUpdate: fn(),
	},
} satisfies Meta<typeof CommentList>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AsNonOwner: Story = {
	args: {
		comments: [
			{ ...comments[0], userId: 2 },
			{ ...comments[1], userId: 3 },
		],
	},
};

export const NoComments: Story = {
	args: {
		comments: [],
	},
};

export const WithLoading: Story = {
	args: {
		loading: true,
	},
};
