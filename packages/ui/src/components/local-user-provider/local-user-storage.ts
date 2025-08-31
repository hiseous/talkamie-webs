
import { itemId } from "../../utils/types/global.types";
import { __localStorage } from "../../utils/constants/localStorage";

export type localStorageUser = {
    id?: itemId;
    accessToken?: string;
}

export const setLocalUserStorage = (localStorageUser: localStorageUser) => {
    localStorage?.setItem(__localStorage.userKey, JSON.stringify(localStorageUser));
}
export const updateLocalUserStorage = (localStorageUser: Partial<localStorageUser>) => {
    const oldData = getLocalUserStorage();
    const newLocalUser: localStorageUser = {
        id: localStorageUser.id ?? oldData?.id,
        accessToken: localStorageUser.accessToken ?? oldData?.accessToken,
    }
    setLocalUserStorage(newLocalUser);
}
export const 
getLocalUserStorage = (): localStorageUser | undefined => {
    const stringifiedUser = localStorage?.getItem(__localStorage.userKey);
    const storedUser = stringifiedUser ? JSON.parse(stringifiedUser) : undefined as localStorageUser | undefined;
    return storedUser;
}

export const unsetLocalUserStorage = () => {
    localStorage?.clear();
}
