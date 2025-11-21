import { forwardRef } from 'react';
import type { ModalImperativeHandle } from '@/types/common/ModalImpretiveHandle';
import { useProfileService } from '@/hooks/useProfileService';
import { ImageUpload } from '@/components/common/ImageUpload/ImageUpload';

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const MAX_SIZE_MB = 5;

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
		<ImageUpload.Modal
			ref={ref}
			title="Update Cover Image"
			description="Upload a new cover image (max 5MB)"
			currentImageUrl={currentImageUrl}
			imageClassName="w-full h-32 rounded-lg object-cover border-4 border-border"
			onSuccess={onSuccess}
			uploadFn={updateCoverImage}
			successMessage="Cover image updated successfully!"
			uploadOptions={{
				maxSizeMB: MAX_SIZE_MB,
				acceptedTypes: ACCEPTED_TYPES,
				enableCropping: true,
			}}
			onReset={handleReset}
			showResetButton={true}
		/>
	);
});

EditCoverImageModal.displayName = 'EditCoverImageModal';
