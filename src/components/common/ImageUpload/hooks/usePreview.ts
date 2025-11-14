import { useImageUploadContext } from '../context/ImageUploadContext';

export const usePreview = () => {
	const context = useImageUploadContext();
	return {
		previewUrl: context.previewUrl,
		removeImage: context.removeImage,
	};
};
