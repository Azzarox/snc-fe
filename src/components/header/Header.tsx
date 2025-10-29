import { Button } from '@shadcn/components/ui/button';
import { Input } from '@shadcn/components/ui/input';
import { Bell, Search, Menu } from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';
import { Link } from 'react-router';
import HeaderAuthButtons from './HeaderAuthButtons';

const Header = () => {
	return (
		<header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
			<div className="container mx-auto px-4 max-w-7xl">
				<div className="flex h-16 items-center justify-between">
					{/* Logo and Brand */}
					<div className="flex items-center gap-8">
						<Link to="/">
							<div className="flex items-center gap-2">
								<div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
									<svg
										className="w-5 h-5 text-primary-foreground"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
									</svg>
								</div>
								<span className="text-xl font-bold text-card-foreground">
									StringHub
								</span>
							</div>
						</Link>

						{/* Desktop Navigation */}
						<nav className="hidden md:flex items-center gap-6">
							<a
								href="#"
								className="text-sm font-medium text-foreground hover:text-primary transition-colors"
							>
								Feed
							</a>
							<a
								href="#"
								className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
							>
								Discover
							</a>
							<a
								href="#"
								className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
							>
								Lessons
							</a>
							<a
								href="#"
								className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
							>
								Gear
							</a>
						</nav>
					</div>

					{/* Search Bar */}
					<div className="hidden lg:flex flex-1 max-w-md mx-8">
						<div className="relative w-full">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
							<Input
								type="search"
								placeholder="Search posts, users, or gear..."
								className="w-full pl-10 bg-background border-input"
							/>
						</div>
					</div>

					{/* Right Actions */}
					<div className="flex items-center gap-3">
						<Button
							variant="ghost"
							size="icon"
							className="relative"
						>
							<Bell className="h-5 w-5" />
							<span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
						</Button>

						<Button
							variant="ghost"
							size="icon"
							className="md:hidden"
						>
							<Search className="h-5 w-5" />
						</Button>

						<div className="hidden md:flex items-center gap-3">
							<HeaderAuthButtons/>
						</div>

						<Button
							variant="ghost"
							size="icon"
							className="md:hidden"
						>
							<Menu className="h-5 w-5" />
						</Button>

						<ThemeToggle />
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
