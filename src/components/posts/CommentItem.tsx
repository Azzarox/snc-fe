import { useState } from 'react';
import { Button } from '@shadcn/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
} from '@shadcn/components/ui/dropdown-menu';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import type { Comment } from '@/types/domain/comment';
import { useAuth } from '@/context/AuthContext';
import { useCommentService } from '@/hooks/useCommentService';
import { ConfirmModal } from '@/components/common/ConfirmModal';
import { useConfirmModal } from '@/hooks/useConfirmModal';
import { toastService } from '@/services/common/toastService';
import { CommentForm } from './CommentForm';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type CommentItemProps = {
	comment: Comment;
	onUpdate?: () => void;
};

export const CommentItem = ({ comment, onUpdate }: CommentItemProps) => {
	const { user } = useAuth();
	const { deleteComment } = useCommentService();
	const [isEditing, setIsEditing] = useState(false);
	const isOwner = user?.id ? Number(user.id) === comment.userId : false;

	// TODO: Move that in function or hook. Used in the posts as well ...
	const formattedDate = new Date(comment.createdAt).toLocaleDateString(
		'en-US',
		{
			month: 'short',
			day: 'numeric',
			year: 'numeric',
		}
	);

	const fullName = `${comment.user.firstName} ${comment.user.lastName}`;
	const initials =
		`${comment.user.firstName.charAt(0)}${comment.user.lastName.charAt(0)}`.toUpperCase();

	const deleteConfirmModal = useConfirmModal({
		onConfirm: async () => {
			const response = await deleteComment(comment.postId, comment.id);
			if (response.success) {
				toastService.success('Comment deleted successfully!');
				onUpdate?.();
			}
		},
	});

	// TODO: move that in useCommentsAction hook
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

	if (isEditing) {
		return (
			<div className="bg-card rounded-lg border border-border p-4">
				<CommentForm
					postId={comment.postId}
					onCommentCreated={handleEditSuccess}
					initialValue={comment.content}
					onCancel={handleCancelEdit}
					mode="edit"
					commentId={comment.id}
				/>
			</div>
		);
	}

	return (
		<article className="bg-card rounded-lg border border-border p-4">
			<div className="flex items-start justify-between mb-3">
				<div className="flex items-start gap-3">
					<div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
						{comment.user.avatarUrl ? (
							<img
								src={comment.user.avatarUrl}
								alt={fullName}
								className="w-full h-full object-cover"
							/>
						) : (
							<span className="text-xs font-medium text-muted-foreground">
								{initials}
							</span>
						)}
					</div>
					<div>
						<h4 className="font-semibold text-card-foreground text-sm">
							{fullName}
						</h4>
						<p className="text-xs text-muted-foreground">
							@{comment.user.username} · {formattedDate}
						</p>
					</div>
				</div>

				{isOwner && (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="h-8 w-8"
							>
								<MoreHorizontal className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem onClick={handleEdit}>
								<Edit />
								Edit Comment
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								onClick={deleteConfirmModal.openModal}
								className="text-destructive focus:text-destructive"
							>
								<Trash2 />
								Delete Comment
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)}
			</div>

			<div className="markdown-prose max-w-none text-sm pl-11">
				<Markdown remarkPlugins={[remarkGfm]}>
					{comment.content}
				</Markdown>
			</div>

			<ConfirmModal
				ref={deleteConfirmModal.modalRef}
				title="Delete Comment"
				description="Are you sure you want to delete this comment? This action cannot be undone."
				confirmText="Delete"
				cancelText="Cancel"
				variant="destructive"
				onConfirm={deleteConfirmModal.handleConfirm}
			/>
		</article>
	);
};
