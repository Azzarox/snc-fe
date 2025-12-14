const OtherSettings = () => {
	return (
		<>
			<div className="space-y-6">
				<div>
					<h2 className="text-lg font-semibold text-foreground mb-2">Other Settings</h2>
					<p className="text-sm text-muted-foreground">Manage your preferences and notifications</p>
				</div>

				<div className="space-y-3">
					<div className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
						<div>
							<p className="text-sm font-medium text-foreground">Notifications</p>
							<p className="text-xs text-muted-foreground">Get notified about new activity</p>
						</div>
						<div className="w-11 h-6 bg-primary rounded-full relative cursor-pointer">
							<div className="absolute right-0.5 top-0.5 w-5 h-5 bg-primary-foreground rounded-full transition-transform" />
						</div>
					</div>

					<div className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
						<div>
							<p className="text-sm font-medium text-foreground">Auto-play videos</p>
							<p className="text-xs text-muted-foreground">Videos play automatically in feed</p>
						</div>
						<div className="w-11 h-6 bg-muted rounded-full relative cursor-pointer">
							<div className="absolute left-0.5 top-0.5 w-5 h-5 bg-muted-foreground rounded-full transition-transform" />
						</div>
					</div>

					<div className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
						<div>
							<p className="text-sm font-medium text-foreground">Sound effects</p>
							<p className="text-xs text-muted-foreground">Play sounds for interactions</p>
						</div>
						<div className="w-11 h-6 bg-muted rounded-full relative cursor-pointer">
							<div className="absolute left-0.5 top-0.5 w-5 h-5 bg-muted-foreground rounded-full transition-transform" />
						</div>
					</div>

					<div className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
						<div>
							<p className="text-sm font-medium text-foreground">Email notifications</p>
							<p className="text-xs text-muted-foreground">Receive updates via email</p>
						</div>
						<div className="w-11 h-6 bg-primary rounded-full relative cursor-pointer">
							<div className="absolute right-0.5 top-0.5 w-5 h-5 bg-primary-foreground rounded-full transition-transform" />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default OtherSettings;
