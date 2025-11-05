import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { localStorageService } from '@/services/common/storage/localStorageService';
import { useAuthService } from '@/hooks/useAuthService';
import { isTokenExpired } from '@/services/utils/jwtUtils';
import { useTokenExpiration } from '@/hooks/useTokenExpiration';
import type { User } from '@/types/domain/user';
import { toastService } from '@/services/common/toastService';
import { useNavigate } from 'react-router';

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
	const [token, setToken] = useState<string | null>(() => {
		const storedToken = localStorageService.getAccessToken();
		if (storedToken && isTokenExpired(storedToken)) {
			localStorageService.removeAccessToken();
			return null;
		}
		return storedToken ?? null;
	});
	
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(false);
	const { getAuthenticatedUserData } = useAuthService({ getAuthenticatedUserData: { toast: true }});

	const navigate = useNavigate();

	const login = useCallback((accessToken: string) => {
		localStorageService.setAccessToken(accessToken);
		setToken(accessToken);
	}, []);

	const logout = useCallback(() => {
		localStorageService.removeAccessToken();
		setToken(null);
		setUser(null);
	}, []);

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
					setUser(null)
				}
			})
			.catch(() => {
				setUser(null);
			})
			.finally(() => setLoading(false));
	}, [token]);

	const handleTokenExpired = useCallback(() => {
		logout();
		navigate('/login');
		toastService.error('Session Expired', "Please log in again!", { duration: 10000 });
	}, [logout, navigate]);

	useTokenExpiration(token, handleTokenExpired);

	return (
		<AuthContext.Provider value={{ user, token, loading, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}
export const useAuth = () => useContext(AuthContext);
