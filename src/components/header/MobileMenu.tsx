import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from '@shadcn/components/ui/sheet';
import { Separator } from '@shadcn/components/ui/separator';
import { Button } from '@shadcn/components/ui/button';
import { useNavigate } from 'react-router';
import { Home, Compass, Settings, User, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { getUserFullName, getUserInitials } from '@/utils/formatters';

type MobileMenuProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export const MobileMenu = ({ open, onOpenChange }: MobileMenuProps) => {
	const { user, token, logout } = useAuth();
	const { profile } = useProfile();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		onOpenChange(false);
		navigate('/');
	};

	const handleNavigation = (path: string) => {
		navigate(path);
		onOpenChange(false);
	};

	const fullName = profile && getUserFullName(profile);
	const initials = profile && getUserInitials(profile);

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent
				side="left"
				className="w-[300px] sm:w-[350px] flex flex-col h-full p-0"
			>
				<SheetHeader className="px-6 pt-6 pb-4">
					<SheetTitle className="text-left">Menu</SheetTitle>
				</SheetHeader>

				<div className="flex-1 flex flex-col px-6 overflow-y-auto">
					{token && user && profile && (
						<>
							<div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 mb-4">
								<div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center overflow-hidden">
									{profile.avatarUrl ? (
										<img
											src={profile.avatarUrl}
											alt={fullName ?? ''}
											className="w-full h-full object-cover"
										/>
									) : (
										<span className="text-sm font-medium text-muted-foreground">
											{initials}
										</span>
									)}
								</div>
								<div className="flex-1 min-w-0">
									<p className="font-semibold text-sm truncate">
										{fullName}
									</p>
									<p className="text-xs text-muted-foreground truncate">
										@{user.username}
									</p>
								</div>
							</div>
							<Separator className="mb-4" />
						</>
					)}

					<nav className="flex flex-col gap-2 mb-4">
						<Button
							variant="ghost"
							className="justify-start gap-3 h-11"
							onClick={() => handleNavigation('/')}
						>
							<Home className="h-5 w-5" />
							<span>Feed</span>
						</Button>

						<Button
							variant="ghost"
							className="justify-start gap-3 h-11"
							onClick={() => handleNavigation('/discover')}
						>
							<Compass className="h-5 w-5" />
							<span>Discover</span>
						</Button>
					</nav>

					{token && (
						<>
							<Separator className="mb-4" />
							<nav className="flex flex-col gap-2">
								<Button
									variant="ghost"
									className="justify-start gap-3 h-11"
									onClick={() => handleNavigation('/profile')}
								>
									<User className="h-5 w-5" />
									<span>Profile</span>
								</Button>

								<Button
									variant="ghost"
									className="justify-start gap-3 h-11"
									onClick={() =>
										handleNavigation('/settings')
									}
								>
									<Settings className="h-5 w-5" />
									<span>Settings</span>
								</Button>
							</nav>
						</>
					)}
				</div>

				<div className="px-6 pb-6 pt-4 border-t border-border">
					{token ? (
						<Button
							variant="ghost"
							className="w-full justify-start gap-3 h-11 text-destructive hover:text-destructive hover:bg-destructive/10"
							onClick={handleLogout}
						>
							<LogOut className="h-5 w-5" />
							<span>Logout</span>
						</Button>
					) : (
						<div className="flex flex-col gap-2">
							<Button
								variant="default"
								className="w-full"
								onClick={() => handleNavigation('/login')}
							>
								Sign In
							</Button>
							<Button
								variant="outline"
								className="w-full"
								onClick={() => handleNavigation('/register')}
							>
								Join Now
							</Button>
						</div>
					)}
				</div>
			</SheetContent>
		</Sheet>
	);
};
