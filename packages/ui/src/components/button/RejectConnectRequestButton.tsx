'use client';

import { useEffect } from "react";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import IconLabelButton from "./IconLabelButton";
import { useRejectConnectRequestFromUserApi } from "../../utils/api/connection/reject-connect-request-from-user";
import { userProps } from "../../utils/types/user";

type RejectConnectRequestButtonProps = ComponentPrimitiveProps & {
    user: userProps;
    updateUser?: (newUser: userProps) => void;
};

const RejectConnectRequestButton = (props: RejectConnectRequestButtonProps) => {
    const localUser = useLocalUser();
    const rejectApi = useRejectConnectRequestFromUserApi();

    const handles = {
        reject: () => {
            if(localUser?.id && props.user.id){
                rejectApi.trigger({
                    userId: props.user.id,
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
                    connectRequest: undefined,
                },
            });
        }
    }, [rejectApi.loading]);
    
    return (
        <IconLabelButton
            className={`${props.className || ''}`}
            svgAssetName="Times"
            label="Decline"
            loading={rejectApi.loading}
            onClick={handles.reject}
        />
    );
}

export default RejectConnectRequestButton;