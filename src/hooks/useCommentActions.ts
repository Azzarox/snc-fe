import { useState } from 'react';
import { useCommentService } from './useCommentService';
import { useConfirmModal } from './useConfirmModal';
import type { Comment } from '@/types/domain/comment';
import { toastService } from '@/services/common/toastService';

type UseCommentActionsProps = {
	comment: Comment;
	onUpdate?: () => void;
};

export const useCommentActions = ({
	comment,
	onUpdate,
}: UseCommentActionsProps) => {
	const { deleteComment } = useCommentService();
	const [isEditing, setIsEditing] = useState(false);

	const deleteConfirmModal = useConfirmModal({
		onConfirm: async () => {
			const response = await deleteComment(comment.postId, comment.id);
			if (response.success) {
				toastService.success('Comment deleted successfully!');
				onUpdate?.();
			}
		},
	});

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleCancelEdit = () => {
		setIsEditing(false);
	};

	const handleEditSuccess = () => {
		setIsEditing(false);
		onUpdate?.();
	};

	return {
		isEditing,
		handleEdit,
		handleCancelEdit,
		handleEditSuccess,
		deleteConfirmModal,
	};
};
