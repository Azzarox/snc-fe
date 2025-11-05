import { useAuth } from "@/context/AuthContext";
import { useFetch } from "./useFetch";
import { useEffect, useState, useCallback } from "react";
import type { UserProfile } from "@/types/domain/user";

export const useProfileService = () => {
    const { fetchJson } = useFetch();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(false);

    const { token } = useAuth();

    const fetchProfile = useCallback(async () => {
        if (!token) {
            setProfile(null);
            return;
        }

        setLoading(true);

        try {
            const res = await fetchJson<UserProfile>('/@api/users/profile', {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (res.data) {
                setProfile(res.data);
            } else {
                setProfile(null);
            }
        } catch {
            setProfile(null);
        } finally {
            setLoading(false);
        }
    }, [token, fetchJson]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    return { profile, loading };
}