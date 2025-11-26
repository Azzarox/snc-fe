import { RegisterForm } from './RegisterForm';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';

const meta = {
	title: 'Components/Auth/RegisterForm',
	component: RegisterForm,
	parameters: {
		layout: 'padded',
	},
	decorators: [
		(Story) => (
			<div className="flex items-center justify-center min-h-screen">
				<div className="w-full max-w-xl">
					<Story />
				</div>
			</div>
		),
	],
} satisfies Meta<typeof RegisterForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Step1: Story = {
	args: {},
};

export const Step2: Story = {
	args: {},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const usernameInput = canvas.getByLabelText(/username/i);
		const emailInput = canvas.getByLabelText(/email/i);
		const passwordInput = canvas.getByLabelText(/^password$/i);
		const confirmPasswordInput = canvas.getByLabelText(/confirm password/i);

		await userEvent.type(usernameInput, 'test123');
		await userEvent.type(emailInput, 'test123@gmail.com');
		await userEvent.type(passwordInput, 'test123');
		await userEvent.type(confirmPasswordInput, 'test123');

		const nextButton = canvas.getByRole('button', { name: /next/i });
		await userEvent.click(nextButton);
	},
};
