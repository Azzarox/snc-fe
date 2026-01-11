import { z } from 'zod';

// Add the variables to "vite-env.d.ts" as well for type safety.
export const envSchema = z.object({
	VITE_BASE_API_URL: z.url()
});

export type ViteCustomEnv = z.infer<typeof envSchema>