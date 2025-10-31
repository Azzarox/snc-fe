import type { User } from '@/context/AuthContext';
import StorageAdapter from './storage';

const USER_KEY = 'user';

const storage = new StorageAdapter('session');

const getCachedUser = () => {
	return storage.get<User>(USER_KEY);
};

const setCachedUser = (value: User) => {
	storage.set<User>(USER_KEY, value);
};

const removeCachedUser = () => {
	return storage.remove(USER_KEY);
};

export const sessionStorageService = {
	getCachedUser,
	setCachedUser,
	removeCachedUser,
};
