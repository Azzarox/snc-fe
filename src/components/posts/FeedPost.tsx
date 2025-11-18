import { Button } from '@shadcn/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
} from '@shadcn/components/ui/dropdown-menu';
import { MoreHorizontal, Eye, Trash2, MessageCircle } from 'lucide-react';
import type { Post } from '@/types/domain/post';
import { useAuth } from '@/context/AuthContext';
import { usePostActions } from '@/hooks/usePostActions';
import { ConfirmModal } from '@/components/common/ConfirmModal';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type FeedPostProps = {
	post: Post;
	onUpdate?: () => void;
};

const FeedPost = ({ post, onUpdate }: FeedPostProps) => {
	const { token, user } = useAuth();
	const isOwner = user?.id ? Number(user.id) === post.userId : false;
	const { handleViewDetails, deleteConfirmModal } = usePostActions({
		post,
		onUpdate,
	});

	const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	});

	const fullName = `${post.user.firstName} ${post.user.lastName}`;
	const initials =
		`${post.user.firstName.charAt(0)}${post.user.lastName.charAt(0)}`.toUpperCase();

	return (
		<article className="bg-card rounded-lg border border-border overflow-hidden">
			<div className="p-4 flex items-start justify-between">
				<div className="flex items-start gap-3">
					<div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
						{post.user.avatarUrl ? (
							<img
								src={post.user.avatarUrl}
								alt={fullName}
								className="w-full h-full object-cover"
							/>
						) : (
							<span className="text-sm font-medium text-muted-foreground">
								{initials}
							</span>
						)}
					</div>
					<div>
						<h3 className="font-semibold text-card-foreground">
							{fullName}
						</h3>
						<p className="text-sm text-muted-foreground">
							&#64;{post.user.username} · {formattedDate}
						</p>
					</div>
				</div>

				{token && (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon">
								<MoreHorizontal className="h-5 w-5" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem onClick={handleViewDetails}>
								<Eye />
								View Details
							</DropdownMenuItem>

							{isOwner && (
								<>
									<DropdownMenuSeparator />
									<DropdownMenuItem
										variant="destructive"
										onClick={deleteConfirmModal.openModal}
									>
										<Trash2 />
										Delete
									</DropdownMenuItem>
								</>
							)}
						</DropdownMenuContent>
					</DropdownMenu>
				)}
			</div>

			<div className="px-4 pb-3">
				<h4 className="text-lg font-semibold text-card-foreground mb-2">
					{post.title}
				</h4>
				<div className="markdown-prose max-w-none">
					<Markdown remarkPlugins={[remarkGfm]}>
						{post.content}
					</Markdown>
				</div>
			</div>

			<div className="px-4 pb-4 flex items-center gap-6">
				<button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
					<MessageCircle className="h-5 w-5" />
					<span className="text-sm font-medium">
						{post.commentsCount}
					</span>
				</button>
			</div>

			{/* {post.image && (
				<div className="relative w-full aspect-video bg-muted">
					<Image src={post.image || "/placeholder.svg"} alt="Post content" fill className="object-cover" />
				</div>
			)} */}

			{/* <div className="p-4 flex items-center justify-between border-t border-border">
				<div className="flex items-center gap-6">
					<button className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors group">
						<Heart className="h-5 w-5 group-hover:fill-accent" />
						<span className="text-sm font-medium">{post.likes}</span>
					</button>
					<button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
						<MessageCircle className="h-5 w-5" />
						<span className="text-sm font-medium">{post.comments}</span>
					</button>
					<button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
						<Share2 className="h-5 w-5" />
						<span className="text-sm font-medium">{post.shares}</span>
					</button>
				</div>
			</div> */}

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

export default FeedPost;
