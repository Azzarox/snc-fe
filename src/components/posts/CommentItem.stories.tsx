import { fn } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/react';
import { CommentItem } from './CommentItem';
import type { Comment } from '@/types/domain/comment';

const comment: Comment = {
	id: 1,
	postId: 1,
	userId: 1,
	user: {
		firstName: 'Test',
		lastName: 'Testing',
		username: 'test123',
		avatarUrl: '',
	},
	content: `This is a sample comment. It supports **markdown** formatting including:

- Bullet points
- **Bold text**
- *Italic text*
- [Links](https://example.com)`,
	createdAt: '2024-01-15T10:30:00Z',
	updatedAt: '2024-01-15T10:30:00Z',
};

const meta = {
	title: 'Components/Posts/CommentItem',
	component: CommentItem,
	parameters: {
		layout: 'padded',
	},
	args: {
		comment: comment,
		onUpdate: fn(),
	},
} satisfies Meta<typeof CommentItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AsNonOwner: Story = {
	args: {
		comment: { ...comment, userId: 2 },
	},
};

export const WithAvatar: Story = {
	args: {
		comment: {
			...comment,
			user: {
				...comment.user,
				avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=test123',
			},
		},
	},
};

export const LongComment: Story = {
	args: {
		comment: {
			...comment,
			content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## Key Points

1. First important point
2. Second important point
3. Third important point

**Note:** This is a very long comment to test how the component handles extensive content.`,
		},
	},
};

export const ShortComment: Story = {
	args: {
		comment: {
			...comment,
			content: 'Great post!',
		},
	},
};
