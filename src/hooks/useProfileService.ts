import { useAuth } from '@/context/AuthContext';
import { useFetch } from './useFetch';
import { useCallback } from 'react';
import type { UserProfile } from '@/types/domain/user';
import type { UpdateProfileFormData } from '@/schemas/profile/updateProfileSchema';

export const useProfileService = () => {
	const { fetchJson } = useFetch();
	const { token } = useAuth();

	const getUserProfile = useCallback(
		() =>
			fetchJson<UserProfile>('/@api/users/profile', {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
		[fetchJson, token]
	);

	const updateUserProfile = useCallback(
		(body: UpdateProfileFormData) =>
			fetchJson<UserProfile>('/@api/users/profile', {
				method: 'PATCH',
				body: JSON.stringify(body),
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
		[fetchJson, token]
	);

	const updateProfileImage = useCallback(
		(formData: FormData) =>
			fetchJson<UserProfile>('/@api/users/profile/avatar', {
				method: 'PUT',
				body: formData,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
		[fetchJson, token]
	);

	return { getUserProfile, updateUserProfile, updateProfileImage };
};
