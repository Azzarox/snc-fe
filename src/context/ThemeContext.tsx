import { localStorageService } from '@/services/common/storage/localStorageService';
import { StorageKeys } from '@/services/common/storage/storage';
import { createContext, useContext, useEffect, useState } from 'react';

// type Theme = 'dark' | 'light' | 'system';

export enum Theme {
	DARK ='dark',
	LIGHT ='light',
	SYSTEM = 'system'
}

type ThemeProviderProps = {
	children: React.ReactNode;
	defaultTheme?: Theme;
	storageKey?: string;
};

type ThemeProviderState = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
	theme: Theme.SYSTEM,
	setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
	children,
	defaultTheme = Theme.SYSTEM,
	...props
}: ThemeProviderProps) {
	const [theme, setTheme] = useState<Theme>(
		() => (localStorageService.getTheme() || defaultTheme
	));

	useEffect(() => {
		const root = window.document.documentElement;

		root.classList.remove(Theme.LIGHT, Theme.DARK);

		if (theme === 'system') {
			const systemTheme = window.matchMedia(
				'(prefers-color-scheme: dark)'
			).matches
				? Theme.DARK
				: Theme.LIGHT;

			root.classList.add(systemTheme);
			return;
		}

		root.classList.add(theme);
	}, [theme]);

	const value = {
		theme,
		setTheme: (theme: Theme) => {
			localStorageService.setTheme(theme);
			setTheme(theme);
		},
	};

	return (
		<ThemeProviderContext.Provider {...props} value={value}>
			{children}
		</ThemeProviderContext.Provider>
	);
}

export const useTheme = () => {
	const context = useContext(ThemeProviderContext);

	if (context === undefined)
		throw new Error('useTheme must be used within a ThemeProvider');

	return context;
};
