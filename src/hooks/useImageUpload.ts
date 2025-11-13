import type { ApiResponse } from '@/types/api/response';
import { useState, useRef, useCallback } from 'react';
import type { Area } from 'react-easy-crop';

export type ImageUploadOptions = {
	maxSizeMB?: number;
	acceptedTypes?: string[];
	onValidationError?: (error: string) => void;
	enableCropping?: boolean;
};

export const useImageUpload = (options: ImageUploadOptions = {}) => {
	const {
		maxSizeMB = 5,
		acceptedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
		onValidationError,
		enableCropping = false,
	} = options;

	const fileInputRef = useRef<HTMLInputElement>(null);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isUploading, setIsUploading] = useState(false);

	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

	const validateFile = useCallback(
		(file: File): string | null => {
			if (
				!acceptedTypes.some((type) =>
					file.type.startsWith(type.split('/')[0])
				)
			) {
				return 'Please select a valid image file';
			}

			const maxSizeBytes = maxSizeMB * 1024 * 1024;
			if (file.size > maxSizeBytes) {
				return `Image size must be less than ${maxSizeMB}MB`;
			}

			return null;
		},
		[acceptedTypes, maxSizeMB]
	);

	const createPreview = useCallback((file: File) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			if (typeof reader.result === 'string') {
				setPreviewUrl(reader.result);
			}
		};
		reader.readAsDataURL(file);
	}, []);

	const handleFileSelect = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files?.[0];
			if (!file) return;

			const validationError = validateFile(file);
			if (validationError) {
				setError(validationError);
				onValidationError?.(validationError);
				return;
			}

			setError(null);
			setSelectedFile(file);
			createPreview(file);
		},
		[validateFile, createPreview, onValidationError]
	);

	const handleDrop = useCallback(
		(event: React.DragEvent) => {
			event.preventDefault();
			event.stopPropagation();

			const file = event.dataTransfer.files?.[0];
			if (!file) return;

			const validationError = validateFile(file);
			if (validationError) {
				setError(validationError);
				onValidationError?.(validationError);
				return;
			}

			setError(null);
			setSelectedFile(file);
			createPreview(file);

			if (fileInputRef.current) {
				const dataTransfer = new DataTransfer();
				dataTransfer.items.add(file);
				fileInputRef.current.files = dataTransfer.files;
			}
		},
		[validateFile, createPreview, onValidationError]
	);

	const handleDragOver = useCallback((event: React.DragEvent) => {
		event.preventDefault();
		event.stopPropagation();
	}, []);

	const removeImage = useCallback(() => {
		setSelectedFile(null);
		setPreviewUrl(null);
		setError(null);
		setCrop({ x: 0, y: 0 });
		setZoom(1);
		setCroppedAreaPixels(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	}, []);

	const reset = useCallback(() => {
		removeImage();
		setIsUploading(false);
	}, [removeImage]);

	const triggerFileInput = useCallback(() => {
		fileInputRef.current?.click();
	}, []);

	const uploadImage = useCallback(
		async <T>(
			uploadFn: (formData: FormData) => Promise<ApiResponse<T>>
		): Promise<{ success: boolean; message?: string | null; data?: T }> => {
			if (!selectedFile) {
				const errorMsg = 'Please select an image';
				setError(errorMsg);
				return { success: false, message: errorMsg };
			}

			if (enableCropping && !croppedAreaPixels) {
				const errorMsg = 'Please adjust the crop area';
				setError(errorMsg);
				return { success: false, message: errorMsg };
			}

			setIsUploading(true);
			setError(null);

			try {
				const formData = new FormData();
				formData.append('image', selectedFile);

				if (enableCropping && croppedAreaPixels) {
					formData.append('cropX', croppedAreaPixels.x.toString());
					formData.append('cropY', croppedAreaPixels.y.toString());
					formData.append('cropWidth', croppedAreaPixels.width.toString());
					formData.append('cropHeight', croppedAreaPixels.height.toString());
				}

				const result = await uploadFn(formData);

				if (!result.success) {
					setError(result.message || 'Upload failed');
				}

				return result;
			} catch (err: any) {
				console.error(err.message);
				throw err;
			} finally {
				setIsUploading(false);
			}
		},
		[selectedFile, enableCropping, croppedAreaPixels]
	);

	return {
		selectedFile,
		previewUrl,
		error,
		isUploading,

		fileInputRef,

		handleFileSelect,
		handleDrop,
		handleDragOver,
		removeImage,
		reset,
		triggerFileInput,
		uploadImage,
		setError,

		enableCropping,
		crop,
		setCrop,
		zoom,
		setZoom,
		croppedAreaPixels,
		setCroppedAreaPixels,
	};
};
