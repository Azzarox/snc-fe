import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toastService } from '@/services/common/toastService';
import {
	createCommentSchema,
	type CreateCommentFormData,
} from '@/schemas/comments/createCommentSchema';
import { useCommentService } from '@/hooks/useCommentService';
import { useConfirmModal } from '@/hooks/useConfirmModal';
import { ConfirmModal } from '@/components/common/ConfirmModal';
import { Info } from 'lucide-react';
import { Button } from '@shadcn/components/ui/button';

type CommentFormProps = {
	postId: number;
	onCommentCreated?: () => void;
	initialValue?: string;
	onCancel?: () => void;
	mode?: 'create' | 'edit';
	commentId?: number;
};

export const CommentForm = ({
	postId,
	onCommentCreated,
	initialValue = '',
	onCancel,
	mode = 'create',
	commentId,
}: CommentFormProps) => {
	const { createComment, updateComment } = useCommentService();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
		getValues,
		watch,
	} = useForm<CreateCommentFormData>({
		resolver: zodResolver(createCommentSchema),
		defaultValues: {
			content: initialValue,
		},
	});

	const content = watch('content');
	const charCount = content?.length || 0;

	const confirmModal = useConfirmModal({
		onConfirm: async () => {
			const data = getValues();

			if (mode === 'edit' && commentId) {
				const response = await updateComment(postId, commentId, data);
				if (response.success) {
					toastService.success('Comment updated successfully!');
					onCommentCreated?.();
					onCancel?.();
				}
			} else {
				const response = await createComment(postId, data);
				if (response.success) {
					reset();
					toastService.success('Comment posted successfully!');
					onCommentCreated?.();
				}
			}
		},
	});

	const onFormSubmit = () => {
		confirmModal.openModal();
	};

	return (
		<div className="bg-card rounded-lg border border-border p-4">
			<form onSubmit={handleSubmit(onFormSubmit)}>
				<div className="space-y-3">
					<div>
						<textarea
							{...register('content')}
							placeholder="Share your thoughts..."
							className="w-full min-h-24 p-3 bg-background border border-input rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground font-mono text-sm"
						/>
						{errors.content ? (
							<p className="text-sm text-destructive mt-1">
								{errors.content.message}
							</p>
						) : (
							<div className="flex items-center justify-between mt-1.5">
								<div className="flex items-center gap-1.5 text-xs text-muted-foreground">
									<Info className="h-3.5 w-3.5" />
									<span>Markdown formatting supported!</span>
								</div>
								<span
									className={`text-xs ${
										charCount > 1000
											? 'text-destructive'
											: 'text-muted-foreground'
									}`}
								>
									{charCount}/1000
								</span>
							</div>
						)}
					</div>
				</div>

				<div className="flex items-center justify-end gap-2 mt-3">
					{mode === 'edit' && onCancel && (
						<Button
							type="button"
							variant="outline"
							onClick={onCancel}
							disabled={isSubmitting}
						>
							Cancel
						</Button>
					)}
					<Button type="submit" disabled={isSubmitting}>
						{isSubmitting
							? mode === 'edit'
								? 'Updating...'
								: 'Posting...'
							: mode === 'edit'
								? 'Update'
								: 'Comment'}
					</Button>
				</div>
			</form>

			<ConfirmModal
				ref={confirmModal.modalRef}
				title={mode === 'edit' ? 'Update Comment' : 'Post Comment'}
				description={
					mode === 'edit'
						? 'Are you sure you want to update this comment?'
						: 'Are you sure you want to post this comment?'
				}
				confirmText={mode === 'edit' ? 'Update' : 'Post'}
				cancelText="Cancel"
				variant="default"
				onConfirm={confirmModal.handleConfirm}
				isLoading={isSubmitting}
			/>
		</div>
	);
};
