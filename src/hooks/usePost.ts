import { useState, useEffect, useCallback } from 'react';
import { usePostService } from './usePostService';
import type { Post } from '@/types/domain/post';

export const usePost = (postId: number) => {
	const { getOnePost } = usePostService();
	const [post, setPost] = useState<Post | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchPost = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const res = await getOnePost(postId);
			if (res.data) {
				setPost(res.data);
			} else {
				setPost(null);
				setError('Post not found');
			}
		} catch (err) {
			setPost(null);
			setError('Failed to load post');
		} finally {
			setLoading(false);
		}
	}, [getOnePost, postId]);

	useEffect(() => {
		fetchPost();
	}, [fetchPost]);

	return { post, loading, error, refetch: fetchPost };
};
