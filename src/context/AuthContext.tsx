import { createContext, useContext, useEffect, useState } from 'react';
import { localStorageService } from '@/services/common/storage/localStorageService';
import { sessionStorageService } from '@/services/common/storage/sessionStorageService';
import { toastService } from '@/services/common/toastService';
import { useAuthService } from '@/hooks/useAuthService';

export type User = { username: string } | null;

type AuthContextValue = {
	user: User;
	token: string | null;
	loading: boolean;
	login: (token: string) => void;
	logout: () => void;
	user: User;
	token: string | null;
	loading: boolean;
	login: (token: string) => void;
	logout: () => void;
};

const AuthContext = createContext<AuthContextValue>({
	user: null,
	token: null,
	loading: false,
	login: () => {},
	logout: () => {},
	user: null,
	token: null,
	loading: false,
	login: () => {},
	logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [token, setToken] = useState<string | null>(
		localStorageService.getAccessToken() ?? null
	);
	const [user, setUser] = useState<User>(null);
	const [loading, setLoading] = useState(false);
	const { getAuthenticatedUserData } = useAuthService();

	const login = (accessToken: string) => {
		localStorageService.setAccessToken(accessToken);
		setToken(accessToken);
	};
	const login = (accessToken: string) => {
		localStorageService.setAccessToken(accessToken);
		setToken(accessToken);
	};

	const logout = () => {
		localStorageService.removeAccessToken();
		setToken(null);
		resetUserState();
	};
	const logout = () => {
		localStorageService.removeAccessToken();
		setToken(null);
		resetUserState();
	};

	const resetUserState = () => {
		setUser(null);
		sessionStorageService.removeCachedUser();
	};
	const resetUserState = () => {
		setUser(null);
		sessionStorageService.removeCachedUser();
	};

	useEffect(() => {
		if (!token) {
			resetUserState();
			return;
		}
	useEffect(() => {
		if (!token) {
			resetUserState();
			return;
		}

		const cachedUser = sessionStorage.getItem('user');
		if (cachedUser) {
			setUser(JSON.parse(cachedUser));
			return;
		}
		const cachedUser = sessionStorage.getItem('user');
		if (cachedUser) {
			setUser(JSON.parse(cachedUser));
			return;
		}

		setLoading(true);
		setLoading(true);

		getAuthenticatedUserData(token)
			.then((res) => {
				if (res.data) {
					const user = { username: res.data.username };
					setUser(user);
					sessionStorageService.setCachedUser(user);
				} else {
					resetUserState();
				}
			})
			.catch(() => {
				toastService.error('Oops! Something went wrong!');
				resetUserState();
			})
			.finally(() => setLoading(false));
	}, [token]);

	return (
		<AuthContext.Provider value={{ user, token, loading, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
	return (
		<AuthContext.Provider value={{ user, token, loading, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => useContext(AuthContext);
