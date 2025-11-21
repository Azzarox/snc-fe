import { useImageUploadContext } from '../context/ImageUploadContext';

export const useUploadActions = () => {
	const context = useImageUploadContext();
	return {
		uploadImage: context.uploadImage,
		reset: context.reset,
		setError: context.setError,
	};
};
