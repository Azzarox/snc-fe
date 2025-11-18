import { useCallback, useEffect, useState } from 'react';
import { usePostService } from './usePostService';
import type { Post } from '@/types/domain/post';
import { useAuth } from '@/context/AuthContext';

export const usePosts = () => {
	const { getPosts } = usePostService();
	const [posts, setPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState(false);

	const { token } = useAuth();

	const fetchPosts = useCallback(async () => {
		if (!token) {
			setPosts([]);
			return;
		}

		setLoading(true);

		try {
			const res = await getPosts();

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
	}, [token, getPosts]);

	useEffect(() => {
		fetchPosts();
	}, [fetchPosts]);

	
	return { posts, loading, refetch: fetchPosts };
};
