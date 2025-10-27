import { Button } from '@shadcn/components/ui/button';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';

interface Post {
	id: number;
	author: {
		name: string;
		username: string;
		avatar: string;
	};
	content: string;
	image?: string;
	timestamp: string;
	likes: number;
	comments: number;
	shares: number;
}

const FeedPost = ({ post }: { post: Post }) => {
	return (
		<article className="bg-card rounded-lg border border-border overflow-hidden">
			{/* Post Header */}
			<div className="p-4 flex items-start justify-between">
				<div className="flex items-start gap-3">
					{/* <Image
            src={post.author.avatar || "/placeholder.svg"}
            alt={post.author.name}
            width={40}
            height={40}
            className="rounded-full"
          /> */}
					<div>
						<h3 className="font-semibold text-card-foreground">
							{post.author.name}
						</h3>
						<p className="text-sm text-muted-foreground">
							{post.author.username} · {post.timestamp}
						</p>
					</div>
				</div>
				<Button variant="ghost" size="icon">
					<MoreHorizontal className="h-5 w-5" />
				</Button>
			</div>

			{/* Post Content */}
			<div className="px-4 pb-3">
				<p className="text-card-foreground leading-relaxed">
					{post.content}
				</p>
			</div>

			{/* Post Image */}
			{post.image && (
				<div className="relative w-full aspect-video bg-muted">
					{/* <Image src={post.image || "/placeholder.svg"} alt="Post content" fill className="object-cover" /> */}
				</div>
			)}

			{/* Post Actions */}
			<div className="p-4 flex items-center justify-between border-t border-border">
				<div className="flex items-center gap-6">
					<button className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors group">
						<Heart className="h-5 w-5 group-hover:fill-accent" />
						<span className="text-sm font-medium">
							{post.likes}
						</span>
					</button>
					<button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
						<MessageCircle className="h-5 w-5" />
						<span className="text-sm font-medium">
							{post.comments}
						</span>
					</button>
					<button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
						<Share2 className="h-5 w-5" />
						<span className="text-sm font-medium">
							{post.shares}
						</span>
					</button>
				</div>
			</div>
		</article>
	);
}

export default FeedPost;
