import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@shadcn/components/ui/dropdown-menu';
import {
	AvatarFallback,
	AvatarImage,
	Avatar,
} from '@shadcn/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router';
import { LogOutIcon, Settings, UserIcon } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';
import useLogout from '@/hooks/useLogout';


const AvatarProfileDropdown = () => {
	const { user } = useAuth();
	const { profile } = useProfile();
	const { handleLogout } = useLogout();


	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild className="size-9 cursor-pointer">
				<Avatar>
					<AvatarImage
						className="rounded"
						src={profile?.avatarUrl}
						alt="Sarah Mitchell"
					/>
					<AvatarFallback className="text-xs">SM</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-64"
				align="end"
				side="bottom"
				sideOffset={8}
				alignOffset={0}
			>
				<DropdownMenuLabel className="flex items-center gap-2">
					<Avatar className="size-10">
						<AvatarImage
							className="rounded-md"
							src={profile?.avatarUrl}
							alt="Hallie Richards"
						/>
						<AvatarFallback className="text-xs">HR</AvatarFallback>
					</Avatar>
					<div className="flex flex-1 flex-col">
						<span className="text-popover-foreground">
							{/* Sarah Mitchell */}
							{profile?.firstName} {profile?.lastName}
						</span>
						<span className="text-muted-foreground text-xs">
							{/* sarahmitchell@example.com */}
							{user?.email}
						</span>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<Link to="/profile">
						<DropdownMenuItem className="cursor-pointer">
							<UserIcon />
							<span>Profile</span>
						</DropdownMenuItem>
					</Link>
					<Link to="/settings">
						<DropdownMenuItem className="cursor-pointer">
							<Settings />
							<span>Settings</span>
						</DropdownMenuItem>
					</Link>
				</DropdownMenuGroup>

				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={handleLogout}
					className="cursor-pointer"
				>
					<LogOutIcon></LogOutIcon>
					<span>Log out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default AvatarProfileDropdown;
