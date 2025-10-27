import { TrendingUp } from 'lucide-react';

const topics = [
	{ tag: 'NewGearDay', posts: '2.3k' },
	{ tag: 'AcousticGuitar', posts: '1.8k' },
	{ tag: 'PedalBoard', posts: '1.5k' },
	{ tag: 'GuitarTips', posts: '1.2k' },
	{ tag: 'JazzGuitar', posts: '890' },
];

const TrendingTopics = () => {
	return (
		<div className="bg-card rounded-lg border border-border p-4">
			<div className="flex items-center gap-2 mb-4">
				<TrendingUp className="h-5 w-5 text-primary" />
				<h2 className="font-semibold text-card-foreground">
					Trending Topics
				</h2>
			</div>
			<div className="space-y-3">
				{topics.map((topic) => (
					<button
						key={topic.tag}
						className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors group"
					>
						<div className="flex items-start justify-between">
							<div>
								<p className="font-medium text-card-foreground group-hover:text-primary transition-colors">
									#{topic.tag}
								</p>
								<p className="text-sm text-muted-foreground">
									{topic.posts} posts
								</p>
							</div>
						</div>
					</button>
				))}
			</div>
		</div>
	);
}

export default TrendingTopics;