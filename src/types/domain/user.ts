export type User = {
	id: number;
	email: string;
	username: string;
};

export type UserProfile = {
	id: number;
	firstName: string;
	lastName: string;
	description?: string;
	bio?: string;
	createdAt: string;
	avatarUrl?: string;
	coverUrl?: string;
};
