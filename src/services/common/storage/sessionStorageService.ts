import type { User } from '@/context/AuthContext';
import StorageAdapter, { StorageKeys } from './storage';


const storage = new StorageAdapter('session');

const getCachedUser = () => {
	return storage.get(StorageKeys.USER);
};

const setCachedUser = (value: User) => {
	storage.set(StorageKeys.USER, value)
};

const removeCachedUser = () => {
	return storage.remove(StorageKeys.USER);
};

export const sessionStorageService = {
	getCachedUser,
	setCachedUser,
	removeCachedUser,
};
	getCachedUser,
	setCachedUser,
	removeCachedUser,
};
