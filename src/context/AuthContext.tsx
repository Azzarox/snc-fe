import { authService } from '@/services/auth/authService';
import { localStorageService } from '@/services/common/storage/localStorageService';
import { createContext, useContext, useEffect, useState } from 'react';

type AuthContextState = {
    user: { username: string };
};

const initialState: AuthContextState = { user: { username: '' } };
const AuthContext = createContext<AuthContextState>(initialState);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<{ username: string }>({ username: '' });
    const [token, setToken] = useState(localStorageService.getAccessToken() ?? '');

    useEffect(() => {
        if (!token) return;

        (async () => {
            try {
                const res = await authService.getAuthenticatedUserData(token);
                // if (!res.success && res.errors) {
                //     // TODO: Show some error 
                // }
                // if (!res.success) {
                //     // TODO: Show some error 
                // }
                if (res.data) {
                    const { username } = res.data;
                    setUser({ username })
                } else {
                    setUser({ username: '' })
                }
            } catch {
                setUser({ username: '' });
            }
        })();
    }, [token]);

    return (
        <AuthContext.Provider value={{user}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined)
        throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
