import { forwardRef, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@shadcn/components/ui/dialog';
import { Button } from '@shadcn/components/ui/button';
import { Input } from '@shadcn/components/ui/input';
import { Copy, Check } from 'lucide-react';
import QRCode from 'react-qr-code';
import type { ModalImperativeHandle } from '@/types/common/ModalImpretiveHandle';
import { useModal } from '@/hooks/useModal';

type ShareProfileModalProps = {
	userId: number;
	username?: string;
};

export const ShareProfileModal = forwardRef<ModalImperativeHandle, ShareProfileModalProps>(({ userId, username }, ref) => {
	const { isOpen, openModal, closeModal } = useModal(ref);
	const [copied, setCopied] = useState(false);

	const profileUrl = `${window.location.origin}/profile/${userId}`;

	const handleCloseModal = () => {
		closeModal();
		setCopied(false);
	};

	const handleCopyLink = async () => {
		try {
			await navigator.clipboard.writeText(profileUrl);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={handleCloseModal}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Share Profile</DialogTitle>
					<DialogDescription>Share this profile with others</DialogDescription>
				</DialogHeader>

				<div className="flex flex-col items-center gap-6 py-4">
					{/* QR Code Container */}
					<div className="relative p-6 rounded-2xl bg-gradient-to-br from-primary/5 via-primary/2 to-accent/5 shadow-lg">
						<div className="bg-white p-4 rounded-xl">
							<QRCode
								value={profileUrl}
								size={220}
								level="H"
								className="h-auto w-full"
								fgColor="#000000"
								bgColor="#ffffff"
							/>
						</div>
					</div>

					{username && <p className="text-2xl uppercase font-mono tracking-wider font-bold">@{username}</p>}

					<div className="flex w-full items-center gap-2">
						<Input value={profileUrl} readOnly className="flex-1" />
						<Button size="icon" variant="outline" onClick={handleCopyLink} className="cursor-pointer">
							{copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
						</Button>
					</div>

					<p className="text-xs text-muted-foreground text-center">
						Scan the QR code or copy the link to share this profile
					</p>
				</div>
			</DialogContent>
		</Dialog>
	);
});

ShareProfileModal.displayName = 'ShareProfileModal';
