import type { ApiResponse } from '@/types/api/response';
import { useState, useRef, useCallback } from 'react';
import type { Area } from 'react-easy-crop';

export type ImageUploadOptions = {
	maxSizeMB?: number;
	acceptedTypes?: string[];
	onValidationError?: (error: string) => void;
	enableCropping?: boolean;
};

const VALIDATION_ERRORS = {
	INVALID_TYPE: 'Please select a valid image file',
	FILE_TOO_LARGE: (sizeMB: number) =>
		`Image size must be less than ${sizeMB}MB`,
	NO_FILE_SELECTED: 'Please select an image',
	CROP_REQUIRED: 'Please adjust the crop area',
	UPLOAD_FAILED: 'Upload failed',
} as const;

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
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(
		null
	);

	const validateFile = useCallback(
		(file: File): string | null => {
			const isValidType = acceptedTypes.some((type) =>
				file.type.startsWith(type.split('/')[0])
			);

			if (!isValidType) {
				return VALIDATION_ERRORS.INVALID_TYPE;
			}

			const maxSizeBytes = maxSizeMB * 1024 * 1024;
			if (file.size > maxSizeBytes) {
				return VALIDATION_ERRORS.FILE_TOO_LARGE(maxSizeMB);
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

	const processFile = useCallback(
		(file: File): boolean => {
			const validationError = validateFile(file);

			if (validationError) {
				setError(validationError);
				onValidationError?.(validationError);
				return false;
			}

			setError(null);
			setSelectedFile(file);
			createPreview(file);
			return true;
		},
		[validateFile, createPreview, onValidationError]
	);

	const handleFileSelect = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files?.[0];
			if (!file) return;

			processFile(file);
		},
		[processFile]
	);

	const handleDrop = useCallback(
		(event: React.DragEvent) => {
			event.preventDefault();
			event.stopPropagation();

			const file = event.dataTransfer.files?.[0];
			if (!file) return;

			const isValid = processFile(file);

			if (isValid && fileInputRef.current) {
				const dataTransfer = new DataTransfer();
				dataTransfer.items.add(file);
				fileInputRef.current.files = dataTransfer.files;
			}
		},
		[processFile]
	);

	const handleDragOver = useCallback((event: React.DragEvent) => {
		event.preventDefault();
		event.stopPropagation();
	}, []);

	const triggerFileInput = useCallback(() => {
		fileInputRef.current?.click();
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

	const buildFormData = useCallback((): FormData => {
		const formData = new FormData();
		formData.append('image', selectedFile!);

		if (enableCropping && croppedAreaPixels) {
			formData.append(
				'croppedAreaPixels',
				JSON.stringify(croppedAreaPixels)
			);
		}

		return formData;
	}, [selectedFile, enableCropping, croppedAreaPixels]);

	const uploadImage = useCallback(
		async <T>(
			uploadFn: (formData: FormData) => Promise<ApiResponse<T>>
		): Promise<{ success: boolean; message?: string | null; data?: T }> => {
			if (!selectedFile) {
				const errorMsg = VALIDATION_ERRORS.NO_FILE_SELECTED;
				setError(errorMsg);
				return { success: false, message: errorMsg };
			}

			if (enableCropping && !croppedAreaPixels) {
				const errorMsg = VALIDATION_ERRORS.CROP_REQUIRED;
				setError(errorMsg);
				return { success: false, message: errorMsg };
			}

			setIsUploading(true);
			setError(null);

			try {
				const formData = buildFormData();
				const result = await uploadFn(formData);

				if (!result.success) {
					setError(result.message || VALIDATION_ERRORS.UPLOAD_FAILED);
				}

				return result;
			} catch (err: any) {
				console.error(err.message);
				throw err;
			} finally {
				setIsUploading(false);
			}
		},
		[selectedFile, enableCropping, croppedAreaPixels, buildFormData]
	);

	return {
		fileInputRef,
		selectedFile,
		previewUrl,
		error,
		setError,
		isUploading,
		enableCropping,

		handleFileSelect,
		handleDrop,
		handleDragOver,
		triggerFileInput,
		removeImage,
		reset,
		uploadImage,

		crop,
		setCrop,
		zoom,
		setZoom,
		croppedAreaPixels,
		setCroppedAreaPixels,
	};
};
