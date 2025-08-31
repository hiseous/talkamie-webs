'use client';

import { useEffect } from "react";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import IconLabelButton from "./IconLabelButton";
import { useAcceptConnectRequestFromUserApi } from "../../utils/api/connection/accept-connect-request-from-user";
import { userProps } from "../../utils/types/user";

type AcceptConnectRequestButtonProps = ComponentPrimitiveProps & {
    user: userProps;
    updateUser?: (newUser: userProps) => void;
    onAccepted?: () => void;
};

const AcceptConnectRequestButton = (props: AcceptConnectRequestButtonProps) => {
    const localUser = useLocalUser();
    const acceptApi = useAcceptConnectRequestFromUserApi();

    const handles = {
        accept: () => {
            if(localUser?.id && props.user.id){
                acceptApi.trigger({
                    userId: props.user.id,
                });
            }
        },
    };

    useEffect(() => {
        if(acceptApi.loading === false && acceptApi.success){
            if(props.updateUser) props.updateUser({
                ...props.user,
                viewer: {
                    ...props.user?.viewer,
                    connectRequest: {
                        ...props.user.viewer?.connectRequest,
                        status: acceptApi.data?.chat?.request?.status || 'accepted',
                    },
                    chat: {
                        ...props.user.viewer?.chat,
                        ...acceptApi.data?.chat,
                    },
                },
            });
            if(props.onAccepted) props.onAccepted();
        }
    }, [acceptApi.loading]);
    
    return (
        <IconLabelButton
            theme="red"
            className={`${props.className || ''}`}
            svgAssetName="Check"
            label="Accept Request"
            loading={acceptApi.loading}
            onClick={handles.accept}
        />
    );
}

export default AcceptConnectRequestButton;