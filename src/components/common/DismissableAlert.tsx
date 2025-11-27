import { Alert } from '@shadcn/components/ui/alert';
import { Button } from '@shadcn/components/ui/button';
import { XIcon } from 'lucide-react';
import { useState } from 'react';

type DismissableAlertProps = {
	children: React.ReactNode;
	className: string;
};

export function DismissableAlert({ children, className }: DismissableAlertProps) {
	const [visible, setVisible] = useState(true);
	if (!visible) return null;

	return (
		<Alert className={className}>
			{children}
			<Button
				size="icon"
				variant="ghost"
				className="pl-0! cursor-pointer hover:bg-destructive/0 hover:text-destructive/90"
				onClick={() => setVisible(false)}
			>
				<XIcon className="h-5 w-5" />
			</Button>
		</Alert>
	);
}

export default DismissableAlert;
