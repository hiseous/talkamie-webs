'use client';

import { __routes } from "../../utils/constants/app-routes";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import IconWrapper from "../icon/IconWrapper";
import RedDot from "../icon/RedDot";
import { useLocalUser } from "../local-user-provider/useLocalUser";

type AlertButtonProps = ComponentPrimitiveProps & {
    onClick?: () => void;
};

const AlertButton = (props: AlertButtonProps) => {
    // const dashboard = useDashboard();
    const localUser = useLocalUser();
    
    return (
        <IconWrapper
            onClick={props.onClick}
            theme="red"
            className={`${props.className || ''} p-3 rounded-full cursor-pointer relative`}
            svgAssetName="BellFill"
            iconSize={32}
            href={__routes.notifications()}
            nodeBeforeEnd={
                localUser?.totalUnreadAlerts ?
                <RedDot className={`absolute top-0 right-0 p-[7px] border-white border-[4px]`} /> :
                undefined
            }
        />
    );
}

export default AlertButton;