import { useCallback, useEffect, useState } from "react";
import { useProfileService } from "./useProfileService";
import type { UserProfile } from "@/types/domain/user";
import { useAuth } from "@/context/AuthContext";

export const useProfile = () => {
    const { getUserProfile } = useProfileService();
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
            const res = await getUserProfile();

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
    }, [token, getUserProfile]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    return { profile, loading };
}