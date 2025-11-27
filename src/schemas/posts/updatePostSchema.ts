import z from 'zod';
import { createPostSchema } from './createPostSchema';

export const updatePostSchema = createPostSchema.partial();

export type UpdatePostFormData = z.infer<typeof updatePostSchema>;
