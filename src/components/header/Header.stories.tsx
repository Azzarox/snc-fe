import type { Meta, StoryObj } from '@storybook/react';
import Header from './Header';
import { AuthContext } from '@/context/AuthContext';

const meta = {
	title: 'Components/Header/Header',
	component: Header,
	parameters: {
		layout: 'fullscreen',
	},
	decorators: [
		(Story) => (
			<AuthContext.Provider
				value={{
					user: null,
					token: null,
					login: () => {},
					logout: () => {},
					loading: false,
				}}
			>
				<Story />
			</AuthContext.Provider>
		),
	],
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAuthenticatedUser: Story = {
	decorators: [
		(Story) => (
			<AuthContext.Provider
				value={{
					user: {
						id: 1,
						username: 'test123',
						email: 'test123@gmail.com',
					},
					token: 'fake-token',
					loading: false,
					login: () => {},
					logout: () => {},
				}}
			>
				<Story />
			</AuthContext.Provider>
		),
	],
};
