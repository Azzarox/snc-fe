import { usePostService } from './usePostService';
import { useConfirmModal } from './useConfirmModal';
import type { Post } from '@/types/domain/post';
import { toastService } from '@/services/common/toastService';

type UsePostActionsProps = {
	post: Post;
	onUpdate?: () => void;
};

export const usePostActions = ({ post, onUpdate }: UsePostActionsProps) => {
	const { deletePost } = usePostService();

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
		console.log('View details:', post);
	};

	const handleEdit = () => {
		console.log('Edit post:', post);
	};

	return {
		handleViewDetails,
		handleEdit,
		deleteConfirmModal,
	};
};
