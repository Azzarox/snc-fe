import { createContext, useContext, useEffect, useState } from 'react';
import { localStorageService } from '@/services/common/storage/localStorageService';
import { useAuthService } from '@/hooks/useAuthService';
import type { User } from '@/types/domain/user';

type AuthContextValue = {
	user: User | null;
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
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [token, setToken] = useState<string | null>(
		localStorageService.getAccessToken() ?? null
	);
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(false);
	const { getAuthenticatedUserData } = useAuthService();

	const login = (accessToken: string) => {
		localStorageService.setAccessToken(accessToken);
		setToken(accessToken);
	};

	const logout = () => {
		localStorageService.removeAccessToken();
		setToken(null);
		setUser(null);
	};

	useEffect(() => {
		if (!token) {
			setUser(null);
			return;
		}

		setLoading(true);

		getAuthenticatedUserData(token)
			.then((res) => {
				if (res.data) {
					setUser({
						id: res.data.id,
						username: res.data.username,
						email: res.data.email,
					});
				} else {
					setUser(null);
				}
			})
			.catch(() => {
				setUser(null);
			})
			.finally(() => setLoading(false));
	}, [token]);

	return (
		<AuthContext.Provider value={{ user, token, loading, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}
export const useAuth = () => useContext(AuthContext);
