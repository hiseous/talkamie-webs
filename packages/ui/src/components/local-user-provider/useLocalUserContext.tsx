'use client';

import { useEffect, useState } from "react";
import { useAuthMeApi } from "../../utils/api/auth/useAuthMe";
import { getNewKey } from "../../utils/funcs/string/string";
import { localStorageUser, setLocalUserStorage, unsetLocalUserStorage, updateLocalUserStorage } from "./local-user-storage";
import { itemId } from "../../utils/types/global.types";
import { userProps } from "../../utils/types/user";

type states = {
    user?: userProps;
    // accessToken?: string;
    loading?: boolean;
    success?: boolean;
    key?: string;
}

export const useLocalUserContext = () => {
    const authApi = useAuthMeApi();
    const [refreshKey, setRefreshKey] = useState('');
    const [states, setStates] = useState<states>({});

    const handles = {
        refresh: () => {
            setRefreshKey(getNewKey());
        },
        setUser: (newUser?: userProps) => {
            setStates({
                ...states,
                user: newUser,
            });
        },
        setLocalStorageUser: (localStorageUser: localStorageUser = {}) => {
            setLocalUserStorage(localStorageUser);
        },
        updateLocalStorageUser: (localStorageUser?: localStorageUser) => {
            if(localStorageUser) updateLocalUserStorage(localStorageUser);
        },
        unsetUser: () => {
            setStates({
                ...states,
                user: undefined,
            });
            unsetLocalUserStorage();
        },
        updateUser: (newUserProps?: Partial<userProps>) => {
            setStates({
                ...states,
                user: {
                    ...states.user,
                    ...newUserProps,
                    key: getNewKey(),
                },
            });
        },
        isMe: (someUserId?: itemId) => {
            return (someUserId && someUserId === states.user?.id) ? true : false;;
        },
    };

    useEffect(() => {
        authApi.trigger();
    }, [refreshKey]);
    useEffect(() => {
        const newStates = {...states};
        newStates.loading = authApi.loading;
        newStates.success = authApi.success;

        if(authApi.loading === false && authApi.success){
            const user = authApi.data?.user;
            // handles.set(user);
            
            newStates.user = user;
            // ping.trigger();
            // if(authApi.data?.accessToken) setLocalUserStorage({
            //     id: authApi.data?.id,
            //     accessToken: authApi.data?.accessToken,
            // });
        }

        setStates({...newStates});
    }, [authApi.loading]);
    
    return {
        ...handles,
        ...states.user,
        loading: states.loading,
        success: states.success,
        // accessToken: getLocalUserStorage()?.accessToken,
    };
}