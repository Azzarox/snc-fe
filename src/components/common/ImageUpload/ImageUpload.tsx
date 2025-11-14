import {
	type ReactNode,
	type FC,
	type ForwardRefExoticComponent,
	type RefAttributes,
} from 'react';
import { ImageUploadProvider } from './context/ImageUploadContext';
import type { ImageUploadOptions } from '@/hooks/useImageUpload';
import type { ModalImperativeHandle } from '@/types/common/ModalImpretiveHandle';
import type { ApiResponse } from '@/types/api/response';

type ImageUploadProps = {
	children: ReactNode;
	options?: ImageUploadOptions;
};

type PreviewProps = {
	currentImageUrl?: string;
	imageClassName?: string;
};

type CropperPreviewProps = {
	aspectRatio?: number;
};

type ModalProps = {
	title?: string;
	description?: string;
	currentImageUrl?: string;
	imageClassName?: string;
	onSuccess: () => void;
	uploadFn: (formData: FormData) => Promise<ApiResponse<any>>;
	successMessage?: string;
	uploadOptions?: ImageUploadOptions;
	onReset?: () => Promise<void>;
	showResetButton?: boolean;
};

type ImageUploadComponent = FC<ImageUploadProps> & {
	Preview: FC<PreviewProps>;
	CropperPreview: FC<CropperPreviewProps>;
	UploadZone: FC;
	FileInput: FC;
	ErrorMessage: FC;
	Modal: ForwardRefExoticComponent<
		ModalProps & RefAttributes<ModalImperativeHandle>
	>;
};

export const ImageUpload = (({ children, options }: ImageUploadProps) => {
	return (
		<ImageUploadProvider options={options}>{children}</ImageUploadProvider>
	);
}) as ImageUploadComponent;

import Preview from './Preview';
import CropperPreview from './CropperPreview';
import UploadZone from './UploadZone';
import FileInput from './FileInput';
import ErrorMessage from './ErrorMessage';
import Modal from './Modal';

ImageUpload.Preview = Preview;
ImageUpload.CropperPreview = CropperPreview;
ImageUpload.UploadZone = UploadZone;
ImageUpload.FileInput = FileInput;
ImageUpload.ErrorMessage = ErrorMessage;
ImageUpload.Modal = Modal;
