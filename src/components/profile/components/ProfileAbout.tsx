import type { UserProfile } from "@/types/domain/user"

const ProfileAbout = ({ profile }: { profile: UserProfile }) => {
    return <>
        <div className="space-y-6">
            <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="text-lg font-semibold text-card-foreground mb-4">
                    About
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                    {profile?.description ? profile.description : 'User hasn\'t provided description'}
                </p>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="text-lg font-semibold text-card-foreground mb-4">
                    Gear
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                    <li>• Martin D-28 Acoustic Guitar</li>
                    <li>• Taylor 814ce</li>
                    <li>
                        • Fender American Professional
                        Stratocaster
                    </li>
                    <li>• Strymon BigSky Reverb</li>
                    <li>• Universal Audio Apollo Twin</li>
                </ul>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="text-lg font-semibold text-card-foreground mb-4">
                    Achievements
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                    <li>
                        • Featured in Guitar World Magazine
                        (2023)
                    </li>
                    <li>• 50K+ YouTube subscribers</li>
                    <li>• Released 3 studio albums</li>
                    <li>
                        • Endorsed artist for Martin Guitars
                    </li>
                </ul>
            </div>
        </div></>
}


export default ProfileAbout