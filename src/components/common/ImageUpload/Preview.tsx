import { X } from 'lucide-react';
import { usePreview } from './hooks/usePreview';

type PreviewProps = {
	currentImageUrl?: string;
	imageClassName?: string;
};

const Preview = ({
	currentImageUrl,
	imageClassName = 'w-32 h-32 rounded-lg object-cover border-4 border-border',
}: PreviewProps) => {
	const { previewUrl, removeImage } = usePreview();

	if (!previewUrl && !currentImageUrl) return null;

	const displayUrl = previewUrl || currentImageUrl;
	// Only treat as pattern if it's an SVG data URL (geopattern), not uploaded images
	const isPattern = displayUrl?.startsWith('data:image/svg+xml');
	const hasFullWidth = imageClassName.includes('w-full');

	return (
		<div className="flex justify-center">
			<div className={`relative ${hasFullWidth && 'w-full'}`}>
				{isPattern ? (
					<div
						className={imageClassName}
						style={{
							backgroundImage: `url(${displayUrl})`,
							backgroundSize: 'auto',
							backgroundPosition: 'center',
							backgroundRepeat: 'repeat',
						}}
					/>
				) : (
					<img
						src={displayUrl}
						alt="Preview"
						className={imageClassName}
					/>
				)}
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

export default Preview;