import { usePostService } from './usePostService';
import { useConfirmModal } from './useConfirmModal';
import type { Post } from '@/types/domain/post';
import { toastService } from '@/services/common/toastService';
import { useNavigate } from 'react-router';

type UsePostActionsProps = {
	post: Post;
	onUpdate?: () => void;
};

export const usePostActions = ({ post, onUpdate }: UsePostActionsProps) => {
	const { deletePost, togglePostLike } = usePostService();
	const navigate = useNavigate();

	const deleteConfirmModal = useConfirmModal({
		onConfirm: async () => {
			const response = await deletePost(post.id);

			if (response.success) {
				toastService.success('Post deleted successfully!');
				onUpdate?.();
			}
		},
	});

	const handleViewDetails = () => {
		navigate(`/posts/${post.id}/details`);
	};

	const handleTogglePostLike = async () => {
		const response = await togglePostLike(post.id);

		if (response.success) {
			onUpdate?.();
		}
	};

	return {
		handleViewDetails,
		handleTogglePostLike,
		deleteConfirmModal,
	};
};
