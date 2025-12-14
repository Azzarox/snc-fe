import type { Preview } from '@storybook/react';
import '../src/App.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../src/context/AuthContext';
import { ThemeProvider } from '../src/context/ThemeContext';

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		backgrounds: {
			default: 'light',
		},
	},
	decorators: [
		(Story) => (
			<BrowserRouter>
				<AuthContext.Provider
					value={{
						user: {
							id: 1,
							username: 'test123',
							email: 'test123@gmail.com',
							firstName: 'Test',
							lastName: 'Testing',
							avatarUrl: null,
							coverImageUrl: null,
							bio: null,
							createdAt: '2024-01-01T00:00:00Z',
							updatedAt: '2024-01-01T00:00:00Z',
						},
						token: 'fake-token',
						loading: false,
						login: () => {},
						logout: () => {},
					}}
				>
					<ThemeProvider>
						<Story />
					</ThemeProvider>
				</AuthContext.Provider>
			</BrowserRouter>
		),
	],
};

export default preview;
