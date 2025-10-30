
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@shadcn/components/ui/dropdown-menu"
import { AvatarFallback, AvatarImage, Avatar } from "@shadcn/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "react-router";
import { LogOutIcon, UserIcon } from "lucide-react";

const AvatarProfileDropdown = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login')
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className='size-9 cursor-pointer'>
                <Avatar >
                    <AvatarImage
                        className='rounded'
                        src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png"
                        alt="Hallie Richards"
                    />
                    <AvatarFallback className="text-xs">HR</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-64' align='end' side='bottom' sideOffset={8} alignOffset={0}>
                <DropdownMenuLabel className='flex items-center gap-2'>
                    <Avatar className='size-10'>
                        <AvatarImage
                            className='rounded-md'
                            src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png"
                            alt="Hallie Richards"
                        />
                        <AvatarFallback className="text-xs">HR</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-1 flex-col'>
                        <span className='text-popover-foreground'>Phillip George</span>
                        <span className='text-muted-foreground text-xs'>phillip@example.com</span>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <Link to="/discover">
                        <DropdownMenuItem className='cursor-pointer'>
                            <UserIcon />
                            <span>Profile</span>
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className='cursor-pointer'>
                    <LogOutIcon></LogOutIcon>
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default AvatarProfileDropdown;