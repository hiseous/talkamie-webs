'use client';

import { useEffect } from "react";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import IconLabelButton from "./IconLabelButton";
import { userProps } from "../../utils/types/user";
import { useAcceptUserMessageRequestApi } from "../../utils/api/user/accept-message-request";
import { useDashboard } from "../dashboard-provider/useDashboard";

type AcceptMessageRequestButtonProps = ComponentPrimitiveProps & {
    user: userProps;
    updateUser?: (newUser: userProps) => void;
    onAccepted?: () => void;
};

const AcceptMessageRequestButton = (props: AcceptMessageRequestButtonProps) => {
    const localUser = useLocalUser();
    const dashboard = useDashboard();
    const acceptApi = useAcceptUserMessageRequestApi();

    const handles = {
        accept: () => {
            if(localUser?.id && props.user.id){
                acceptApi.trigger({
                    itemId: props.user.id,
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
                        id: props.user?.viewer?.chat?.id || acceptApi.data?.chat?.id,
                        ...acceptApi.data?.chat,
                    },
                },
            });
            if(props.onAccepted) props.onAccepted();
            dashboard?.pendingReqs.removeItem(undefined, props.user.id);
        }
    }, [acceptApi.loading]);
    
    return (
        <IconLabelButton
            theme="red"
            className={`${props.className || ''}`}
            svgAssetName="Check"
            label="Accept Message Request"
            loading={acceptApi.loading}
            onClick={handles.accept}
        />
    );
}

export default AcceptMessageRequestButton;