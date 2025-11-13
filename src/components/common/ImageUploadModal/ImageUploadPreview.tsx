import { X } from 'lucide-react';
import type { ImageUploadState } from './ImageUploadModal';

type ImageUploadPreviewProps = {
	imageUpload: ImageUploadState;
	currentImageUrl?: string;
	imageClassName?: string;
};

const ImageUploadPreview = ({
	imageUpload,
	currentImageUrl,
	imageClassName = 'w-32 h-32 rounded-lg object-cover border-4 border-border',
}: ImageUploadPreviewProps) => {
	const { previewUrl, removeImage } = imageUpload;

	if (!previewUrl && !currentImageUrl) return null;

	const displayUrl = previewUrl || currentImageUrl;
	const isPattern = displayUrl?.startsWith('data:');
	const hasFullWidth = imageClassName.includes('w-full');

	return (
		<div className="flex justify-center">
			<div className={`relative ${hasFullWidth && 'w-full'}`}>
				<div
					className={imageClassName}
					style={{
						backgroundImage: `url(${displayUrl})`,
						backgroundSize: isPattern ? 'auto' : 'cover',
						backgroundPosition: 'center',
						backgroundRepeat: isPattern ? 'repeat' : 'no-repeat',
					}}
				/>
				{previewUrl && (
					<button
						type="button"
						onClick={removeImage}
						className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:opacity-90 transition-opacity"
					>
						<X className="h-4 w-4" />
					</button>
				)}
			</div>
		</div>
	);
};

export default ImageUploadPreview;
