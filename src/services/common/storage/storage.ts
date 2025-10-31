import { Theme } from "@/context/ThemeContext";
import { z } from "zod";


export enum StorageKeys {
    ACCESS_TOKEN_KEY = 'accessToken',
    THEME = 'vite-ui-theme'
}

const storageSchema = {
    [StorageKeys.ACCESS_TOKEN_KEY]: z.string(),
    [StorageKeys.THEME]: z.enum([Theme.DARK, Theme.LIGHT, Theme.SYSTEM]),
} as const;

type StorageSchemas = typeof storageSchema;

type StorageTypes = {
    [K in keyof StorageSchemas]: z.infer<StorageSchemas[K]>;
};

const storage = {
    get<K extends keyof StorageTypes>(
        key: K,
    ): StorageTypes[K] | null {
        const item = localStorage.getItem(key);
        if (!item) return null;
        try {
            const parsed = JSON.parse(item);
            const schema = storageSchema[key];
            const result = schema.safeParse(parsed);
            return result.success ? (result.data as StorageTypes[K]) : null;
        } catch {
            return null;
        }
    },

    set<K extends keyof StorageTypes>(
        key: K,
        value: StorageTypes[K]
    ): void {
        localStorage.setItem(key, JSON.stringify(value));
    },

    remove(key: keyof StorageTypes): void {
        localStorage.removeItem(key);
    },

    clear(): void {
        localStorage.clear();
    },
};

export default storage;