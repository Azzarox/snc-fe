import {
	Camera,
	MapPin,
	Calendar,
	LinkIcon,
	Settings,
	Heart,
	MessageCircle,
	Share2,
	MoreHorizontal,
	Loader2,
} from 'lucide-react';
import { Button } from '@shadcn/components/ui/button';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import PageLoader from '../common/PageLoader.tsx';
import ProfileAbout from './components/ProfileAbout.tsx';
import { UnableToLoad } from '../common/PageUnableToLoad.tsx';
import { EditProfileModal } from './EditProfileModal.tsx';
import { useProfile } from '@/hooks/useProfile.ts';

interface ProfilePost {
	id: number;
	content: string;
	image?: string;
	timestamp: string;
	likes: number;
	comments: number;
	shares: number;
}

const userPosts: ProfilePost[] = [
	{
		id: 1,
		content:
			"Just finished recording my new acoustic piece! The Martin D-28 sounds absolutely incredible on this track. Can't wait to share the full version with you all 🎸✨",
		image: '/acoustic-guitar-recording-studio.jpg',
		timestamp: '2h ago',
		likes: 234,
		comments: 45,
		shares: 12,
	},
	{
		id: 2,
		content:
			'Practice tip: Try playing your favorite riffs in different positions on the neck. It really helps with fretboard visualization and opens up new creative possibilities! 🎵',
		timestamp: '1d ago',
		likes: 412,
		comments: 89,
		shares: 156,
	},
];

export default function ProfilePage() {
	const [activeTab, setActiveTab] = useState<'posts' | 'media' | 'about'>(
		'posts'
	);

	const [isEditModalOpen, setIsEditModalOpen] = useState(false);

	const { user } = useAuth();
	const { profile, loading } = useProfile();

	if (!profile) {
		return (
			<UnableToLoad title="Profile not found" message="We couldn't load this profile. It may have been deleted or there was a connection issue." />
		);
	}

	const displayJoined = new Date(profile.createdAt).toLocaleDateString('en-US', {
		month: 'long',
		year: 'numeric'
	})

	if (loading) {
		return (
			<PageLoader />
		);
	}

	return (
		<div className="min-h-screen bg-background">

			<div className="relative w-full h-64 bg-gradient-to-br from-primary/20 to-accent/20">
				<img
					src="/guitar-music-stage-concert.jpg"
					alt="Cover"
					className="w-full h-full object-cover"
				/>
				<button className="cursor-pointer absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm text-foreground px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-background transition-colors">
					<Camera className="h-4 w-4" />
					<span className="text-sm font-medium">Edit Cover</span>
				</button>
			</div>

			<div className="container mx-auto px-4 max-w-5xl">
				<div className="relative">
					<div className="absolute -top-20 left-0">
						<div className="relative">
							<img
								src="/woman-guitarist.jpg"
								alt="Sarah Mitchell"
								className="w-40 h-40 rounded-full border-4 border-background object-cover"
							/>
							<button className="absolute bottom-2 right-2 bg-primary text-primary-foreground p-2 rounded-full hover:opacity-90 transition-opacity">
								<Camera className="h-4 w-4" />
							</button>
						</div>
					</div>

					<div className="pt-6 flex justify-end gap-3">
						<Button className="cursor-pointer" onClick={() => setIsEditModalOpen(true)} variant="outline" size="sm">
							<Settings className="h-4 w-4 mr-2" />
							Edit Profile
						</Button>
						<Button size="sm" className='cursor-pointer'>Share Profile</Button>
					</div>
				</div>

				<div className="mt-4 pb-6 border-b border-border">
					<h1 className="text-3xl font-bold text-foreground">
						{profile.firstName} {profile.lastName}
					</h1>

					{user?.username && <p className="text-muted-foreground mt-1">@{user?.username}</p>}


					{profile?.bio && <p className="mt-4 text-foreground leading-relaxed max-w-2xl">
						{profile.bio}
					</p>}

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
						{displayJoined && <>
							<div className="flex items-center gap-1">
								<Calendar className="h-4 w-4" />
								<span>Joined {displayJoined}</span>
							</div></>}
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
						className={`pb-4 px-2 font-medium transition-colors relative ${activeTab === 'posts'
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
						className={`pb-4 px-2 font-medium transition-colors relative ${activeTab === 'media'
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
						className={`pb-4 px-2 font-medium transition-colors relative ${activeTab === 'about'
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
							{userPosts.map((post) => (
								<article
									key={post.id}
									className="bg-card rounded-lg border border-border overflow-hidden"
								>
									{/* Post Header */}
									<div className="p-4 flex items-start justify-between">
										<div className="flex items-start gap-3">
											<img
												src="/woman-guitarist.jpg"
												alt="Sarah Mitchell"
												className="w-10 h-10 rounded-full object-cover"
											/>
											<div>
												<h3 className="font-semibold text-card-foreground">
													Sarah Mitchell
												</h3>
												<p className="text-sm text-muted-foreground">
													@sarahmitchell ·{' '}
													{post.timestamp}
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
											<img
												src={
													post.image ||
													'/placeholder.svg'
												}
												alt="Post content"
												className="w-full h-full object-cover"
											/>
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
							))}
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
				isOpen={isEditModalOpen}
				onClose={() => setIsEditModalOpen(false)}
				onSave={async (profile) => {}}
				profile={profile}
			/>
		</div>
	);
}
