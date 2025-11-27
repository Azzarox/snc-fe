import { useCallback, useEffect, useState } from 'react';
import { useProfileService } from './useProfileService';
import type { UserProfile } from '@/types/domain/user';
import { useAuth } from '@/context/AuthContext';

export const useProfile = (userId?: number) => {
	const { getCurrentUserProfile, getProfileByUserId } = useProfileService();
	const [profile, setProfile] = useState<UserProfile | null>(null);
	const [loading, setLoading] = useState(false);

	const { token } = useAuth();

	const fetchProfile = useCallback(async () => {
		if (!token) {
			setProfile(null);
			return;
		}

		setLoading(true);

		try {
			const res = userId ? await getProfileByUserId(userId) : await getCurrentUserProfile();

			if (res.data) {
				setProfile(res.data);
			} else {
				setProfile(null);
			}
		} catch {
			setProfile(null);
		} finally {
			setLoading(false);
		}
	}, [token, getCurrentUserProfile, getProfileByUserId, userId]);

	useEffect(() => {
		fetchProfile();
	}, [fetchProfile]);

	return { profile, loading, refetch: fetchProfile };
};
