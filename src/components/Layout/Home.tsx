import FeedPost from "./FeedPost"
import Header from "./Header"
import { SuggestedUsers } from "./SuggestedUser"
import { TrendingTopics } from "./TrendingTopics"

const posts = [
  {
    id: 1,
    author: {
      name: "Sarah Mitchell",
      username: "@sarahmitchell",
      avatar: "/woman-guitarist.jpg",
    },
    content:
      "Just finished recording my new acoustic piece! The Martin D-28 sounds absolutely incredible on this track. Can't wait to share the full version with you all 🎸✨",
    image: "/acoustic-guitar-recording-studio.jpg",
    timestamp: "2h ago",
    likes: 234,
    comments: 45,
    shares: 12,
  },
  {
    id: 2,
    author: {
      name: "Marcus Chen",
      username: "@marcusshreds",
      avatar: "/man-guitarist.jpg",
    },
    content:
      "New gear day! Finally got my hands on the Strymon BigSky. The reverb tones are out of this world. Anyone else using this pedal? Would love to hear your favorite presets!",
    image: "/guitar-pedal-strymon.jpg",
    timestamp: "5h ago",
    likes: 189,
    comments: 67,
    shares: 23,
  },
  {
    id: 3,
    author: {
      name: "Elena Rodriguez",
      username: "@elenastrings",
      avatar: "/woman-musician.jpg",
    },
    content:
      "Practice tip: Try playing your favorite riffs in different positions on the neck. It really helps with fretboard visualization and opens up new creative possibilities! 🎵",
    timestamp: "8h ago",
    likes: 412,
    comments: 89,
    shares: 156,
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Hidden on mobile */}
          <aside className="hidden lg:block lg:col-span-3">
            <TrendingTopics />
          </aside>

          {/* Main Feed */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-card rounded-lg border border-border p-4">
              <h2 className="text-lg font-semibold mb-4 text-card-foreground">Share with the community</h2>
              <textarea
                placeholder="What's on your mind? Share your music, gear, or tips..."
                className="w-full min-h-24 p-3 bg-background border border-input rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground"
              />
              <div className="flex items-center justify-between mt-3">
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                    <svg
                      className="w-5 h-5 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                  <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                    <svg
                      className="w-5 h-5 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>
                <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
                  Post
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {posts.map((post) => (
                <FeedPost key={post.id} post={post} />
              ))}
            </div>
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
    </div>
  )
}
