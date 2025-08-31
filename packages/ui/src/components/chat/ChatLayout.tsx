'use client';

import { useChatLayout } from "../chat-layout-provider/useChatLayout";
import SkeletonLoaderUserProfile from "../loader-skeleton/SkeletonLoaderUserProfile";
import NoResultVar1 from "../node/NoResultVar1";

type ChatLayoutProps = {
    children: React.ReactNode;
};

const ChatLayout = (props: ChatLayoutProps) => {
    const layout = useChatLayout();
    
    return (
        <>
            {
                layout?.loading === false ?
                <>
                    {
                        layout.data?.id ?
                        <>
                            {props.children}
                        </> :
                        <NoResultVar1>
                            We could not find that chat
                        </NoResultVar1>
                    }
                </> :
                layout?.loading ?
                <SkeletonLoaderUserProfile /> :
                <></>
            }
        </>
    );
}

export default ChatLayout;