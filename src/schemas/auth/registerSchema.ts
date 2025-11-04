import { z } from 'zod';
export const registerSchema = z
	.object({
		username: z
			.string()
			.min(3, 'Username must be at least 3 characters')
			.nonempty('Please enter a username!'),
		email: z.email('Please enter a valid email!'),
		password: z
			.string()
			.min(6, 'Password must be at least 6 characters long'),
		confirmPassword: z.string().nonempty('Please confirm your password'),

		firstName: z.string().min(1, 'Please enter a first name!'),
		lastName: z.string().min(1, 'Please enter a last name!'),
		bio: z
			.string()
			.max(60, 'Please shorten the bio information!')
			.optional(),
		description: z
			.string()
			.max(255, 'Please shorten the description information!')
			.optional(),
		// primarySkill: z.string().min(1, 'Please select your primary skill'),
		// yearsExperience: z.string().min(1, 'Please select your experience level'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	});

export type RegisterFormData = z.infer<typeof registerSchema>;
