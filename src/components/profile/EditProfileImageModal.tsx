import { forwardRef } from 'react';
import type { ModalImperativeHandle } from '@/types/common/ModalImpretiveHandle';
import { useProfileService } from '@/hooks/useProfileService';
import { ImageUploadModal } from '@/components/common/ImageUploadModal/ImageUploadModal';

type EditProfileImageModalProps = {
	currentImageUrl?: string;
	onSuccess: () => void;
};

export const EditProfileImageModal = forwardRef<
	ModalImperativeHandle,
	EditProfileImageModalProps
>(({ currentImageUrl, onSuccess }, ref) => {
	const { updateProfileImage, resetProfileImage } = useProfileService();

	const handleReset = async () => {
		await resetProfileImage();
	};

	return (
		<ImageUploadModal
			ref={ref}
			title="Update Profile Image"
			description="Upload a new profile picture (max 5MB)"
			currentImageUrl={currentImageUrl}
			imageClassName="w-32 h-32 rounded-full object-cover border-4 border-border"
			onSuccess={onSuccess}
			uploadFn={updateProfileImage}
			successMessage="Profile image updated successfully!"
			uploadOptions={{
				maxSizeMB: 5,
				acceptedTypes: [
					'image/jpeg',
					'image/png',
					'image/gif',
					'image/webp',
				],
			}}
			onReset={handleReset}
			showResetButton={true}
		/>
	);
});

EditProfileImageModal.displayName = 'EditProfileImageModal';
