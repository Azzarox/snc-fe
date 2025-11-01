import { useTheme } from '@/context/ThemeContext';
import { Monitor, Moon, Sun } from 'lucide-react';

const AppearanceSettings = () => {
	const { theme, setTheme } = useTheme();

	return (
		<>
			<div className="space-y-6">
				<div>
					<h2 className="text-lg font-semibold text-foreground mb-2">
						Appearance
					</h2>

					<p className="text-sm text-muted-foreground">
						Customize how StringHub looks on your device
					</p>
				</div>

				<div className="space-y-4">
					<div>
						<h3 className="text-sm font-medium text-foreground mb-3">
							Theme
						</h3>
						<div className="grid grid-cols-3 gap-4">
							<button
								onClick={() => setTheme('light')}
								className={`flex flex-col items-center gap-3 p-4 rounded-lg border-2 transition-all ${
									theme === 'light'
										? 'border-primary bg-primary/10'
										: 'border-border hover:border-muted-foreground/50'
								}`}
							>
								<Sun className="h-6 w-6" />
								<span className="text-sm font-medium">
									Light
								</span>
							</button>

							<button
								onClick={() => setTheme('dark')}
								className={`flex flex-col items-center gap-3 p-4 rounded-lg border-2 transition-all ${
									theme === 'dark'
										? 'border-primary bg-primary/10'
										: 'border-border hover:border-muted-foreground/50'
								}`}
							>
								<Moon className="h-6 w-6" />
								<span className="text-sm font-medium">
									Dark
								</span>
							</button>

							<button
								onClick={() => setTheme('system')}
								className={`flex flex-col items-center gap-3 p-4 rounded-lg border-2 transition-all ${
									theme === 'system'
										? 'border-primary bg-primary/10'
										: 'border-border hover:border-muted-foreground/50'
								}`}
							>
								<Monitor className="h-6 w-6" />
								<span className="text-sm font-medium">
									System
								</span>
							</button>
						</div>
						<p className="text-xs text-muted-foreground mt-3">
							{theme === 'system'
								? 'Automatically adjusts based on your system preferences'
								: `Currently using ${theme} mode`}
						</p>
					</div>
				</div>
			</div>
		</>
	);
};
export default AppearanceSettings;
