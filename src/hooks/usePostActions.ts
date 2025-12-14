import { usePostService } from './usePostService';
import { useConfirmModal } from './useConfirmModal';
import type { Post } from '@/types/domain/post';
import { toastService } from '@/services/common/toastService';
import { useNavigate } from 'react-router';

type UsePostActionsProps = {
	post: Post;
	onPostUpdate?: (postId: number, updates: Partial<Post>) => void;
	onPostDelete?: () => void;
};

export const usePostActions = ({ post, onPostUpdate, onPostDelete }: UsePostActionsProps) => {
	const { deletePost, togglePostLike } = usePostService();
	const navigate = useNavigate();

	const deleteConfirmModal = useConfirmModal({
		onConfirm: async () => {
			const response = await deletePost(post.id);

			if (response.success) {
				toastService.success('Post deleted successfully!');
				onPostDelete?.();
			}
		},
	});

	const handleViewDetails = () => {
		navigate(`/posts/${post.id}/details`);
	};

	const handleTogglePostLike = async () => {
		const wasLiked = post.isLikedByCurrentUser;
		const optimisticUpdates: Partial<Post> = {
			isLikedByCurrentUser: !wasLiked,
			likesCount: wasLiked ? post.likesCount - 1 : post.likesCount + 1,
		};

		onPostUpdate?.(post.id, optimisticUpdates);

		const response = await togglePostLike(post.id);

		if (!response.success) {
			onPostUpdate?.(post.id, {
				isLikedByCurrentUser: wasLiked,
				likesCount: post.likesCount,
			});
			toastService.error('Something went wrong liking the post!');
		}
	};

	return {
		handleViewDetails,
		handleTogglePostLike,
		deleteConfirmModal,
	};
};
