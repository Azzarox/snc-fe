import { useAuth } from '@/context/AuthContext';
import { useFetch } from './useFetch';
import { useCallback } from 'react';
import type { Post } from '@/types/domain/post';
import type { CreatePostFormData } from '@/schemas/posts/createPostSchema';

export const usePostService = () => {
	const { fetchJson } = useFetch();
	const { token } = useAuth();

	const getPosts = useCallback(
		() =>
			fetchJson<Post[]>('/@api/posts', {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
		[fetchJson, token]
	);

	const createPost = useCallback(
		(body: CreatePostFormData) =>
			fetchJson<Post>('/@api/posts', {
				method: 'POST',
				body: JSON.stringify(body),
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
		[fetchJson, token]
	);

	const deletePost = useCallback(
		(id: number) =>
			fetchJson<Post>(`/@api/posts/${id}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
		[fetchJson, token]
	);

	return { getPosts, createPost, deletePost };
};
