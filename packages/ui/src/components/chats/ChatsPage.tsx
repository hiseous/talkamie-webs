'use client';

import { useDashboard } from "../dashboard-provider/useDashboard";
import ControlledTabs from "../node/ControlledTabs";
import SearchBox from "../search/SearchBox";
import DocWrapperVar1 from "../wrapper/DocWrapperVar1";
import ChatItemsTemplate from "./ChatItemsTemplate";
import { useSearchParams } from "next/navigation";
import { apiChatsSubpath } from "../../utils/types/api";
import { __routes } from "../../utils/constants/app-routes";
import { usePopUp } from "../pop-up-provider/usePopUpContext";
import Button from "../button/Button";
import UserConnectionsModal from "../user-connections/UserConnectionsModal";
import { useEffect } from "react";

const ChatsPage = () => {
    const popUp = usePopUp();
    const dashboard = useDashboard();
    const searchParams = useSearchParams();
    const tabParam = searchParams.get('tab') as apiChatsSubpath | undefined;
    const tab: apiChatsSubpath | undefined= (['frequent', 'unread'] as (apiChatsSubpath | undefined)[]).includes(tabParam) ? tabParam : undefined;
    const noResultLabel = (
        <div className="flex-1 w-full">
            <span>
                You have no {tab ? tab : ''} chats yet.
            </span>
            {
                tab === undefined ?
                <Button
                    theme="pink-var-1"
                    // href={routes.chats(['new'])}
                    className="mt-4 w-full block text-center font-semibold"
                    onClick={() => {
                        popUp?.set({
                            nodes: [
                                <UserConnectionsModal title="Start New Chat" itemLink="chat" />,
                            ],
                        })
                    }}
                >
                    Start New Chat
                </Button> : <></>
            }
        </div>
    );
    
    useEffect(() => {
        dashboard?.body.addScrollEvent();
        return () => dashboard?.body.removeScrollEvent();
    }, []);
    useEffect(() => {
        if(dashboard?.chatsUtils.filter.changed){
            dashboard?.chats.reset();
            dashboard?.frequentChats.reset();
            dashboard?.unreadChats.reset();
        }
    }, [dashboard?.chatsUtils.filter.keyword]);
    
    return (
        <DocWrapperVar1 className="h-full">
            <SearchBox
                placeholder="Search"
                className="max-w-[500px] mb-8"
                onChange={(keyword) => {
                    dashboard?.chatsUtils?.onKeywordChange(keyword);
                }}
            />
            <div className="uppercase text-grayVar8 font-semibold">chats</div>
            <ControlledTabs
                tabs={[
                    {label: 'All', href: __routes.chats()},
                    {label: 'Most Frequent', value: 'frequent', href: __routes.chats(undefined, {tab: 'frequent'})},
                    {value: 'unread', href: __routes.chats(undefined, {tab: 'unread'})},
                ]}
                className="my-8"
                value={tab}
                // onChange={(tab?: apiChatsSubpath) => navigate.replace(__routes.chats(undefined, {tab}))}
            />
            <ChatItemsTemplate
                // key={dashboard?.chatsUtils.filter.keyword}
                focused={tab === undefined}
                currentTab={tab}
                hook={dashboard?.chats}
                noResultLabel={noResultLabel}
            />
            <ChatItemsTemplate
                // key={`frequent_${dashboard?.chatsUtils.filter.keyword}`}
                focused={tab === 'frequent'}
                currentTab={tab}
                hook={dashboard?.frequentChats}
                noResultLabel={noResultLabel}
            />
            <ChatItemsTemplate
                // key={`unread_${dashboard?.chatsUtils.filter.keyword}`}
                focused={tab === 'unread'}
                currentTab={tab}
                hook={dashboard?.unreadChats}
                noResultLabel={noResultLabel}
            />
        </DocWrapperVar1>
    );
}

export default ChatsPage;