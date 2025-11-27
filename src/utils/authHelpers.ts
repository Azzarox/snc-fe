export const checkIsOwner = (currentUserId: number | undefined | null, resourceUserId: number): boolean => {
	return currentUserId ? Number(currentUserId) === resourceUserId : false;
};
