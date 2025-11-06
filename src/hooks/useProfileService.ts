import { useAuth } from "@/context/AuthContext";
import { useFetch } from "./useFetch";
import { useCallback } from "react";
import type { UserProfile } from "@/types/domain/user";

export const useProfileService = () => {
    const { fetchJson } = useFetch();
    const { token } = useAuth();

    const getUserProfile = useCallback(() => fetchJson<UserProfile>('/@api/users/profile', {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }), [fetchJson, token]);

    return { getUserProfile }

}
