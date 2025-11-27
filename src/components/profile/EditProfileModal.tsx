import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@shadcn/components/ui/button';
import { Input } from '@shadcn/components/ui/input';
import { Textarea } from '@shadcn/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@shadcn/components/ui/dialog';
import { Field, FieldLabel, FieldDescription, FieldError } from '@shadcn/components/ui/field';
import type { UserProfile } from '@/types/domain/user';
import { updateProfileSchema, type UpdateProfileFormData } from '@/schemas/profile/updateProfileSchema';
import { useProfileService } from '@/hooks/useProfileService';
import { ErrorMessages } from '@/consts/errors';
import { toastService } from '@/services/common/toastService';
import { forwardRef } from 'react';
import type { ModalImperativeHandle } from '@/types/common/ModalImpretiveHandle';
import { useModal } from '@/hooks/useModal';

type EditProfileModalProps = {
	profile?: UserProfile | null;
	onSuccess: () => void;
};

export const EditProfileModal = forwardRef<ModalImperativeHandle, EditProfileModalProps>(({ profile, onSuccess }, ref) => {
	const { isOpen, closeModal } = useModal(ref);

	const { updateUserProfile } = useProfileService();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
		setError,
	} = useForm<UpdateProfileFormData>({
		resolver: zodResolver(updateProfileSchema),
		defaultValues: {
			firstName: profile?.firstName || '',
			lastName: profile?.lastName || '',
			bio: profile?.bio || '',
			description: profile?.description || '',
		},
		mode: 'onTouched',
	});

	const onSubmit = async (data: UpdateProfileFormData) => {
		const res = await updateUserProfile(data);

		if (!res.success && res.errors) {
			setError('root', res.errors);
			return;
		}

		if (!res.success) {
			setError('root', {
				message: res.message ?? ErrorMessages.UNEXPECTED_ERROR,
			});
			return;
		}

		onSuccess();
		toastService.success('Successfully updated profile!');

		handleClose();
	};

	const handleClose = () => {
		reset();
		closeModal();
	};

	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Edit Profile</DialogTitle>
					<DialogDescription>Update your profile information</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					<Field>
						<FieldLabel htmlFor="firstName">First Name</FieldLabel>
						<Input id="firstName" {...register('firstName')} placeholder="Enter your first name" autoFocus />
						{errors.firstName && <FieldError>{errors.firstName?.message}</FieldError>}
					</Field>

					<Field>
						<FieldLabel htmlFor="lastName">Last Name</FieldLabel>
						<Input id="lastName" {...register('lastName')} placeholder="Enter your last name" />
						{errors.lastName && <FieldError>{errors.lastName?.message}</FieldError>}
					</Field>

					<Field>
						<FieldLabel htmlFor="bio">Bio</FieldLabel>
						<FieldDescription>A short bio about yourself (max 120 characters)</FieldDescription>
						<Textarea id="bio" {...register('bio')} placeholder="ex: Acoustic guitarist & songwriter 🎸" rows={2} />
						{errors.bio && (
							<>
								<FieldError>{errors.bio?.message}</FieldError>
							</>
						)}
					</Field>

					<Field>
						<FieldLabel htmlFor="description">Description</FieldLabel>
						<FieldDescription>Tell us more about yourself (max 255 characters)</FieldDescription>
						<Textarea
							id="description"
							{...register('description')}
							placeholder="Share your musical journey, interests, and what you're passionate about..."
							rows={4}
						/>
						{errors.description && <FieldError>{errors.description?.message}</FieldError>}
					</Field>

					<div className="flex gap-2 justify-end pt-4">
						<Button
							type="button"
							variant="outline"
							onClick={handleClose}
							disabled={isSubmitting}
							className="cursor-pointer"
						>
							Cancel
						</Button>
						<Button className="cursor-pointer" type="submit" disabled={isSubmitting}>
							{isSubmitting ? 'Saving...' : 'Save Changes'}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
});
