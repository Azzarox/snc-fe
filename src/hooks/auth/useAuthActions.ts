import { useAuth } from "@/context/AuthContext";
import { localStorageService } from "@/services/common/storage/localStorageService";

// login action
export function useAuthActions() {
    const { setAuthToken } = useAuth();

    const login = (accessToken: string) => {
        localStorageService.setAccessToken(accessToken);
        setAuthToken(accessToken);
    }

    const logout = () => {
        localStorageService.removeAccessToken();
        setAuthToken(null);
    }
    return {
        login,
        logout
    }
}