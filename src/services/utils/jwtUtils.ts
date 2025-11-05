import type { User } from "@/types/domain/user";

type JWTPayload = User & {
	exp?: number;
	iat?: number;
}

function decodeJWT(token: string): JWTPayload | null {
	try {
		const parts = token.split('.');
		if (parts.length !== 3) {
			return null;
		}

		const payload = parts[1];
		const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
		return JSON.parse(decoded) as JWTPayload;
	} catch (error) {
		return null;
	}
}

export function isTokenExpired(token: string | null): boolean {
	if (!token) {
		return true;
	}

	const payload = decodeJWT(token);
	if (!payload || !payload.exp) {
		return true;
	}

	const currentTime = Math.floor(Date.now() / 1000);
	return payload.exp < currentTime;
}

/**
 * Get milliseconds until token expires
 * @param token - The JWT token string
 * @returns Milliseconds until expiration, or 0 if already expired/invalid
 */
export function getTimeUntilExpiration(token: string | null): number {
	if (!token) {
		return 0;
	}

	const payload = decodeJWT(token);
	if (!payload || !payload.exp) {
		return 0;
	}

	const currentTime = Math.floor(Date.now() / 1000);
	const timeUntilExpiry = payload.exp - currentTime;

	return timeUntilExpiry > 0 ? timeUntilExpiry * 1000 : 0;
}