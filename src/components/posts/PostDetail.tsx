import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@shadcn/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
} from '@shadcn/components/ui/dropdown-menu';
import { MoreHorizontal, Edit, Trash2, MessageCircle, Info, Heart } from 'lucide-react';
import type { Post } from '@/types/domain/post';
import { useAuth } from '@/context/AuthContext';
import { usePostService } from '@/hooks/usePostService';
import { ConfirmModal } from '@/components/common/ConfirmModal';
import { useConfirmModal } from '@/hooks/useConfirmModal';
import { toastService } from '@/services/common/toastService';
import { updatePostSchema, type UpdatePostFormData } from '@/schemas/posts/updatePostSchema';
import { formatDate, getUserFullName, getUserInitials } from '@/utils/formatters';
import { checkIsOwner } from '@/utils/authHelpers';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type PostDetailProps = {
	post: Post;
	onUpdate?: () => void;
};

export const PostDetail = ({ post, onUpdate }: PostDetailProps) => {
	const { user } = useAuth();
	const { updatePost, deletePost } = usePostService();
	const navigate = useNavigate();
	const [isEditing, setIsEditing] = useState(false);
	const isOwner = checkIsOwner(user?.id, post.userId);
	const formattedDate = formatDate(post.createdAt, true);
	const fullName = getUserFullName(post.user);
	const initials = getUserInitials(post.user);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		getValues,
	} = useForm<UpdatePostFormData>({
		resolver: zodResolver(updatePostSchema),
		defaultValues: {
			title: post.title,
			content: post.content,
		},
	});

	const updateConfirmModal = useConfirmModal({
		onConfirm: async () => {
			const data = getValues();
			const response = await updatePost(post.id, data);
			if (response.success) {
				toastService.success('Post updated successfully!');
				setIsEditing(false);
				onUpdate?.();
			}
		},
	});

	const deleteConfirmModal = useConfirmModal({
		onConfirm: async () => {
			const response = await deletePost(post.id);
			if (response.success) {
				toastService.success('Post deleted successfully!');
				navigate('/');
			}
		},
	});

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleCancelEdit = () => {
		setIsEditing(false);
	};

	const onFormSubmit = () => {
		updateConfirmModal.openModal();
	};

	if (isEditing) {
		return (
			<article className="bg-card rounded-lg border border-border p-4">
				<h2 className="text-lg font-semibold mb-4 text-card-foreground">Edit Post</h2>
				<form onSubmit={handleSubmit(onFormSubmit)}>
					<div className="space-y-3">
						<div>
							<input
								{...register('title')}
								type="text"
								placeholder="Post title..."
								className="w-full p-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground"
							/>
							{errors.title && <p className="text-sm text-destructive mt-1">{errors.title.message}</p>}
						</div>

						<div>
							<textarea
								{...register('content')}
								placeholder="What's on your mind? Share your music, gear, or tips..."
								className="w-full min-h-32 p-3 bg-background border border-input rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground font-mono text-sm"
							/>
							{errors.content ? (
								<p className="text-sm text-destructive mt-1">{errors.content.message}</p>
							) : (
								<div className="flex items-center gap-1.5 mt-1.5 text-xs text-muted-foreground">
									<Info className="h-3.5 w-3.5" />
									<span>Markdown formatting supported!</span>
								</div>
							)}
						</div>
					</div>

					<div className="flex items-center justify-end gap-2 mt-3">
						<Button type="button" variant="outline" onClick={handleCancelEdit} disabled={isSubmitting}>
							Cancel
						</Button>
						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting ? 'Updating...' : 'Update Post'}
						</Button>
					</div>
				</form>

				<ConfirmModal
					ref={updateConfirmModal.modalRef}
					title="Update Post"
					description="Are you sure you want to update this post?"
					confirmText="Update"
					cancelText="Cancel"
					variant="default"
					onConfirm={updateConfirmModal.handleConfirm}
					isLoading={isSubmitting}
				/>
			</article>
		);
	}

	return (
		<article className="bg-card rounded-lg border border-border overflow-hidden">
			<div className="p-4 flex items-start justify-between">
				<div className="flex items-start gap-3">
					<div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
						{post.user.avatarUrl ? (
							<img src={post.user.avatarUrl} alt={fullName} className="w-full h-full object-cover" />
						) : (
							<span className="text-sm font-medium text-muted-foreground">{initials}</span>
						)}
					</div>
					<div>
						<h3 className="font-semibold text-card-foreground">{fullName}</h3>
						<p className="text-sm text-muted-foreground">
							@{post.user.username} · {formattedDate}
						</p>
					</div>
				</div>

				{isOwner && (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon" aria-label="more-options">
								<MoreHorizontal className="h-5 w-5" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem onClick={handleEdit}>
								<Edit />
								Edit Post
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								onClick={deleteConfirmModal.openModal}
								className="text-destructive focus:text-destructive"
							>
								<Trash2 />
								Delete Post
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)}
			</div>

			<div className="px-4 pb-3">
				<h2 className="text-xl font-bold text-card-foreground mb-3">{post.title}</h2>
				<div className="markdown-prose max-w-none">
					<Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>
				</div>
			</div>

			<div className="px-4 pb-4 flex items-center gap-6">
				<div className="flex items-center gap-2 text-muted-foreground">
					<MessageCircle className="h-5 w-5" />
					<span className="text-sm font-medium">
						{post.commentsCount} {post.commentsCount === 1 ? 'comment' : 'comments'}
					</span>
				</div>

				<div
					aria-label="likes-display"
					className={`flex items-center gap-2 transition-colors group ${
						post.isLikedByCurrentUser ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
					}`}
				>
					<Heart
						className={`h-5 w-5 transition-all ${
							post.isLikedByCurrentUser
								? 'fill-red-500 stroke-red-500'
								: 'fill-transparent group-hover:fill-red-500/50'
						}`}
					/>
					<span className="text-sm font-medium">{post.likesCount}</span>
				</div>
			</div>

			<ConfirmModal
				ref={deleteConfirmModal.modalRef}
				title="Delete Post"
				description="Are you sure you want to delete this post? This action cannot be undone."
				confirmText="Delete"
				cancelText="Cancel"
				variant="destructive"
				onConfirm={deleteConfirmModal.handleConfirm}
			/>
		</article>
	);
};
