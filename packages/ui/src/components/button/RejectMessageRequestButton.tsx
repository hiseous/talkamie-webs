'use client';

import { useEffect } from "react";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import IconLabelButton from "./IconLabelButton";
import { userProps } from "../../utils/types/user";
import { useRejectUserMessageRequestApi } from "../../utils/api/user/reject-message-request";
import { useDashboard } from "../dashboard-provider/useDashboard";

type RejectMessageRequestButtonProps = ComponentPrimitiveProps & {
    user: userProps;
    updateUser?: (newUser: userProps) => void;
};

const RejectMessageRequestButton = (props: RejectMessageRequestButtonProps) => {
    const localUser = useLocalUser();
    const dashboard = useDashboard();
    const rejectApi = useRejectUserMessageRequestApi();

    const handles = {
        reject: () => {
            if(localUser?.id && props.user.id){
                rejectApi.trigger({
                    itemId: props.user.id,
                });
            }
        },
    };

    useEffect(() => {
        if(rejectApi.loading === false && rejectApi.success){
            if(props.updateUser) props.updateUser({
                ...props.user,
                viewer: {
                    ...props.user?.viewer,
                    chat: {
                        ...props.user?.viewer?.chat,
                        request: undefined,
                    },
                },
            });
            dashboard?.pendingReqs.removeItem(undefined, props.user.id);
        }
    }, [rejectApi.loading]);
    
    return (
        <IconLabelButton
            className={`${props.className || ''}`}
            svgAssetName="Times"
            label="Decline Message Request"
            loading={rejectApi.loading}
            onClick={handles.reject}
        />
    );
}

export default RejectMessageRequestButton;