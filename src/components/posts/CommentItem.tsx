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
import { useCommentActions } from '@/hooks/useCommentActions';
import { useCommonActions } from '@/hooks/useCommonActions';
import { ConfirmModal } from '@/components/common/ConfirmModal';
import { CommentForm } from './CommentForm';
import {
	formatDate,
	getUserFullName,
	getUserInitials,
} from '@/utils/formatters';
import { checkIsOwner } from '@/utils/authHelpers';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type CommentItemProps = {
	comment: Comment;
	onUpdate?: () => void;
};

export const CommentItem = ({ comment, onUpdate }: CommentItemProps) => {
	const { user } = useAuth();
	const {
		isEditing,
		handleEdit,
		handleCancelEdit,
		handleEditSuccess,
		deleteConfirmModal,
	} = useCommentActions({ comment, onUpdate });
	const { handleNavigateToProfile } = useCommonActions();

	const isOwner = checkIsOwner(user?.id, comment.userId);
	const formattedDate = formatDate(comment.createdAt);
	const fullName = getUserFullName(comment.user);
	const initials = getUserInitials(comment.user);

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
					<button
						onClick={() => handleNavigateToProfile(comment.userId)}
						className="w-8 h-8 rounded-full bg-muted flex items-center justify-center overflow-hidden flex-shrink-0 hover:opacity-80 transition-opacity cursor-pointer"
					>
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
					</button>
					<div>
						<h4 className="font-semibold text-card-foreground text-sm">
							{fullName}
						</h4>
						<p className="text-xs text-muted-foreground">
							<button
								onClick={() => handleNavigateToProfile(
									comment.userId
								)}
								className="hover:underline cursor-pointer"
							>
								@{comment.user.username}
							</button>{' '}
							· {formattedDate}
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
