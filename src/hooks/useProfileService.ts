import { useAuth } from '@/context/AuthContext';
import { useFetch } from './useFetch';
import { useCallback } from 'react';
import type { UserProfile } from '@/types/domain/user';
import type { UpdateProfileFormData } from '@/schemas/profile/updateProfileSchema';

export const useProfileService = () => {
	const { fetchJson } = useFetch();
	const { token } = useAuth();

	const getCurrentUserProfile = useCallback(
		() =>
			fetchJson<UserProfile>(`${import.meta.env.VITE_BASE_API_URL}/users/profile`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
		[fetchJson, token]
	);

	const getProfileByUserId = useCallback(
		(userId: number) =>
			fetchJson<UserProfile>(`${import.meta.env.VITE_BASE_API_URL}/users/${userId}/profile`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
		[fetchJson, token]
	);

	const updateUserProfile = useCallback(
		(body: UpdateProfileFormData) =>
			fetchJson<UserProfile>(`${import.meta.env.VITE_BASE_API_URL}/users/profile`, {
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
			fetchJson<UserProfile>(`${import.meta.env.VITE_BASE_API_URL}/users/profile/avatar`, {
				method: 'PUT',
				body: formData,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
		[fetchJson, token]
	);

	const resetProfileImage = useCallback(
		() =>
			fetchJson<UserProfile>(`${import.meta.env.VITE_BASE_API_URL}/users/profile/avatar`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
		[fetchJson, token]
	);

	const updateCoverImage = useCallback(
		(formData: FormData) =>
			fetchJson<UserProfile>(`${import.meta.env.VITE_BASE_API_URL}/users/profile/cover`, {
				method: 'PUT',
				body: formData,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
		[fetchJson, token]
	);

	const resetCoverImage = useCallback(
		() =>
			fetchJson<UserProfile>(`${import.meta.env.VITE_BASE_API_URL}/users/profile/cover`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
		[fetchJson, token]
	);

	return {
		getCurrentUserProfile,
		getProfileByUserId,
		updateUserProfile,
		updateProfileImage,
		resetProfileImage,
		updateCoverImage,
		resetCoverImage,
	};
};
