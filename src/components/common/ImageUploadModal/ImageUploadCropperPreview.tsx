import { useCallback } from 'react';
import Cropper from 'react-easy-crop';
import type { Area } from 'react-easy-crop';
import { Slider } from '@shadcn/components/ui/slider';
import { FieldLabel } from '@shadcn/components/ui/field';
import { Button } from '@shadcn/components/ui/button';
import type { ImageUploadState } from './ImageUploadModal';

type ImageUploadCropperPreviewProps = {
	imageUpload: ImageUploadState;
	aspectRatio?: number;
};

const ImageUploadCropperPreview = ({
	imageUpload,
	aspectRatio = 5, // 5:1 for cover images (1280px / 256px = 5:1)
}: ImageUploadCropperPreviewProps) => {
	const {
		previewUrl,
		crop,
		setCrop,
		zoom,
		setZoom,
		setCroppedAreaPixels,
		removeImage,
	} = imageUpload;

	const onCropComplete = useCallback(
		(_croppedArea: Area, croppedAreaPixels: Area) => {
			const roundedCoords = {
				x: Math.round(croppedAreaPixels.x),
				y: Math.round(croppedAreaPixels.y),
				width: Math.round(croppedAreaPixels.width),
				height: Math.round(croppedAreaPixels.height),
			};
			console.log('Crop coordinates:', roundedCoords);
			setCroppedAreaPixels(roundedCoords);
		},
		[setCroppedAreaPixels]
	);

	if (!previewUrl) return null;

	return (
		<div className="space-y-4">
			<div className="relative w-full h-[450px] bg-muted/30 rounded-xl overflow-hidden border border-border/50">
				<Cropper
					image={previewUrl}
					crop={crop}
					zoom={zoom}
					aspect={aspectRatio}
					onCropChange={setCrop}
					onZoomChange={setZoom}
					onCropComplete={onCropComplete}
					objectFit="horizontal-cover"
					style={{
						containerStyle: {
							background: 'transparent',
						},
						mediaStyle: {
							opacity: 0.9,
						},
						cropAreaStyle: {
							border: '2px solid hsl(var(--primary))',
							boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
						},
					}}
				/>
			</div>

			<div className="flex items-center gap-3">
				<div className="flex-1 flex items-center gap-3">
					<FieldLabel className="text-sm whitespace-nowrap">Zoom</FieldLabel>
					<Slider
						value={[zoom]}
						onValueChange={(value) => setZoom(value[0])}
						min={1}
						max={3}
						step={0.1}
						className="flex-1"
					/>
					<span className="text-xs text-muted-foreground w-12 text-right">{zoom.toFixed(1)}x</span>
				</div>

				<Button
					type="button"
					variant="ghost"
					size="sm"
					onClick={removeImage}
					className="cursor-pointer shrink-0"
				>
					Change
				</Button>
			</div>

			<div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/30 rounded-lg px-3 py-2">
				<span>💡</span>
				<span>Drag the image to reposition, use the slider or scroll to zoom</span>
			</div>
		</div>
	);
};

export default ImageUploadCropperPreview;
