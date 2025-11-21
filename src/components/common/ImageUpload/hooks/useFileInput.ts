import { useImageUploadContext } from '../context/ImageUploadContext';

export const useFileInput = () => {
	const context = useImageUploadContext();
	return {
		fileInputRef: context.fileInputRef,
		handleFileSelect: context.handleFileSelect,
	};
};
