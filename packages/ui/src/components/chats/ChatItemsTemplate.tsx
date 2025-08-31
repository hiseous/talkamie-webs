'use client';

import ChatListItem from "../chat/ChatListItem";
import SkeletonLoaderUserItems from "../loader-skeleton/SkeletonLoaderUserItems";
import NoResult from "../node/NoResult";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { useEffect } from "react";
import { apiChatsSubpath } from "../../utils/types/api";
import { useDashChats } from "../dashboard-provider/useDashChats";
import { useDashboard } from "../dashboard-provider/useDashboard";
import { __minScrollDistanceFromBottom } from "../../utils/constants/digits/scroll";

type ChatItemsTemplateProps = ComponentPrimitiveProps & {
    focused?: boolean;
    hook: ReturnType<typeof useDashChats> | undefined;
    noResultLabel?: React.ReactNode;
    currentTab: apiChatsSubpath | undefined;
}
const ChatItemsTemplate = (props: ChatItemsTemplateProps) => {
    const dashboard = useDashboard();
    
    useEffect(() => {
        if(
            props.focused
            && (
                !props.hook?.wasTriggered
                || (
                    typeof dashboard?.body.scrollDistanceFrom?.bottom === 'number'
                    && dashboard.body.scrollDistanceFrom.bottom < __minScrollDistanceFromBottom
                    && props.hook?.pagination?.lastEvaluatedKey
                )
            )
        ){
            props.hook?.getItems();
        }
    }, [props.focused, props.hook?.key, dashboard?.body.scrollDistanceFrom?.bottom]);

    return (
        <div className={`${props.className || ''} ${props.focused ? '' : 'hidden'}`}>
            {
                props.hook?.initiallyLoading === false ?
                <>
                    {
                        props.hook?.items?.length ?
                        <>
                            <div className="mt-6 grid grid-cols-1 gap-8">
                                {
                                    props.hook?.items.map((chat, i) => {
                                        return (
                                            <ChatListItem
                                                key={`${i}_${chat.id}`}
                                                chat={chat}
                                            />
                                        )
                                    })
                                }
                            </div>
                        </> :
                        <NoResult
                            label={props.noResultLabel}
                        />
                    }
                    {
                        props.hook?.loading ?
                        <SkeletonLoaderUserItems count={2} className="mt-4" /> :
                        <></>
                    }
                </> :
                props.hook?.initiallyLoading ?
                <SkeletonLoaderUserItems count={8} /> :
                <></>
            }
        </div>
    );
}

export default ChatItemsTemplate;