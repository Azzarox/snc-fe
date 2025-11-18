import z from "zod";

export const createPostSchema = z.object({
	title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
	content: z.string().min(1, 'Content is required'),
});

export type CreatePostFormData = z.infer<typeof createPostSchema>;