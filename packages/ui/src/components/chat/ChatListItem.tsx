'use client';

import { useAppRoutes } from "../../utils/funcs/app-routes/useAppRoutes";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { chatProps } from "../../utils/types/chat";
import VerifiedBadge from "../icon/VerifiedBadge";
import NodeMayBeLink from "../node/NodeMayBeLink";
import Thumb from "../thumb/Thumb";
import { fromTimestamp } from "../../utils/funcs/time/timestamp";

type ChatListItemProps = ComponentPrimitiveProps & {
    chat: chatProps | undefined;
    hideSublabel?: boolean;
}
const ChatListItem = (props: ChatListItemProps) => {
    const routes = useAppRoutes();
    const sublabel = (
        props.chat?.lastMessage?.type === 'schedule' ? props.chat.lastMessage.schedule?.title
        : props.chat?.lastMessage?.text
    );
    
    return (
        <NodeMayBeLink
            href={props.chat?.id ? routes.chat(props.chat.id) : undefined}
            className={`${props.className || ''} flex items-center`}
        >
            <div className="flex-1 flex items-center">
                <Thumb
                    picture={props.chat?.user?.picture}
                    size="sm"
                />
                <div className="pl-3">
                    <div className="flex items-center">
                        <div className="text-lg font-semibold">{props.chat?.user?.name}</div>
                        {
                            props.chat?.user?.verification?.verified ?
                            <VerifiedBadge className="ml-1 mt-1" type={props.chat?.user?.type} /> : <></>
                        }
                    </div>
                    {
                        sublabel ?
                        <div className="text-grayVar8 font-semibold line-clamp-1">{sublabel}</div> : <></>
                    }
                </div>
            </div>
            <div className="pr-1 flex flex-col items-end justify-between h-full">
                <div className="text-redVar1 capitalize font-medium">
                    {
                        props.chat?.lastMessage?.timestamp ? fromTimestamp(props.chat.lastMessage.timestamp, true).human.text
                        : undefined
                    }
                </div>
                {
                    props.chat?.totalUnreadMessages ?
                    <div className="text-xs w-0 h-0 box-content rounded-full font-semibold text-white bg-redVar1 p-3 flex items-center justify-center">
                        {props.chat?.totalUnreadMessages || 43}
                    </div> : <></>
                }
            </div>
        </NodeMayBeLink>
    );
}

export default ChatListItem;