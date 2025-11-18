import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toastService } from '@/services/common/toastService';
import { createPostSchema, type CreatePostFormData } from '@/schemas/posts/createPostSchema';
import { usePostService } from '@/hooks/usePostService';
import { useConfirmModal } from '@/hooks/useConfirmModal';
import { ConfirmModal } from '@/components/common/ConfirmModal';

type PostFormProps = {
	onPostCreated?: () => void;
};

export const PostForm = ({ onPostCreated }: PostFormProps) => {
	const { createPost } = usePostService();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
		getValues,
	} = useForm<CreatePostFormData>({
		resolver: zodResolver(createPostSchema),
	});

	const confirmModal = useConfirmModal({
		onConfirm: async () => {
			const data = getValues();
			const response = await createPost(data);

			if (response.success) {
				reset();
				toastService.success('Post created successfully!');
				onPostCreated?.();
			}
		},
	});

	const onFormSubmit = () => {
		confirmModal.openModal();
	};

	return (
		<div className="bg-card rounded-lg border border-border p-4">
			<h2 className="text-lg font-semibold mb-4 text-card-foreground">
				Share with the community
			</h2>
			<form onSubmit={handleSubmit(onFormSubmit)}>
				<div className="space-y-3">
					<div>
						<input
							{...register('title')}
							type="text"
							placeholder="Post title..."
							className="w-full p-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground"
						/>
						{errors.title && (
							<p className="text-sm text-destructive mt-1">
								{errors.title.message}
							</p>
						)}
					</div>

					<div>
						<textarea
							{...register('content')}
							placeholder="What's on your mind? Share your music, gear, or tips..."
							className="w-full min-h-24 p-3 bg-background border border-input rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground"
						/>
						{errors.content && (
							<p className="text-sm text-destructive mt-1">
								{errors.content.message}
							</p>
						)}
					</div>
				</div>

				<div className="flex items-center justify-end mt-3">
					<button
						type="submit"
						disabled={isSubmitting}
						className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
					>
						{isSubmitting ? 'Posting...' : 'Post'}
					</button>
				</div>
			</form>

			<ConfirmModal
				ref={confirmModal.modalRef}
				title="Confirm Post"
				description="Are you sure you want to publish this post?"
				confirmText="Post"
				cancelText="Cancel"
				variant="default"
				onConfirm={confirmModal.handleConfirm}
				isLoading={isSubmitting}
			/>
		</div>
	);
};
