import type { ApiResponse } from '@/types/api/response';
import { useState, useRef, useCallback } from 'react';

export type ImageUploadOptions = {
	maxSizeMB?: number;
	acceptedTypes?: string[];
	onValidationError?: (error: string) => void;
};

export const useImageUpload = (options: ImageUploadOptions = {}) => {
	const {
		maxSizeMB = 5,
		acceptedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
		onValidationError,
	} = options;

	const fileInputRef = useRef<HTMLInputElement>(null);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isUploading, setIsUploading] = useState(false);

	const validateFile = useCallback(
		(file: File): string | null => {

			if (!acceptedTypes.some((type) => file.type.startsWith(type.split('/')[0]))) {
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
			setPreviewUrl(reader.result as string);
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
		async <T,>(
			uploadFn: (formData: FormData) => Promise<ApiResponse<T>>
		): Promise<{ success: boolean; message?: string | null; data?: T }> => {
			if (!selectedFile) {
				const errorMsg = 'Please select an image';
				setError(errorMsg);
				return { success: false, message: errorMsg };
			}

			setIsUploading(true);
			setError(null);

			try {
				const formData = new FormData();
				formData.append('image', selectedFile); 

				const result = await uploadFn(formData);

				if (!result.success) {
					setError(result.message || 'Upload failed');
				}

				return result;
			} catch (err:any) {
				console.error(err.message)
				throw err
			} finally {
				setIsUploading(false);
			}
		},
		[selectedFile]
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
	};
};
