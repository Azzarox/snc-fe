import { z } from 'zod';

// Complete registration schema with all fields
export const registerSchema = z
	.object({
		// Step 1: Account credentials
		username: z
			.string()
			.min(3, 'Username must be at least 3 characters')
			.nonempty('Please enter a username!'),
		email: z.string().email('Please enter a valid email').nonempty('Email is required'),
		password: z.string().min(8, 'Password must be at least 8 characters long'),
		confirmPassword: z.string().nonempty('Please confirm your password'),
		// Step 2: Profile information
		firstName: z.string().min(1, 'First name is required'),
		lastName: z.string().min(1, 'Last name is required'),
		bio: z.string().min(1, 'Bio is required'),
		description: z.string().optional(),
		primarySkill: z.string().min(1, 'Please select your primary skill'),
		yearsExperience: z.string().min(1, 'Please select your experience level'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	});

export type RegisterFormData = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
	username: z.string().nonempty('Please enter a username!'),
	password: z.string().min(6, 'Password must be at least 6 characters long'),
});
export type LoginFormData = z.infer<typeof loginSchema>;
