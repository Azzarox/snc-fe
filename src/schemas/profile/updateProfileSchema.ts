import z from 'zod';

export const updateProfileSchema = z.object({
	firstName: z.string().min(1, 'First name is required').max(50, 'First name is too long'),
	lastName: z.string().min(1, 'Last name is required').max(50, 'Last name is too long'),
	bio: z.string().max(120, 'Bio must be 120 characters or less').optional(),
	description: z.string().max(255, 'Description must be 255 characters or less').optional(),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
