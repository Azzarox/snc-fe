import { ArrowLeft, Palette, Settings } from 'lucide-react';
import { Button } from '@shadcn/components/ui/button';
import { useState } from 'react';
import { Card } from '@shadcn/components/ui/card';
import AppearanceSettings from './AppearanceSettings';
import OtherSettings from './OtherSettings';

type SettingsPageProps = {
	onBack?: () => void;
};

export function SettingsPage({ onBack }: SettingsPageProps) {
	const [activeTab, setActiveTab] = useState<'appearance' | 'other'>('appearance');

	return (
		<div className="min-h-screen bg-background">
			<div className="container mx-auto px-4 py-6 max-w-4xl">
				{/* Header */}
				<div className="flex items-center gap-4 mb-6">
					{onBack && (
						<Button variant="ghost" size="icon" onClick={onBack}>
							<ArrowLeft className="h-5 w-5" />
						</Button>
					)}
					<h1 className="text-2xl font-bold text-foreground">Settings</h1>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
					{/* Sidebar Navigation */}
					<div className="md:col-span-1">
						<Card className="p-2">
							<nav className="space-y-1">
								<button
									onClick={() => setActiveTab('appearance')}
									className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
										activeTab === 'appearance'
											? 'bg-primary text-primary-foreground'
											: 'text-muted-foreground hover:text-foreground hover:bg-muted'
									}`}
								>
									<Palette className="h-4 w-4" />
									Appearance
								</button>
								<button
									onClick={() => setActiveTab('other')}
									className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
										activeTab === 'other'
											? 'bg-primary text-primary-foreground'
											: 'text-muted-foreground hover:text-foreground hover:bg-muted'
									}`}
								>
									<Settings className="h-4 w-4" />
									Other
								</button>
							</nav>
						</Card>
					</div>

					{/* Main Content */}
					<div className="md:col-span-3">
						<Card className="p-6">
							{activeTab === 'appearance' && <AppearanceSettings />}

							{activeTab === 'other' && <OtherSettings />}
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
