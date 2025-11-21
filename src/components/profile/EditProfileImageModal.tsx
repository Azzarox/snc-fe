import { forwardRef } from 'react';
import type { ModalImperativeHandle } from '@/types/common/ModalImpretiveHandle';
import { useProfileService } from '@/hooks/useProfileService';
import { ImageUpload } from '@/components/common/ImageUpload/ImageUpload';

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const MAX_SIZE_MB = 5;

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
		<ImageUpload.Modal
			ref={ref}
			title="Update Profile Image"
			description="Upload a new profile picture (max 5MB)"
			currentImageUrl={currentImageUrl}
			imageClassName="w-32 h-32 rounded-full object-cover border-4 border-border"
			onSuccess={onSuccess}
			uploadFn={updateProfileImage}
			successMessage="Profile image updated successfully!"
			uploadOptions={{
				maxSizeMB: MAX_SIZE_MB,
				acceptedTypes: ACCEPTED_TYPES,
			}}
			onReset={handleReset}
			showResetButton={true}
		/>
	);
});

EditProfileImageModal.displayName = 'EditProfileImageModal';
