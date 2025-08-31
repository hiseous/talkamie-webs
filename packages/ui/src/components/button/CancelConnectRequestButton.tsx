'use client';

import { useEffect } from "react";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import IconLabelButton from "./IconLabelButton";
import { useCancelConnectRequestToUserApi } from "../../utils/api/connection/cancel-connect-request-to-user";
import { userProps } from "../../utils/types/user";

type CancelConnectRequestButtonProps = ComponentPrimitiveProps & {
    user: userProps;
    onCanceled?: () => void;
};

const CancelConnectRequestButton = (props: CancelConnectRequestButtonProps) => {
    const localUser = useLocalUser();
    const api = useCancelConnectRequestToUserApi();

    const handles = {
        cancel: () => {
            if(localUser?.id && props.user.id){
                api.trigger({
                    userId: props.user.id,
                });
            }
        },
    };
    
    useEffect(() => {
        if(api.loading === false && api.success){
            if(props.onCanceled) props.onCanceled();
        }
    }, [api.loading]);
    
    return (
        <IconLabelButton
            className={`${props.className || ''}`}
            svgAssetName="ChatDotsPlus"
            label="Cancel Request"
            loading={api.loading}
            onClick={handles.cancel}
        />
    );
}

export default CancelConnectRequestButton;