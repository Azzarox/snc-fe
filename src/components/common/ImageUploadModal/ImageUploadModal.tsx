import { Button } from '@shadcn/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@shadcn/components/ui/dialog';
import {
	Field,
	FieldLabel,
	FieldDescription,
	FieldError,
} from '@shadcn/components/ui/field';
import { forwardRef } from 'react';
import type { ModalImperativeHandle } from '@/types/common/ModalImpretiveHandle';
import { useModal } from '@/hooks/useModal';
import {
	useImageUpload,
	type ImageUploadOptions,
} from '@/hooks/useImageUpload';
import type { ApiResponse } from '@/types/api/response';
import ImageUploadPreview from './ImageUploadPreview';
import UploadZone from './UploadZone';

type ImageUploadModalProps = {
	title?: string;
	description?: string;
	currentImageUrl?: string;
	imageClassName?: string;
	onSuccess: () => void;
	uploadFn: <T>(formData: FormData) => Promise<ApiResponse<T>>;
	successMessage?: string;
	uploadOptions?: ImageUploadOptions;
};

export type ImageUploadState = ReturnType<typeof useImageUpload>;

export const ImageUploadModal = forwardRef<
	ModalImperativeHandle,
	ImageUploadModalProps
>(
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
		},
		ref
	) => {
		const { isOpen, closeModal } = useModal(ref);
		const imageUpload = useImageUpload(uploadOptions);

		const handleSubmit = async (e: React.FormEvent) => {
			e.preventDefault();

			const result = await imageUpload.uploadImage(uploadFn);

			if (result.success) {
				const { toastService } = await import(
					'@/services/common/toastService'
				);
				toastService.success(successMessage);
				onSuccess();
				handleClose();
			}
		};

		const handleClose = () => {
			imageUpload.reset();
			closeModal();
		};

		return (
			<Dialog open={isOpen} onOpenChange={handleClose}>
				<DialogContent className="max-w-md">
					<DialogHeader>
						<DialogTitle>{title}</DialogTitle>
					</DialogHeader>

					<form onSubmit={handleSubmit} className="space-y-6">
						<Field>
							<FieldLabel>Image</FieldLabel>
							<FieldDescription>{description}</FieldDescription>

							<div className="space-y-4">
								<ImageUploadPreview
									imageUpload={imageUpload}
									currentImageUrl={currentImageUrl}
									imageClassName={imageClassName}
								/>

								<UploadZone imageUpload={imageUpload} />

								<input
									ref={imageUpload.fileInputRef}
									type="file"
									accept="image/*"
									onChange={imageUpload.handleFileSelect}
									className="hidden"
								/>
							</div>

							{imageUpload.error && (
								<FieldError>{imageUpload.error}</FieldError>
							)}
						</Field>

						<div className="flex gap-2 justify-end pt-4">
							<Button
								type="button"
								variant="outline"
								onClick={handleClose}
								disabled={imageUpload.isUploading}
								className="cursor-pointer"
							>
								Cancel
							</Button>
							<Button
								className="cursor-pointer"
								type="submit"
								disabled={
									imageUpload.isUploading ||
									!imageUpload.selectedFile
								}
							>
								{imageUpload.isUploading
									? 'Uploading...'
									: 'Upload Image'}
							</Button>
						</div>
					</form>
				</DialogContent>
			</Dialog>
		);
	}
);

ImageUploadModal.displayName = 'ImageUploadModal';
