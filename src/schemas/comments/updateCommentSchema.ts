import { z } from 'zod';

export const updateCommentSchema = z.object({
	content: z.string().min(1, 'Comment cannot be empty').max(1000, 'Comment cannot exceed 1000 characters'),
});

export type UpdateCommentFormData = z.infer<typeof updateCommentSchema>;
