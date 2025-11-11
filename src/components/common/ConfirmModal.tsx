import { Button } from '@shadcn/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from '@shadcn/components/ui/dialog';
import { forwardRef } from 'react';
import type { ModalImperativeHandle } from '@/types/common/ModalImpretiveHandle';
import { useModal } from '@/hooks/useModal';

type ConfirmModalProps = {
	title: string;
	description: string;
	confirmText?: string;
	cancelText?: string;
	variant?: 'destructive' | 'default';
	onConfirm: () => void | Promise<void>;
	isLoading?: boolean;
};

export const ConfirmModal = forwardRef<
	ModalImperativeHandle,
	ConfirmModalProps
>(
	(
		{
			title,
			description,
			confirmText = 'Confirm',
			cancelText = 'Cancel',
			variant = 'destructive',
			onConfirm,
			isLoading = false,
		},
		ref
	) => {
		const { isOpen, closeModal } = useModal(ref);

		const handleConfirm = async () => {
			await onConfirm();
			closeModal();
		};

		return (
			<Dialog open={isOpen} onOpenChange={closeModal}>
				<DialogContent className="max-w-md">
					<DialogHeader>
						<DialogTitle>{title}</DialogTitle>
						<DialogDescription>{description}</DialogDescription>
					</DialogHeader>

					<div className="flex gap-2 justify-end pt-4">
						<Button
							type="button"
							variant="outline"
							onClick={closeModal}
							disabled={isLoading}
							className="cursor-pointer"
						>
							{cancelText}
						</Button>
						<Button
							className="cursor-pointer"
							variant={variant}
							onClick={handleConfirm}
							disabled={isLoading}
						>
							{isLoading ? 'Processing...' : confirmText}
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		);
	}
);

ConfirmModal.displayName = 'ConfirmModal';
