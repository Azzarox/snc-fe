import { Button } from '@shadcn/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@shadcn/components/ui/dialog';
import { Field, FieldLabel, FieldDescription } from '@shadcn/components/ui/field';
import { forwardRef, useRef } from 'react';
import type { ModalImperativeHandle } from '@/types/common/ModalImpretiveHandle';
import { useModal } from '@/hooks/useModal';
import type { ImageUploadOptions } from '@/hooks/useImageUpload';
import type { ApiResponse } from '@/types/api/response';
import { RotateCcw } from 'lucide-react';
import { CustomTooltip } from '../CustomTooltip';
import { ConfirmModal } from '../ConfirmModal';
import { Spinner } from '@shadcn/components/ui/spinner';
import { ImageUpload } from './ImageUpload';
import { useUploadState } from './hooks/useUploadState';
import { useUploadActions } from './hooks/useUploadActions';
import { toastService } from '@/services/common/toastService';

type ModalProps = {
	title?: string;
	description?: string;
	currentImageUrl?: string;
	imageClassName?: string;
	onSuccess: () => void;
	uploadFn: (formData: FormData) => Promise<ApiResponse<any>>;
	successMessage?: string;
	uploadOptions?: ImageUploadOptions;
	onReset?: () => Promise<void>;
	showResetButton?: boolean;
};

const ModalContent = ({
	title = 'Upload Image',
	description = 'Upload a new image (max 5MB)',
	currentImageUrl,
	imageClassName = 'w-32 h-32 rounded-lg object-cover border-4 border-border',
	onSuccess,
	uploadFn,
	successMessage = 'Image uploaded successfully!',
	onReset,
	showResetButton = false,
	closeModal,
}: Omit<ModalProps, 'uploadOptions'> & {
	closeModal: () => void;
}) => {
	const { selectedFile, error, isUploading, enableCropping, previewUrl } = useUploadState();
	const { uploadImage, reset } = useUploadActions();
	const confirmModalRef = useRef<ModalImperativeHandle>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const result = await uploadImage(uploadFn);

		if (result.success) {
			toastService.success(successMessage);
			onSuccess();
			handleClose();
		}
	};

	const handleClose = () => {
		reset();
		closeModal();
	};

	const handleResetClick = () => {
		confirmModalRef.current?.openModal();
	};

	const handleResetConfirm = async () => {
		if (!onReset) return;

		try {
			await onReset();
			toastService.success('Image successfully reset!');
			onSuccess();
			handleClose();
		} catch (error) {
			toastService.error('Failed to reset image!');
		}
	};

	return (
		<>
			<DialogHeader>
				<DialogTitle>{title}</DialogTitle>
			</DialogHeader>

			<form onSubmit={handleSubmit} className="space-y-6">
				<Field>
					<div className="flex items-center justify-between">
						<div>
							<FieldLabel>Image</FieldLabel>
							<FieldDescription>{description}</FieldDescription>
						</div>
						{showResetButton && onReset && (
							<CustomTooltip content="Reset default image">
								<button
									type="button"
									onClick={handleResetClick}
									disabled={isUploading}
									className="cursor-pointer text-destructive hover:text-destructive transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
								>
									<RotateCcw className="h-5 w-5" />
								</button>
							</CustomTooltip>
						)}
					</div>

					<div className="space-y-4">
						{enableCropping && previewUrl ? (
							<ImageUpload.CropperPreview />
						) : (
							<>
								<ImageUpload.Preview currentImageUrl={currentImageUrl} imageClassName={imageClassName} />

								<ImageUpload.UploadZone />
							</>
						)}

						<ImageUpload.FileInput />
					</div>

					<ImageUpload.ErrorMessage />
				</Field>

				<div className="flex gap-2 justify-end pt-4">
					<Button
						type="button"
						variant="outline"
						onClick={handleClose}
						disabled={isUploading}
						className="cursor-pointer"
					>
						Cancel
					</Button>
					<Button className="cursor-pointer" type="submit" disabled={isUploading || !selectedFile}>
						{isUploading ? (
							<div className="flex flex-row-reverse justify-between items-center gap-x-1">
								<span>Uploading</span>
								<Spinner />
							</div>
						) : (
							'Upload Image'
						)}
					</Button>
				</div>
			</form>

			<ConfirmModal
				ref={confirmModalRef}
				title="Reset profile picture?"
				description="This will replace your current profile picture with the default avatar. This action cannot be undone."
				confirmText="Reset"
				cancelText="Cancel"
				variant="destructive"
				onConfirm={handleResetConfirm}
			/>
		</>
	);
};

const Modal = forwardRef<ModalImperativeHandle, ModalProps>(
	(
		{
			title = 'Upload Image',
			description = 'Upload a new image (max 5MB)',
			currentImageUrl,
			imageClassName = 'w-32 h-32 rounded-lg object-cover border-4 border-border',
			onSuccess,
			uploadFn,
			successMessage = 'Image uploaded successfully!',
			uploadOptions,
			onReset,
			showResetButton = false,
		},
		ref
	) => {
		const { isOpen, closeModal } = useModal(ref);

		return (
			<Dialog open={isOpen} onOpenChange={closeModal}>
				<ImageUpload options={uploadOptions}>
					<DialogContent
						className={uploadOptions?.enableCropping ? 'max-w-3xl max-h-[90vh] overflow-y-auto' : 'max-w-md'}
						onOpenAutoFocus={(e) => e.preventDefault()}
					>
						<ModalContent
							title={title}
							description={description}
							currentImageUrl={currentImageUrl}
							imageClassName={imageClassName}
							onSuccess={onSuccess}
							uploadFn={uploadFn}
							successMessage={successMessage}
							onReset={onReset}
							showResetButton={showResetButton}
							closeModal={closeModal}
						/>
					</DialogContent>
				</ImageUpload>
			</Dialog>
		);
	}
);

Modal.displayName = 'ImageUpload.Modal';

export default Modal;
