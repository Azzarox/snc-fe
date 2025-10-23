import { Button } from "@shadcn/components/ui/button"

const users = [
  {
    name: "Jake Thompson",
    username: "@jaketheshredder",
    avatar: "/guitarist-man.jpg",
    followers: "12.5k",
  },
  {
    name: "Nina Patel",
    username: "@ninamusic",
    avatar: "/woman-musician.jpg",
    followers: "8.2k",
  },
  {
    name: "Alex Rivera",
    username: "@alexguitartech",
    avatar: "/musician-portrait.png",
    followers: "15.8k",
  },
]

export function SuggestedUsers() {
  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <h2 className="font-semibold text-card-foreground mb-4">Suggested for You</h2>
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.username} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* <Image
                src={user.avatar || "/placeholder.svg"}
                alt={user.name}
                width={40}
                height={40}
                className="rounded-full"
              /> */}
              <div>
                <p className="font-medium text-sm text-card-foreground">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.followers} followers</p>
              </div>
            </div>
            <Button size="sm" variant="outline">
              Follow
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
