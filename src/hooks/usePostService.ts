import { useAuth } from '@/context/AuthContext';
import { useFetch } from './useFetch';
import { useCallback } from 'react';
import type { Post } from '@/types/domain/post';
import type { CreatePostFormData } from '@/schemas/posts/createPostSchema';
import type { UpdatePostFormData } from '@/schemas/posts/updatePostSchema';

export const usePostService = () => {
	const { fetchJson } = useFetch();
	const { token } = useAuth();

	const getAllPosts = useCallback(
		() =>
			fetchJson<Post[]>(`${import.meta.env.VITE_BASE_API_URL}/posts`, {
				method: 'GET',
				...(token && {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}),
			}),
		[fetchJson, token]
	);

	const getOnePost = useCallback(
		(id: number, includeComments = false) =>
			fetchJson<Post>(`${import.meta.env.VITE_BASE_API_URL}/posts/${id}?includeComments=${includeComments}`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
		[fetchJson, token]
	);

	const getAllUserPosts = useCallback(
		(userId: number, includeComments = false) =>
			fetchJson<Post[]>(`${import.meta.env.VITE_BASE_API_URL}/users/${userId}/posts/?includeComments=${includeComments}`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
		[fetchJson, token]
	);

	const createPost = useCallback(
		(body: CreatePostFormData) =>
			fetchJson<Post>(`${import.meta.env.VITE_BASE_API_URL}/posts`, {
				method: 'POST',
				body: JSON.stringify(body),
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
		[fetchJson, token]
	);
	const updatePost = useCallback(
		(id: number, body: UpdatePostFormData) =>
			fetchJson<Post>(`${import.meta.env.VITE_BASE_API_URL}/posts/${id}`, {
				method: 'PATCH',
				body: JSON.stringify(body),
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
		[fetchJson, token]
	);

	const deletePost = useCallback(
		(id: number) =>
			fetchJson<Post>(`${import.meta.env.VITE_BASE_API_URL}/posts/${id}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
		[fetchJson, token]
	);

	const togglePostLike = useCallback(
		(id: number) =>
			fetchJson<Post>(`${import.meta.env.VITE_BASE_API_URL}/posts/${id}/likes`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
		[fetchJson, token]
	);

	return {
		getAllPosts,
		getAllUserPosts,
		getOnePost,
		createPost,
		updatePost,
		deletePost,
		togglePostLike,
	};
};
