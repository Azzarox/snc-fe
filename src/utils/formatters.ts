type UserData = {
	firstName: string;
	lastName: string;
};

export const formatDate = (dateString: string, includeTime = false): string => {
	const options: Intl.DateTimeFormatOptions = {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
		...(includeTime && {
			hour: '2-digit',
			minute: '2-digit',
		}),
	};

	return new Date(dateString).toLocaleDateString('en-US', options);
};

export const getUserFullName = (user: UserData): string => {
	return `${user.firstName} ${user.lastName}`;
};

export const getUserInitials = (user: UserData): string => {
	return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
};
