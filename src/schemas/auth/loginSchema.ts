import z from "zod";

export const loginSchema = z.object({
	identifier: z.string().nonempty('Please enter a email or username!'),
	password: z.string().min(6, 'Password must be at least 6 characters long'),
});
export type LoginFormData = z.infer<typeof loginSchema>;
