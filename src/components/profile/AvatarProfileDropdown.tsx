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
import { Link, useNavigate } from 'react-router';
import { LogOutIcon, Settings, UserIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useFetch } from '@/hooks/useFetch';
import type { UserProfile } from '@/types/domain/user';

const AvatarProfileDropdown = () => {
	const { logout, user, token } = useAuth();
	const { fetchJson } = useFetch();
	const [profile, setProfile] = useState<UserProfile>();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate('/login');
	};

	// TODO: Handle this in a hook ... 
	useEffect(() => {
		if (!token) return
		fetchJson<UserProfile>('/@api/users/profile', {
			method: 'GET',
			headers: {
				"Authorization": `Bearer ${token}`
			}
		}).then(res => {
			if (res.data) {
				setProfile(res.data);
			}
		})
	}, [token, fetchJson])

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild className="size-9 cursor-pointer">
				<Avatar>
					<AvatarImage
						className="rounded"
						src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png"
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
							src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png"
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
