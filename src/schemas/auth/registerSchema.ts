import { z } from 'zod';
export const registerSchema = z.object({
	username: z.string().nonempty('Please enter a username!'),
	password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
