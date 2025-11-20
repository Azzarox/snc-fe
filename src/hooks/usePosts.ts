import { useCallback, useEffect, useState } from 'react';
import { usePostService } from './usePostService';
import type { Post } from '@/types/domain/post';

export const usePosts = (userId?: number) => {
	const { getAllPosts, getAllUserPosts } = usePostService();
	const [posts, setPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState(false);

	const fetchPosts = useCallback(async () => {
		setLoading(true);

		try {
			const res = userId
				? await getAllUserPosts(userId)
				: await getAllPosts();

			if (res.data) {
				setPosts(res.data);
			} else {
				setPosts([]);
			}
		} catch {
			setPosts([]);
		} finally {
			setLoading(false);
		}
	}, [getAllPosts, getAllUserPosts, userId]);

	useEffect(() => {
		fetchPosts();
	}, [fetchPosts]);

	const handlePostUpdate = useCallback(
		(postId: number, updates: Partial<Post>) => {
			setPosts((prevPosts) =>
				prevPosts.map((post) =>
					post.id === postId ? { ...post, ...updates } : post
				)
			);
		},
		[]
	);

	return { posts, loading, refetch: fetchPosts, handlePostUpdate };
};
