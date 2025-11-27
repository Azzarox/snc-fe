import { CommentForm } from './CommentForm';
import { fn } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
	title: 'Components/Posts/CommentForm',
	component: CommentForm,
	parameters: {
		layout: 'padded',
	},
	args: {
		postId: 1,
		onCommentCreated: fn(),
	},
} satisfies Meta<typeof CommentForm>;
export default meta;

type Story = StoryObj<typeof meta>;

export const CreateMode: Story = {
	args: {
		mode: 'create',
	},
};

export const EditMode: Story = {
	args: {
		mode: 'edit',
		commentId: 1,
		initialValue: 'This is an existing comment that can be edited',
		onCancel: fn(),
	},
};
