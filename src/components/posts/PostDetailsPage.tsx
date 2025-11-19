import { useParams, useNavigate } from 'react-router-dom';
import { usePost } from '@/hooks/usePost';
import { useComments } from '@/hooks/useComments';
import { PostDetail } from './PostDetail';
import { CommentForm } from './CommentForm';
import { CommentList } from './CommentList';
import { Spinner } from '@shadcn/components/ui/spinner';
import { Button } from '@shadcn/components/ui/button';
import { Separator } from '@shadcn/components/ui/separator';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import {
	Empty,
	EmptyHeader,
	EmptyTitle,
	EmptyDescription,
} from '@shadcn/components/ui/empty';

const PostDetailsPage = () => {
	const { postId } = useParams<{ postId: string }>();
	const navigate = useNavigate();
	const { token } = useAuth();
	const postIdNumber = postId ? parseInt(postId, 10) : 0;

	const {
		post,
		loading: postLoading,
		error,
		refetch: refetchPost,
	} = usePost(postIdNumber);
	const {
		comments,
		loading: commentsLoading,
		refetch: refetchComments,
	} = useComments(postIdNumber);

	const handleBack = () => {
		navigate(-1);
	};

	const handleUpdate = () => {
		refetchPost();
		refetchComments();
	};

	if (postLoading) {
		return (
			<div className="container mx-auto px-4 max-w-2xl py-8">
				<div className="flex justify-center py-16">
					<Spinner />
				</div>
			</div>
		);
	}

	if (error || !post) {
		return (
			<div className="container mx-auto px-4 max-w-2xl py-8">
				<Button variant="ghost" onClick={handleBack} className="mb-6">
					<ArrowLeft className="h-4 w-4 mr-2" />
					Back
				</Button>
				<Empty>
					<EmptyHeader>
						<div className="text-6xl">404</div>
					</EmptyHeader>
					<EmptyTitle>Post Not Found</EmptyTitle>
					<EmptyDescription>
						The post you're looking for doesn't exist or has been
						removed.
					</EmptyDescription>
					<Button onClick={() => navigate('/')} className="mt-4">
						Go Home
					</Button>
				</Empty>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 max-w-2xl py-8">
			<Button variant="ghost" onClick={handleBack} className="mb-6">
				<ArrowLeft className="h-4 w-4 mr-2" />
				Back
			</Button>

			<div className="space-y-6">
				<PostDetail post={post} onUpdate={handleUpdate} />

				<Separator />

				{token && (
					<div>
						<h3 className="text-lg font-semibold text-card-foreground mb-4">
							Add a Comment
						</h3>
						<CommentForm
							postId={postIdNumber}
							onCommentCreated={handleUpdate}
						/>
					</div>
				)}

				<CommentList
					comments={comments}
					loading={commentsLoading}
					onUpdate={refetchComments}
				/>
			</div>
		</div>
	);
};

export default PostDetailsPage;
