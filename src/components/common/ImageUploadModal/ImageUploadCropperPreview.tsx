import { useCallback } from 'react';
import Cropper from 'react-easy-crop';
import type { Area } from 'react-easy-crop';
import { Slider } from '@shadcn/components/ui/slider';
import { FieldLabel, FieldDescription } from '@shadcn/components/ui/field';
import { Button } from '@shadcn/components/ui/button';
import type { ImageUploadState } from './ImageUploadModal';

type ImageUploadCropperPreviewProps = {
	imageUpload: ImageUploadState;
	aspectRatio?: number;
	previewHeight?: string;
};

const ImageUploadCropperPreview = ({
	imageUpload,
	aspectRatio = 5, // 5:1 for cover images (1280px / 256px = 5:1)
	previewHeight = 'h-32',
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
		<div className="space-y-6">
			<div className="relative w-full h-[400px] bg-black rounded-lg overflow-hidden border-2 border-border">
				<Cropper
					image={previewUrl}
					crop={crop}
					zoom={zoom}
					aspect={aspectRatio}
					onCropChange={setCrop}
					onZoomChange={setZoom}
					onCropComplete={onCropComplete}
					objectFit="contain"
				/>
			</div>

			<div className="flex items-center gap-4">
				<div className="flex-1 space-y-2">
					<div className="flex items-center justify-between">
						<FieldLabel className="text-sm">Zoom</FieldLabel>
						<span className="text-xs text-muted-foreground">{zoom.toFixed(1)}x</span>
					</div>
					<Slider
						value={[zoom]}
						onValueChange={(value) => setZoom(value[0])}
						min={1}
						max={3}
						step={0.1}
						className="w-full"
					/>
				</div>
				<Button
					type="button"
					variant="outline"
					onClick={removeImage}
					className="cursor-pointer"
				>
					Change Image
				</Button>
			</div>

			<div className="text-sm text-muted-foreground text-center">
				<p>Drag to reposition • Scroll or use slider to zoom</p>
				<p className="text-xs mt-1">The selected area will be your cover image</p>
			</div>
		</div>
	);
};

export default ImageUploadCropperPreview;
