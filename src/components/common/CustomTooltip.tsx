import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@shadcn/components/ui/tooltip';
import type { ReactNode } from 'react';

type CustomTooltipProps = {
	children: ReactNode;
	content: string | ReactNode;
	side?: 'top' | 'right' | 'bottom' | 'left';
	delayDuration?: number;
	className?: string;
};

export function CustomTooltip({
	children,
	content,
	side = 'bottom',
	delayDuration = 200,
	className,
}: CustomTooltipProps) {
	return (
		<TooltipProvider delayDuration={delayDuration}>
			<Tooltip>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent
					side={side}
					className={
						className ||
						'bg-card/90 backdrop-blur-sm text-card-foreground border border-border shadow-lg [&_svg]:invisible'
					}
				>
					{typeof content === 'string' ? (
						<p className="text-sm font-medium">{content}</p>
					) : (
						content
					)}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
