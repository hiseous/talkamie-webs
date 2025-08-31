'use client';

import { useEffect } from "react";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import IconLabelButton from "./IconLabelButton";
import { userProps } from "../../utils/types/user";
import { useCancelUserMessageRequestApi } from "../../utils/api/user/cancel-message-request";
import { useDashboard } from "../dashboard-provider/useDashboard";

type CancelMessageRequestButtonProps = ComponentPrimitiveProps & {
    user: userProps;
    updateUser?: (newUser: userProps) => void;
};

const CancelMessageRequestButton = (props: CancelMessageRequestButtonProps) => {
    const localUser = useLocalUser();
    const dashboard = useDashboard();
    const api = useCancelUserMessageRequestApi();

    const handles = {
        cancel: () => {
            if(localUser?.id && props.user.id){
                api.trigger({
                    itemId: props.user.id,
                });
            }
        },
    };
    
    useEffect(() => {
        if(api.loading === false && api.success){
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
    }, [api.loading]);
    
    return (
        <IconLabelButton
            className={`${props.className || ''}`}
            svgAssetName="Times"
            label="Cancel Message Request"
            loading={api.loading}
            onClick={handles.cancel}
        />
    );
}

export default CancelMessageRequestButton;