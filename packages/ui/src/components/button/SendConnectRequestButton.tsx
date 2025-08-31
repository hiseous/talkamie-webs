'use client';

import { useEffect } from "react";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import IconLabelButton from "./IconLabelButton";
import { useSendConnectRequestToUserApi } from "../../utils/api/connection/send-connect-request-to-user";
import { useCancelConnectRequestToUserApi } from "../../utils/api/connection/cancel-connect-request-to-user";
import { userProps } from "../../utils/types/user";

type SendConnectRequestButtonProps = ComponentPrimitiveProps & {
    user: userProps | undefined;
    updateUser?: (userProps?: Partial<userProps>) => void;
};

const SendConnectRequestButton = (props: SendConnectRequestButtonProps) => {
    const localUser = useLocalUser();
    const connectApi = useSendConnectRequestToUserApi();
    const unconnectApi = useCancelConnectRequestToUserApi();

    const requestSent = props.user?.viewer?.connectRequest?.id ? true : false;

    const handles = {
        connect: () => {
            if(localUser?.id && props.user?.id){
                connectApi.trigger({
                    userId: props.user.id,
                });
            }
        },
        unconnect: () => {
            if(localUser?.id && props.user?.id){
                unconnectApi.trigger({
                    userId: props.user.id,
                });
            }
        },
    };

    useEffect(() => {
        if(connectApi.loading === false && connectApi.success){
            if(props.updateUser) props.updateUser({
                ...props.user,
                viewer: {
                    ...props.user?.viewer,
                    connectRequest: {
                        ...props.user?.viewer?.connectRequest,
                        ...connectApi.data,
                    },
                },
            });
        }
    }, [connectApi.loading]);
    useEffect(() => {
        if(unconnectApi.loading === false && unconnectApi.success){
            if(props.updateUser) props.updateUser({
                ...props.user,
                viewer: {
                    ...props.user?.viewer,
                    connectRequest: undefined,
                },
            });
        }
    }, [unconnectApi.loading]);
    
    return (
        <IconLabelButton
            className={`${props.className || ''}`}
            svgAssetName={requestSent ? 'Times' : 'Heart'}
            label={requestSent ? 'Cancel Connection' : 'Connect'}
            onClick={() => {
                if(requestSent) handles.unconnect();
                else handles.connect();
            }}
        />
    );
}

export default SendConnectRequestButton;