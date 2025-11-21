import { useImageUploadContext } from '../context/ImageUploadContext';

export const useUploadZone = () => {
	const context = useImageUploadContext();
	return {
		handleDragOver: context.handleDragOver,
		handleDrop: context.handleDrop,
		triggerFileInput: context.triggerFileInput,
	};
};
