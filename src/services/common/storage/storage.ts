import type z from "zod";

const storage = {
    get<S extends z.ZodSchema>(key: string, schema: S): z.infer<S> | null {
        const item = localStorage.getItem(key);
        if (!item) return null;
        try {
            const parsed = JSON.parse(item);
            const result = schema.safeParse(parsed);
            return result.success ? result.data : null;
        } catch {
            return null;
        }
    },

    set<T>(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value));
    },

    remove(key: string): void {
        localStorage.removeItem(key);
    },

    clear(): void {
        localStorage.clear();
    },
};

export default storage;