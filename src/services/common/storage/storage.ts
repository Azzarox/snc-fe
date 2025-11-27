import { Theme } from '@/context/ThemeContext';
import { z } from 'zod';

export enum StorageKeys {
	ACCESS_TOKEN_KEY = 'accessToken',
	THEME = 'vite-ui-theme',
	USER = 'user',
}

const storageSchema = {
	[StorageKeys.ACCESS_TOKEN_KEY]: z.string(),
	[StorageKeys.THEME]: z.enum([Theme.DARK, Theme.LIGHT, Theme.SYSTEM]),
	[StorageKeys.USER]: z.null().or(z.object({ username: z.string().nonoptional() })),
} as const;

type StorageSchemas = typeof storageSchema;

type StorageTypes = {
	[K in keyof StorageSchemas]: z.infer<StorageSchemas[K]>;
};

type StorageBackend = 'local' | 'session';

class StorageAdapter {
	private storage: Storage;

	constructor(type: StorageBackend = 'local') {
		this.storage = type === 'local' ? localStorage : sessionStorage;
	}

	get<K extends keyof StorageTypes>(key: K): StorageTypes[K] | null {
		const item = this.storage.getItem(key);
		if (!item) return null;
		try {
			const parsed = JSON.parse(item);
			const schema = storageSchema[key];
			const result = schema.safeParse(parsed);
			return result.success ? (result.data as StorageTypes[K]) : null;
		} catch {
			return null;
		}
	}

	set<K extends keyof StorageTypes>(key: K, value: StorageTypes[K]): void {
		this.storage.setItem(key, JSON.stringify(value));
	}

	remove(key: keyof StorageTypes): void {
		this.storage.removeItem(key);
	}

	clear(): void {
		this.storage.clear();
	}
}

export default StorageAdapter;
