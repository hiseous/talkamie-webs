import { useEffect } from "react";
import { chatProps } from "../../utils/types/chat";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";
import { useDashboard } from "../dashboard-provider/useDashboard";

export type ChatPageProps = {
    data: chatProps;
    updateChat?: (chatProps?: chatProps) => void;
};

const ChatPage = (props: ChatPageProps) => {
    const dashboard = useDashboard();
    // const [chat, setChat] = useState(props.data);
    // const chat = (
    //     props.data.id ? dashboard?.chats.records?.[props.data.id] :
    //     props.data
    // );
    const chat = {
        ...props.data,
        ...props.data.id ? dashboard?.chats.records?.[props.data.id] : undefined,
    };
    const handles = {
        updateChat: (chatProps?: chatProps) => {
            if(props.updateChat) props.updateChat(chatProps);
            if(props.data.id){
                dashboard?.chats.updateChatPropsOnly(props.data.id, chatProps);
            }
            // setChat(prev => ({
            //   ...prev,
            //   ...chatProps,
            // }));
        },
    };

    useEffect(() => {
        if(!dashboard?.navs.hideMobileNavsOnPage){
            dashboard?.navs.updateStates({hideMobileNavsOnPage: true});
        }
    }, []);
    useEffect(() => {
        if(props.data.id && !dashboard?.chats.records?.[props.data.id]?.id){
            dashboard?.chats.setChatPropsOnly(props.data);
        }
    }, [props.data.id]);
    
    return (
        <>
            {
                chat ?
                <div className="flex flex-col h-full">
                    <ChatHeader
                        chat={chat}
                        className="sticky top-3"
                    />
                    <ChatBody
                        chat={chat}
                        updateChat={handles.updateChat}
                    />
                    {
                        (chat.id && chat.request?.status === 'accepted')
                        || !chat.id || !chat.request?.status ?
                        // || (['rejected'] as (connectRequestStatus | undefined)[]).includes(chat.request?.status) ?
                        <ChatFooter
                            chat={chat}
                            updateChat={handles.updateChat}
                        /> : <></>
                    }
                </div> : undefined
            }
        </>
    );
}

export default ChatPage;