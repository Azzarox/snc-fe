import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { BrowserRouter } from 'react-router';
import { AuthProvider } from './context/AuthContext.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
		<AuthProvider>
			<ThemeProvider>
				<App />
			</ThemeProvider>
		</AuthProvider>
		</BrowserRouter>
	</StrictMode>
);
