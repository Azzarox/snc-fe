import { LoginForm } from './LoginForm';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
	title: 'Components/Auth/LoginForm',
	component: LoginForm,
	parameters: {
		layout: 'padded',
	},
	decorators: [
		(Story) => (
			<div className="flex items-center justify-center min-h-screen">
				<div className="w-full max-w-sm">
					<Story />
				</div>
			</div>
		),
	],
} satisfies Meta<typeof LoginForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
