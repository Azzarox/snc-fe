import { useImageUploadContext } from '../context/ImageUploadContext';

export const useError = () => {
	const context = useImageUploadContext();
	return {
		error: context.error,
	};
};
