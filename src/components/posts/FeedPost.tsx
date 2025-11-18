import { Button } from '@shadcn/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import type { Post } from '@/types/domain/post';

type FeedPostProps = {
	post: Post;
};

const FeedPost = ({ post }: FeedPostProps) => {
	const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	});

	return (
		<article className="bg-card rounded-lg border border-border overflow-hidden">
			<div className="p-4 flex items-start justify-between">
				<div className="flex items-start gap-3">
					<div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
						<span className="text-sm font-medium text-muted-foreground">
							{post.username.charAt(0).toUpperCase()}
						</span>
					</div>
					<div>
						<h3 className="font-semibold text-card-foreground">
							{post.username}
						</h3>
						<p className="text-sm text-muted-foreground">
							{formattedDate}
						</p>
					</div>
				</div>
				<Button variant="ghost" size="icon">
					<MoreHorizontal className="h-5 w-5" />
				</Button>
			</div>

			<div className="px-4 pb-3">
				<h4 className="text-lg font-semibold text-card-foreground mb-2">
					{post.title}
				</h4>
				<p className="text-card-foreground leading-relaxed whitespace-pre-wrap">
					{post.content}
				</p>
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
		</article>
	);
};

export default FeedPost;
