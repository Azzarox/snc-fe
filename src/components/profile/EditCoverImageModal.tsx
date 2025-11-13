import { forwardRef } from 'react';
import type { ModalImperativeHandle } from '@/types/common/ModalImpretiveHandle';
import { useProfileService } from '@/hooks/useProfileService';
import { ImageUploadModal } from '@/components/common/ImageUploadModal/ImageUploadModal';

type EditCoverImageModalProps = {
	currentImageUrl?: string;
	onSuccess: () => void;
};

export const EditCoverImageModal = forwardRef<
	ModalImperativeHandle,
	EditCoverImageModalProps
>(({ currentImageUrl, onSuccess }, ref) => {
	const { updateCoverImage, resetCoverImage } = useProfileService();

	const handleReset = async () => {
		await resetCoverImage();
	};
	
	return (
		<ImageUploadModal
			ref={ref}
			title="Update Cover Image"
			description="Upload a new cover image (max 5MB)"
			currentImageUrl={currentImageUrl}
			imageClassName="w-full h-32 rounded-lg object-cover border-4 border-border"
			onSuccess={onSuccess}
			uploadFn={updateCoverImage}
			successMessage="Cover image updated successfully!"
			uploadOptions={{
				maxSizeMB: 5,
				acceptedTypes: [
					'image/jpeg',
					'image/png',
					'image/gif',
					'image/webp',
				],
				enableCropping: true,
			}}
			onReset={handleReset}
			showResetButton={true}
		/>
	);
});

EditCoverImageModal.displayName = 'EditCoverImageModal';
