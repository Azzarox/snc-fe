import { useImageUploadContext } from '../context/ImageUploadContext';

export const useCropper = () => {
	const context = useImageUploadContext();
	return {
		previewUrl: context.previewUrl,
		crop: context.crop,
		setCrop: context.setCrop,
		zoom: context.zoom,
		setZoom: context.setZoom,
		setCroppedAreaPixels: context.setCroppedAreaPixels,
		removeImage: context.removeImage,
	};
};
