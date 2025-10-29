import { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '@/services/auth/authService';
import { localStorageService } from '@/services/common/storage/localStorageService';

type User = { username: string } | null;

type AuthContextValue = {
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
    login: () => { },
    logout: () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(
        localStorageService.getAccessToken() ?? null
    );
    const [user, setUser] = useState<User>(null);
    const [loading, setLoading] = useState(false);

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

        authService
            .getAuthenticatedUserData(token)
            .then(res => setUser(res.data ? { username: res.data.username } : null))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
            
    }, [token]);

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
