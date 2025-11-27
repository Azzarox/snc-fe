import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

const config: StorybookConfig = {
	stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)', '../@shadcn/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
	framework: {
		name: '@storybook/react-vite',
		options: {},
	},
	viteFinal: async (config) => {
		// Merge with your existing Vite config
		return {
			...config,
			plugins: [...(config.plugins || []), tailwindcss()],
			resolve: {
				...config.resolve,
				alias: {
					...config.resolve?.alias,
					'@shadcn': path.resolve(__dirname, '../@shadcn'),
					'@': path.resolve(__dirname, '../src'),
				},
			},
		};
	},
};

export default config;
