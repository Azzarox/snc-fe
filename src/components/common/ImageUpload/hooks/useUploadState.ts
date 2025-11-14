import { useImageUploadContext } from '../context/ImageUploadContext';

export const useUploadState = () => {
	const context = useImageUploadContext();
	return {
		selectedFile: context.selectedFile,
		error: context.error,
		isUploading: context.isUploading,
		enableCropping: context.enableCropping,
		previewUrl: context.previewUrl,
	};
};
