import { fn } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/react';
import { CommentList } from './CommentList';

const createComment = (id: number, userId?: number) => ({
	id,
	postId: 1,
	userId: userId ?? 1,
	user: {
		firstName: 'Test',
		lastName: 'Testing',
		username: `test${userId ?? 1}`,
		avatarUrl: '',
	},
	content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
	createdAt: '2024-01-15T10:30:00Z',
	updatedAt: '2024-01-15T10:30:00Z',
});

const createComments = (count: number, mixedOwners = false) =>
	Array.from({ length: count }, (_, i) => createComment(i, mixedOwners ? (i % 2 === 0 ? 1 : 2) : 1));

const meta = {
	title: 'Components/Posts/CommentList',
	component: CommentList,
	parameters: {
		layout: 'padded',
	},
	args: {
		comments: createComments(5, true),
		loading: false,
		onUpdate: fn(),
	},
} satisfies Meta<typeof CommentList>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ManyComments: Story = {
	args: {
		comments: createComments(15, true),
	},
};

export const AllAsOwner: Story = {
	args: {
		comments: createComments(5, false),
	},
};

export const AllAsNonOwner: Story = {
	args: {
		comments: createComments(5, false).map((c) => ({ ...c, userId: 2 })),
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
