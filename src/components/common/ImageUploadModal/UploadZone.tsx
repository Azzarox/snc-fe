import { Upload } from 'lucide-react';
import type { ImageUploadState } from './ImageUploadModal';

type UploadZoneProps = {
	imageUpload: ImageUploadState;
};

const UploadZone = ({ imageUpload }: UploadZoneProps) => {
	const { handleDragOver, handleDrop, triggerFileInput } = imageUpload;

	return (
		<div
			onDragOver={handleDragOver}
			onDrop={handleDrop}
			className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer"
			onClick={triggerFileInput}
		>
			<Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
			<p className="text-sm text-foreground mb-1">
				<span className="text-primary font-medium">
					Click to upload
				</span>{' '}
				or drag and drop
			</p>
			<p className="text-xs text-muted-foreground">
				PNG, JPG, GIF, Webp up to 5MB
			</p>
		</div>
	);
};

export default UploadZone;
