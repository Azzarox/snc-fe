export type Comment = {
	id: number;
	postId: number;
	userId: number;
	user: CommentUserData; 
	content: string;
	createdAt: string;
	updatedAt: string;
};

type CommentUserData = {
	username: string;
	firstName: string;
	lastName: string;
	avatarUrl: string | null;
};
