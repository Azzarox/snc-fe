export type Post = {
	id: number;
	userId: number;
	user: PostUserData,
	title: string;
	content: string;
	createdAt: string;
	updatedAt: string;
	commentsCount: number;
};


type PostUserData = {
	username: string,
	firstName: string,
	lastName: string,
	avatarUrl: string | null,
}