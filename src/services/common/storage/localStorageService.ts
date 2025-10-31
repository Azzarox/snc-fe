import { $common } from "@/schemas/common/helpers";
import storage, { StorageKeys } from "./storage";
import type { Theme } from "@/context/ThemeContext";


const getAccessToken = () => {
    return storage.get(StorageKeys.ACCESS_TOKEN_KEY);
}

const setAccessToken = (value:string) => {
    storage.set(StorageKeys.ACCESS_TOKEN_KEY, value)
}

const removeAccessToken = () => {
    return storage.remove(StorageKeys.ACCESS_TOKEN_KEY);
}

//

const getTheme = () => {
    return storage.get(StorageKeys.THEME)
}

const setTheme = (value: Theme) => {
     storage.set(StorageKeys.THEME, value)
}

const removeTheme = () => {
     storage.remove(StorageKeys.THEME)
}

export const localStorageService = {
    getAccessToken,
    setAccessToken,
    removeAccessToken,
    getTheme,
    setTheme,
    removeTheme
}
