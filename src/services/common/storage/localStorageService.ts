import storage from "./storage";

const ACCESS_TOKEN_KEY = 'accessToken';

const getAccessToken = () => {
    return storage.get<string>(ACCESS_TOKEN_KEY);
}

const setAccessToken = (value: string) => {
    storage.set(ACCESS_TOKEN_KEY, value)
}

const removeAccessToken = () => {
    return storage.remove(ACCESS_TOKEN_KEY);
}

export const localStorageService = {
    getAccessToken,
    setAccessToken,
    removeAccessToken,
}
