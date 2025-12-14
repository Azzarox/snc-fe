import { useParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export const useDetermineProfile = () => {
	const { userId: userIdParam } = useParams<{ userId: string }>();
	const { user } = useAuth();

	const profileUserId = userIdParam ? parseInt(userIdParam, 10) : undefined;

	const isMyProfile = !userIdParam;

	const targetUserId = profileUserId || (user?.id ? Number(user.id) : undefined);

	return {
		profileUserId: targetUserId,
		isMyProfile,
	};
};
