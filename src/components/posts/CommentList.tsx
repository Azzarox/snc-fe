import { CommentItem } from './CommentItem';
import type { Comment } from '@/types/domain/comment';
import { Spinner } from '@shadcn/components/ui/spinner';
import {
	Empty,
	EmptyHeader,
	EmptyTitle,
	EmptyDescription,
} from '@shadcn/components/ui/empty';
import { MessageCircle } from 'lucide-react';

type CommentListProps = {
	comments: Comment[];
	loading: boolean;
	onUpdate?: () => void;
};

export const CommentList = ({
	comments,
	loading,
	onUpdate,
}: CommentListProps) => {
	if (loading) {
		return (
			<div className="flex justify-center py-8">
				<Spinner />
			</div>
		);
	}

	if (comments.length === 0) {
		return (
			<Empty>
				<EmptyHeader>
					<MessageCircle className="h-12 w-12 text-muted-foreground" />
				</EmptyHeader>
				<EmptyTitle>No comments yet</EmptyTitle>
				<EmptyDescription>
					Be the first to share your thoughts!
				</EmptyDescription>
			</Empty>
		);
	}

	return (
		<div className="space-y-4">
			<h3 className="text-lg font-semibold text-card-foreground">
				Comments ({comments.length})
			</h3>
			<div className="space-y-3">
				{comments.map((comment) => (
					<CommentItem
						key={comment.id}
						comment={comment}
						onUpdate={onUpdate}
					/>
				))}
			</div>
		</div>
	);
};
