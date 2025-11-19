export const checkIsOwner = (
	currentUserId: string | undefined | null,
	resourceUserId: number
): boolean => {
	return currentUserId ? Number(currentUserId) === resourceUserId : false;
};
