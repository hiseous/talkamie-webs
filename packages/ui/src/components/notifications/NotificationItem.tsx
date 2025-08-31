'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { alertProps } from "../../utils/types/alert";
import { useNotificationItem } from "./useNotificationItem";
import IconWrapper from "../icon/IconWrapper";
import NodeMayBeLink from "../node/NodeMayBeLink";
import { useAppSocket } from "../app-socket-provider/useAppSocket";

type NotificationItemProps = ComponentPrimitiveProps & {
    item: alertProps | undefined;
}
const NotificationItem = (props: NotificationItemProps) => {
    const hook = useNotificationItem(props);
    const appSocket = useAppSocket();
    
    return (
        <NodeMayBeLink
            href={hook.href}
            onClick={() => {
                if(props.item?.id && props.item?.status !== 'read'){
                    appSocket?.updateAlerts({
                        alertsMap: {
                            [props.item.id]: {
                                status: 'read',
                            },
                        },
                    });
                }
            }}
            className={`${props.className || ''} ${props.item?.status === 'read' ? '' : 'font-medium'} flex items-center border-[1px] border-whiteVar2 p-3 rounded-md`}
        >
            <IconWrapper
                svgAssetName="BellFill"
                iconSize={22}
                className="fill-redVar1 rounded-full p-2 bg-redVar2"
            />
            <div className="flex-1 pl-4">
                <div className="font-semibold">
                    {hook.title}
                </div>
                <div>
                    {hook.body}
                </div>
            </div>
        </NodeMayBeLink>
    );
}

export default NotificationItem;