import { type ReactNode } from 'react';
import { ImageUploadProvider } from './context/ImageUploadContext';
import type { ImageUploadOptions } from '@/hooks/useImageUpload';

import Preview from './Preview';
import CropperPreview from './CropperPreview';
import UploadZone from './UploadZone';
import FileInput from './FileInput';
import ErrorMessage from './ErrorMessage';
import Modal from './Modal';

type ImageUploadProps = {
	children: ReactNode;
	options?: ImageUploadOptions;
};

export function ImageUpload({ children, options }: ImageUploadProps) {
	return (
		<ImageUploadProvider options={options}>{children}</ImageUploadProvider>
	);
}

ImageUpload.Preview = Preview;
ImageUpload.CropperPreview = CropperPreview;
ImageUpload.UploadZone = UploadZone;
ImageUpload.FileInput = FileInput;
ImageUpload.ErrorMessage = ErrorMessage;
ImageUpload.Modal = Modal;
