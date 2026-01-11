import { defineConfig, loadEnv, type ConfigEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { envSchema } from './config/env/envSchema'

// https://vite.dev/config/
export default ({ mode }: ConfigEnv) => {

	// Parse env vars ... 
	envSchema.parse(loadEnv(mode, process.cwd(), 'VITE_'));

	return defineConfig({
		plugins: [react(), tailwindcss()],
		// server: {
		// 	proxy: {
		// 		'/@api': {
		// 			target: env.VITE_BASE_API_URL,
		// 			changeOrigin: true,
		// 			rewrite: (path) => path.replace(/^\/@api/, ''),
		// 		},
		// 	},
		// },
		resolve: {
			alias: {
				'@shadcn': path.resolve(__dirname, '@shadcn'),
				'@': path.resolve(__dirname, './src'),
			},
		},
	})
};
