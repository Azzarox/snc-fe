import { OctagonAlert } from 'lucide-react';
import DismissableAlert from './DismissableAlert';
import { AlertDescription, AlertTitle } from '@shadcn/components/ui/alert';

type DismissableErrorAlertProps = {
	message?: string;
	title: string;
};

const DissmissableErrorAlert = ({ message, title }: DismissableErrorAlertProps) => {
	return (
		<DismissableAlert className="mb-4 flex justify-between items-center pr-2 [&>svg+div]:translate-y-0 bg-destructive/10 dark:bg-destructive/15 text-destructive border-none">
			<div className="flex items-start gap-3">
				<OctagonAlert className="mt-0.5 size-4" />
				<div className="flex-col justify-center">
					<AlertTitle className="text-destructive">{title}</AlertTitle>
					{message && <AlertDescription className="text-destructive">{message}</AlertDescription>}
				</div>
			</div>
		</DismissableAlert>
	);
};

export default DissmissableErrorAlert;
