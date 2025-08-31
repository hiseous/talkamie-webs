import { Fragment, useEffect } from "react";
import { chatProps } from "../../utils/types/chat";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import ChatMessage from "./ChatMessage";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import { __classSelectors } from "../../utils/constants/querySelectors";
import { useChatBody } from "./useChatBody";
import HeadingText from "../heading/HeadingText";
import Button from "../button/Button";

type ChatBodyProps = ComponentPrimitiveProps & {
    chat: chatProps | undefined;
    updateChat?: (chatProps?: chatProps) => void;
};

const ChatBody = (props: ChatBodyProps) => {
    const localUser = useLocalUser();
    const hook = useChatBody(props);
    const canRenderRequestMsgOnce = (props.chat?.request?.text && hook.initiallyLoading === false && !hook.chat?.messages?.pagination?.lastEvaluatedKey) ? true : false;

    useEffect(() => {
        //to update the rendered request message;
        if(canRenderRequestMsgOnce){
            hook.checkMessageReceipts(hook.getBodyNode());
        }
    }, [canRenderRequestMsgOnce]);

    return (
        <div
            className={`${props.className || ''} ${__classSelectors.chatBody} flex-1 overflow-y-auto customScrollbar px-3 py-4`}
            onScroll={hook.onScroll}
        >
            {
                hook.loading ?
                <HeadingText size="2xs" className="text-center my-5 italic text-grayVar3">
                    loading messages...
                </HeadingText> : undefined
            }
            {
                canRenderRequestMsgOnce && props.chat?.request?.text ?
                <ChatMessage
                    message={{
                        id: props.chat.request.id,
                        text: props.chat.request.text,
                        timestamp: props.chat.request.timestamp,
                        sender: props.chat.request.sender,
                        delivery: props.chat.request.delivery,
                    }}
                    className="mb-8"
                    sentByLocalUser={localUser?.isMe(props.chat.request.sender?.id)}
                    // chat={props.chat}
                /> : undefined
            }
            {
                // hook.chat?.messages?.items?.length ?
                hook.chat?.messages?.items?.map((message, i) => {
                    return (
                        <Fragment
                            key={`${i}_${message.id}`}
                        >
                            <ChatMessage
                                message={message}
                                className={`${i > 0 ? 'mt-8' : ''}`}
                                sentByLocalUser={localUser?.isMe(message.sender?.id)}
                                // chat={props.chat}
                            />
                        </Fragment>
                    )
                })
                // : <></>
            }
            {
                <>
                    {
                        props.chat?.request?.status && props.chat.request.status !== 'accepted' ?
                        <div className="mt-8 max-w-[500px] mx-auto text-center">
                            {
                                props.chat?.request?.status === 'pending' ?
                                <>
                                    {
                                        localUser?.isMe(props.chat?.request?.sender?.id) ?
                                        <div className="">
                                            <div>
                                                Your message request has been sent!
                                            </div>
                                            {/* <div className="mt-2 flex flex-col items-center">
                                                <Button theme="pink" className="px-4 !py-2 rounded-md w-full">
                                                    Cancel Request
                                                </Button>
                                            </div> */}
                                        </div> : 
                                        <div className="">
                                            <div>
                                                A message request was sent to you, should you choose to accept or decline.
                                            </div>
                                            <div className="mt-2 flex flex-col items-center">
                                                <Button
                                                    theme="pink"
                                                    onClick={hook.rejectMessageRequest}
                                                    className="px-4 !py-2 rounded-md w-full"
                                                >
                                                    Decline Request
                                                </Button>
                                                <Button
                                                    theme="red"
                                                    onClick={hook.acceptMessageRequest}
                                                    className="mt-1 px-4 !py-2 rounded-md w-full"
                                                >
                                                    Accept Request
                                                </Button>
                                            </div>
                                        </div>
                                    }
                                </> :
                                props.chat.request?.status === 'rejected' ?
                                <>
                                    <div>
                                        {
                                            localUser?.isMe(props.chat.request.sender?.id) ?
                                            `Your message request was rejected` :
                                            `You rejected their message request`
                                        }
                                    </div>
                                </> : <></>
                            }
                        </div> : <></>
                    }
                </>
            }
        </div>
    );
}

export default ChatBody;