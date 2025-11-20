import type { Comment } from './comment';

export type Post = {
	id: number;
	userId: number;
	user: PostUserData;
	title: string;
	content: string;
	createdAt: string;
	updatedAt: string;
	commentsCount: number;
	likesCount: number;
	isLikedByCurrentUser: boolean;
	comments?: Comment[];
};

type PostUserData = {
	username: string;
	firstName: string;
	lastName: string;
	avatarUrl: string | null;
};
