import { useAuth } from '@/context/AuthContext';
import FeedPost from '../posts/FeedPost';
import SuggestedUsers from './components/SuggestedUser';
import TrendingTopics from './components/TrendingTopics';
import { PostForm } from '../posts/PostForm';
import { usePosts } from '@/hooks/usePosts';
import { Spinner } from '@shadcn/components/ui/spinner';
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription } from '@shadcn/components/ui/empty';

const HomePage = () => {
	const { token, user } = useAuth();
	const { posts, loading, refetch } = usePosts();

	
	return (
		<main className="container mx-auto px-4 py-6 max-w-7xl">
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
				{/* Left Sidebar - Hidden on mobile */}
				<aside className="hidden lg:block lg:col-span-3">
					<TrendingTopics />
				</aside>

				<div className="lg:col-span-6 space-y-6">
					{token && user?.id && <PostForm onPostCreated={refetch} />}

					{loading ? (
						<div className="flex justify-center items-center py-12">
							<Spinner className="size-8" />
						</div>
					) : posts.length === 0 ? (
						<Empty>
							<EmptyHeader>
								<EmptyTitle>No posts yet</EmptyTitle>
								<EmptyDescription>
									Be the first to share with the community!
								</EmptyDescription>
							</EmptyHeader>
						</Empty>
					) : (
						<div className="space-y-6">
							{posts.map((post) => (
								<FeedPost key={post.id} post={post} />
							))}
						</div>
					)}
				</div>

				{/* Right Sidebar */}
				<aside className="lg:col-span-3 space-y-6">
					<SuggestedUsers />
					{/* Mobile Trending Topics */}
					<div className="lg:hidden">
						<TrendingTopics />
					</div>
				</aside>
			</div>
		</main>
	);
};

export default HomePage;
