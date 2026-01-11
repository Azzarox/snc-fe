import { useAuth } from '@/context/AuthContext';
import { useFetch } from './useFetch';
import { useCallback } from 'react';
import type { Comment } from '@/types/domain/comment';
import type { CreateCommentFormData } from '@/schemas/comments/createCommentSchema';
import type { UpdateCommentFormData } from '@/schemas/comments/updateCommentSchema';

export const useCommentService = () => {
	const { fetchJson } = useFetch();
	const { token } = useAuth();

	const getPostComments = useCallback(
		(postId: number) =>
			fetchJson<Comment[]>(`${import.meta.env.VITE_BASE_API_URL}/posts/${postId}/comments`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
		[fetchJson]
	);

	const getAllComments = useCallback(
		() =>
			fetchJson<Comment[]>(`${import.meta.env.VITE_BASE_API_URL}/comments`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
		[fetchJson]
	);

	const createComment = useCallback(
		(postId: number, body: CreateCommentFormData) =>
			fetchJson<Comment>(`${import.meta.env.VITE_BASE_API_URL}/posts/${postId}/comments`, {
				method: 'POST',
				body: JSON.stringify(body),
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
		[fetchJson, token]
	);

	const updateComment = useCallback(
		(postId: number, commentId: number, body: UpdateCommentFormData) =>
			fetchJson<Comment>(`${import.meta.env.VITE_BASE_API_URL}/posts/${postId}/comments/${commentId}`, {
				method: 'PATCH',
				body: JSON.stringify(body),
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
		[fetchJson, token]
	);

	const deleteComment = useCallback(
		(postId: number, commentId: number) =>
			fetchJson<Comment>(`${import.meta.env.VITE_BASE_API_URL}/posts/${postId}/comments/${commentId}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
		[fetchJson, token]
	);

	return {
		getPostComments,
		getAllComments,
		createComment,
		updateComment,
		deleteComment,
	};
};
