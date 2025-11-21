export type User = {
	id: string;
	email: string;
	username: string;
};

export type UserProfile = {
	id: string;
	firstName: string;
	lastName: string;
	description?: string;
	bio?: string;
	createdAt: string;
	avatarUrl?: string;
	coverUrl?: string;
};
