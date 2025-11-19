import {
	Camera,
	MapPin,
	Calendar,
	LinkIcon,
	Upload,
	Settings2,
} from 'lucide-react';
import { Button } from '@shadcn/components/ui/button';
import { useState, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import PageLoader from '../common/PageLoader.tsx';
import ProfileAbout from './components/ProfileAbout.tsx';
import { UnableToLoad } from '../common/PageUnableToLoad.tsx';
import { EditProfileModal } from './EditProfileModal.tsx';
import { EditProfileImageModal } from './EditProfileImageModal.tsx';
import { EditCoverImageModal } from './EditCoverImageModal.tsx';
import { CustomTooltip } from '../common/CustomTooltip.tsx';
import { useProfile } from '@/hooks/useProfile.ts';
import { usePosts } from '@/hooks/usePosts.ts';
import FeedPost from '@/components/posts/FeedPost.tsx';
import { Spinner } from '@shadcn/components/ui/spinner';
import {
	Empty,
	EmptyTitle,
	EmptyDescription,
} from '@shadcn/components/ui/empty';
import type { ModalImperativeHandle } from '@/types/common/ModalImpretiveHandle.ts';
import { useNavigate } from 'react-router';
import { useDetermineProfile } from '@/hooks/useDetermineProfile.ts';

export default function ProfilePage() {
	const [activeTab, setActiveTab] = useState<'posts' | 'media' | 'about'>(
		'posts'
	);

	const navigate = useNavigate();

	const modalRef = useRef<ModalImperativeHandle>(null);
	const imageModalRef = useRef<ModalImperativeHandle>(null);
	const coverImageModalRef = useRef<ModalImperativeHandle>(null);

	const { user } = useAuth();
	const { profileUserId, isMyProfile } = useDetermineProfile();

	const { profile, loading, refetch } = useProfile(profileUserId);
	const {
		posts,
		loading: postsLoading,
		refetch: refetchPosts,
	} = usePosts(profileUserId);

	if (!user) {
		return (
			<UnableToLoad
				title="Authentication Required"
				message="Please log in to view your profile."
				onGoBack={() => navigate('/login')}
			/>
		);
	}

	if (!profile) {
		return (
			<UnableToLoad
				title="Profile not found"
				message="We couldn't load this profile. It may have been deleted or there was a connection issue."
			/>
		);
	}

	const displayJoined = new Date(profile.createdAt).toLocaleDateString(
		'en-US',
		{
			month: 'long',
			year: 'numeric',
		}
	);

	if (loading) {
		return <PageLoader />;
	}

	return (
		<div className="min-h-screen bg-background">
			<div
				className="relative w-full h-64 bg-muted"
				style={{
					backgroundImage: `url(${profile.coverUrl})`,
					backgroundSize: profile.coverUrl?.startsWith('data:')
						? 'auto'
						: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: profile.coverUrl?.startsWith('data:')
						? 'repeat'
						: 'no-repeat',
				}}
			>
				{isMyProfile && (
					<button
						onClick={() => coverImageModalRef.current?.openModal()}
						className="cursor-pointer absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm text-foreground px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-background transition-colors"
					>
						<Camera className="h-4 w-4" />
						<span className="text-sm font-medium">Edit Cover</span>
					</button>
				)}
			</div>

			<div className="container mx-auto px-4 max-w-5xl">
				<div className="relative">
					<div className="absolute -top-20 left-0">
						<div className="relative group">
							<img
								src={profile.avatarUrl}
								alt={`${profile.firstName} ${profile.lastName}`}
								className="w-40 h-40 rounded-full border-4 border-background object-cover"
							/>
							{isMyProfile && (
								<CustomTooltip content="Change profile picture">
									<button
										onClick={() =>
											imageModalRef.current?.openModal()
										}
										className="cursor-pointer absolute bottom-2 right-2 bg-primary text-primary-foreground p-2.5 rounded-full hover:scale-110 hover:shadow-lg transition-all duration-200 ring-2 ring-background"
									>
										<Upload className="h-4.5 w-4.5" />
									</button>
								</CustomTooltip>
							)}
						</div>
					</div>

					<div className="pt-6 flex justify-end gap-3">
						{isMyProfile && (
							<Button
								className="cursor-pointer"
								onClick={() => modalRef.current?.openModal()}
								variant="outline"
								size="sm"
							>
								<Settings2 className="h-4 w-4 mr-2" />
								Edit Profile
							</Button>
						)}
						<Button size="sm" className="cursor-pointer">
							Share Profile
						</Button>
					</div>
				</div>

				<div className="mt-4 pb-6 border-b border-border">
					<h1 className="text-3xl font-bold text-foreground">
						{profile.firstName} {profile.lastName}
					</h1>

					{user?.username && (
						<p className="text-muted-foreground mt-1">
							@{user?.username}
						</p>
					)}

					{profile?.bio && (
						<p className="mt-4 text-foreground leading-relaxed max-w-2xl">
							{profile.bio}
						</p>
					)}

					<div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
						<div className="flex items-center gap-1">
							<MapPin className="h-4 w-4" />
							<span>Nashville, TN</span>
						</div>
						<div className="flex items-center gap-1">
							<LinkIcon className="h-4 w-4" />
							<a
								href="#"
								className="text-primary hover:underline"
							>
								sarahmitchellmusic.com
							</a>
						</div>
						{displayJoined && (
							<>
								<div className="flex items-center gap-1">
									<Calendar className="h-4 w-4" />
									<span>Joined {displayJoined}</span>
								</div>
							</>
						)}
					</div>

					<div className="mt-6 flex items-center gap-6">
						<div>
							<span className="font-bold text-foreground">
								1,234
							</span>
							<span className="text-muted-foreground ml-1">
								Posts
							</span>
						</div>
						<div>
							<span className="font-bold text-foreground">
								12.5K
							</span>
							<span className="text-muted-foreground ml-1">
								Followers
							</span>
						</div>
						<div>
							<span className="font-bold text-foreground">
								892
							</span>
							<span className="text-muted-foreground ml-1">
								Following
							</span>
						</div>
					</div>
				</div>

				<div className="mt-6 flex gap-8 border-b border-border">
					<button
						onClick={() => setActiveTab('posts')}
						className={`pb-4 px-2 font-medium transition-colors relative ${
							activeTab === 'posts'
								? 'text-primary'
								: 'text-muted-foreground hover:text-foreground'
						}`}
					>
						Posts
						{activeTab === 'posts' && (
							<div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
						)}
					</button>
					<button
						onClick={() => setActiveTab('media')}
						className={`pb-4 px-2 font-medium transition-colors relative ${
							activeTab === 'media'
								? 'text-primary'
								: 'text-muted-foreground hover:text-foreground'
						}`}
					>
						Media
						{activeTab === 'media' && (
							<div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
						)}
					</button>
					<button
						onClick={() => setActiveTab('about')}
						className={`pb-4 px-2 font-medium transition-colors relative ${
							activeTab === 'about'
								? 'text-primary'
								: 'text-muted-foreground hover:text-foreground'
						}`}
					>
						About
						{activeTab === 'about' && (
							<div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
						)}
					</button>
				</div>

				<div className="mt-6 pb-12">
					{activeTab === 'posts' && (
						<div className="space-y-6">
							{postsLoading ? (
								<div className="flex justify-center py-8">
									<Spinner />
								</div>
							) : posts.length === 0 ? (
								<Empty>
									<EmptyTitle>No posts yet</EmptyTitle>
									<EmptyDescription>
										You haven't created any posts yet. Start
										sharing your thoughts!
									</EmptyDescription>
								</Empty>
							) : (
								posts.map((post) => (
									<FeedPost
										key={post.id}
										post={post}
										onUpdate={refetchPosts}
									/>
								))
							)}
						</div>
					)}

					{activeTab === 'media' && (
						<div className="grid grid-cols-3 gap-2">
							{[1, 2, 3, 4, 5, 6].map((i) => (
								<div
									key={i}
									className="aspect-square bg-muted rounded-lg overflow-hidden"
								>
									<img
										src={`/guitar-music-.jpg?height=300&width=300&query=guitar+music+${i}`}
										alt={`Media ${i}`}
										className="w-full h-full object-cover hover:opacity-80 transition-opacity cursor-pointer"
									/>
								</div>
							))}
						</div>
					)}

					{activeTab === 'about' && (
						<ProfileAbout profile={profile} />
					)}
				</div>
			</div>

			<EditProfileModal
				ref={modalRef}
				onSuccess={() => refetch()}
				profile={profile}
			/>

			<EditProfileImageModal
				ref={imageModalRef}
				onSuccess={() => refetch()}
				currentImageUrl={profile.avatarUrl}
			/>

			<EditCoverImageModal
				ref={coverImageModalRef}
				onSuccess={() => refetch()}
				currentImageUrl={profile.coverUrl}
			/>
		</div>
	);
}
