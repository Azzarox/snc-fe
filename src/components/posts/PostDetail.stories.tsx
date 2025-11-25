import type { Meta, StoryObj } from '@storybook/react';
import { PostDetail } from './PostDetail';
import type { Post } from '@/types/domain/post';

const post: Post = {
	id: 1,
	userId: 1, 
	user: {
		username: 'test123',
		firstName: 'Test',
		lastName: 'Testing',
		avatarUrl: null,
	},
	title: 'Getting Started with Modular Synthesis',
	content: `I've been diving into modular synthesis lately and wanted to share some tips for beginners:

## Basic Concepts

- **VCO (Voltage Controlled Oscillator)**: Your sound source
- **VCF (Voltage Controlled Filter)**: Shapes your sound
- **VCA (Voltage Controlled Amplifier)**: Controls volume`,
	createdAt: '2024-01-15T10:30:00Z',
	updatedAt: '2024-01-15T10:30:00Z',
	commentsCount: 5,
	likesCount: 12,
	isLikedByCurrentUser: false,
};

const meta = {
	title: 'Components/Posts/PostDetail',
	component: PostDetail,
	parameters: {
		layout: 'padded',
	},
} satisfies Meta<typeof PostDetail>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AsOwner: Story = {
	args: {
		post: post,
	},
};

export const AsNonOwner: Story = {
	args: {
		post: { ...post, userId: 2 },
	},
};

export const WithAvatarUrl: Story = {
	args: {
		post: {
			...post,
			user: { ...post.user, avatarUrl: 'https://images.pexels.com/photos/34880116/pexels-photo-34880116.jpeg' },
		},
	},
};

export const IsLikedByUser: Story = {
	args: {
		post: {
			...post,
			isLikedByCurrentUser: true,
			user: { ...post.user, avatarUrl: 'https://images.pexels.com/photos/34880116/pexels-photo-34880116.jpeg' },
		},
	},
};
