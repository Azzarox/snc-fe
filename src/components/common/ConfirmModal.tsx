import { Button } from '@shadcn/components/ui/button';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import {
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from '@shadcn/components/ui/dialog';
import { forwardRef } from 'react';
import type { ModalImperativeHandle } from '@/types/common/ModalImpretiveHandle';
import { useModal } from '@/hooks/useModal';
import { cn } from '@shadcn/lib/utils';

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
			<DialogPrimitive.Root open={isOpen} onOpenChange={closeModal}>
				<DialogPrimitive.Portal>
					<DialogPrimitive.Overlay className="fixed inset-0 z-100 bg-black/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
					<DialogPrimitive.Content
						className={cn(
							'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-100 grid w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200'
						)}
					>
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
					</DialogPrimitive.Content>
				</DialogPrimitive.Portal>
			</DialogPrimitive.Root>
		);
	}
);

ConfirmModal.displayName = 'ConfirmModal';
