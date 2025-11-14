import { createContext, useContext, type ReactNode } from 'react';
import {
	useImageUpload,
	type ImageUploadOptions,
} from '@/hooks/useImageUpload';

export type ImageUploadState = ReturnType<typeof useImageUpload>;

const ImageUploadContext = createContext<ImageUploadState | null>(null);

export const useImageUploadContext = () => {
	const context = useContext(ImageUploadContext);
	if (!context) {
		throw new Error(
			'Image upload compound components must be used within ImageUpload component'
		);
	}
	return context;
};

type ImageUploadProviderProps = {
	children: ReactNode;
	options?: ImageUploadOptions;
};

export const ImageUploadProvider = ({
	children,
	options,
}: ImageUploadProviderProps) => {
	const imageUpload = useImageUpload(options);

	return (
		<ImageUploadContext.Provider value={imageUpload}>
			{children}
		</ImageUploadContext.Provider>
	);
};
