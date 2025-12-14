import { Upload } from 'lucide-react';
import { useUploadZone } from './hooks/useUploadZone';

const UploadZone = () => {
	const { handleDragOver, handleDrop, triggerFileInput } = useUploadZone();

	return (
		<div
			onDragOver={handleDragOver}
			onDrop={handleDrop}
			className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer"
			onClick={triggerFileInput}
		>
			<Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
			<p className="text-sm text-foreground mb-1">
				<span className="text-primary font-medium">Click to upload</span> or drag and drop
			</p>
			<p className="text-xs text-muted-foreground">PNG, JPG, GIF, Webp up to 5MB</p>
		</div>
	);
};

export default UploadZone;
