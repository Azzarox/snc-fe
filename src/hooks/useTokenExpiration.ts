import { useEffect } from 'react';
import { getTimeUntilExpiration } from '@/services/utils/jwtUtils';

export function useTokenExpiration(token: string | null, onExpire: () => void) {
	useEffect(() => {
		if (!token) {
			return;
		}

		const timeUntilExpiration = getTimeUntilExpiration(token);

		if (timeUntilExpiration === 0) {
			onExpire();
			return;
		}

		const timeout = setTimeout(() => {
			onExpire();
		}, timeUntilExpiration);

		return () => clearTimeout(timeout);
	}, [token, onExpire]);
}
