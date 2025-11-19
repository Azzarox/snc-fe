import { useState, useEffect, useCallback } from 'react';
import { useCommentService } from './useCommentService';
import type { Comment } from '@/types/domain/comment';

export const useComments = (postId: number) => {
	const { getPostComments } = useCommentService();
	const [comments, setComments] = useState<Comment[]>([]);
	const [loading, setLoading] = useState(false);

	const fetchComments = useCallback(async () => {
		setLoading(true);
		try {
			const res = await getPostComments(postId);
			if (res.data) {
				setComments(res.data);
			} else {
				setComments([]);
			}
		} catch {
			setComments([]);
		} finally {
			setLoading(false);
		}
	}, [getPostComments, postId]);

	useEffect(() => {
		fetchComments();
	}, [fetchComments]);

	return { comments, loading, refetch: fetchComments };
};
