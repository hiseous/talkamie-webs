'use client';

import { useParams } from "next/navigation";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import { useGetUserApi } from "../../utils/api/user/useGetUserApi";
import { useEffect, useState } from "react";
import { userProps } from "../../utils/types/user";
import { useDashUserReviews } from "../dashboard-provider/useDashUserReviews";
import { useAppSocket } from "../app-socket-provider/useAppSocket";
import { alertProps } from "../../utils/types/alert";
import { connectRequestStatus } from "../../utils/types/connect";

export type UserProfileContextType = ReturnType<typeof useUserProfileContext> | undefined;
export const useUserProfileContext = () => {
    const params = useParams();
    const paramId = params.id as string | undefined;
    
    const appSocket = useAppSocket();
    const localUser = useLocalUser();
    const isLocalUser = (localUser?.id && localUser.id === paramId) ? true : false;
    const getApi = useGetUserApi();
    const reviews = useDashUserReviews({forUserId: paramId});
    const [userData, setUserData] = useState<userProps | undefined>(undefined);

    const consts = {
        data: isLocalUser ? localUser : userData,
        loading: isLocalUser ? localUser?.loading : getApi.loading,
    };
    const handles = {
        updateUser: (newUserProps?: userProps) => {
            console.log({newUserProps})
            if(isLocalUser){
                localUser?.updateUser(newUserProps);
            }
            else {
                setUserData(prev => ({
                    ...prev,
                    ...newUserProps,
                }));
            }
        },
        onAlert: (alertProps: alertProps) => {
            setUserData(prev => {
                let viewer = {...prev?.viewer};

                if(alertProps.chat?.id){
                    viewer = {
                        ...viewer,
                        chat: {
                            ...viewer?.chat,
                            ...alertProps.chat,
                        },
                    }
                }
                if(alertProps.connectRequest?.id){
                    viewer = {
                        ...viewer,
                        ...(
                            (['canceled', 'rejected'] as (connectRequestStatus | undefined)[]).includes(alertProps.connectRequest.status) ? {
                                connectRequest: undefined,
                            } : {
                                connectRequest: {
                                    ...viewer?.connectRequest,
                                    ...alertProps.connectRequest,
                                },
                            }
                        ),
                    }
                }

                return {
                    ...prev,
                    viewer,
                };
            });
        },
    };

    useEffect(() => {
        if(!isLocalUser && paramId){
            getApi.trigger({
                userId: paramId,
            });
            appSocket?.setRefsTempRouteUser({
                onAlert: handles.onAlert,
            });
            return () => appSocket?.setRefsTempRouteUser(undefined);
        }
    }, [paramId]);
    useEffect(() => {
        if(getApi.loading === false && getApi.success){
            setUserData(getApi.data);
        }
    }, [getApi.loading]);

    return {
        ...consts,
        ...handles,
        reviews,
    };
}