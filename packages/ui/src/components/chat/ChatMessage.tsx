import SvgAsset from "../../assets/svg/SvgAsset";
import { __classSelectors } from "../../utils/constants/querySelectors";
import { fromTimestamp } from "../../utils/funcs/time/timestamp";
import { chatMessageDeliveryStatus, chatMessageProps } from "../../utils/types/chat";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import ScheduledCardVar2 from "../schedules/ScheduledCardVar2";
import ChatMessageBubbleWrapper from "./ChatMessageBubbleWrapper";

type ChatMessageProps = ComponentPrimitiveProps & {
    // chat?: chatProps;
    message: chatMessageProps;
    sentByLocalUser?: boolean;
};

const ChatMessage = (props: ChatMessageProps) => {
    const timeProps = props.message.timestamp ? fromTimestamp(props.message.timestamp, true) : undefined;
    
    return (
        <div
            className={`${props.className || ''} ${__classSelectors.chatBodyMessage} flex
                ${props.sentByLocalUser ? 'first-user-message justify-end' : 'second-user-message'}
            `}
            data-id={props.message.id}
            data-status={props.message.delivery?.status}
        >
            <div className={`max-w-[400px] flex flex-col ${props.sentByLocalUser ? 'items-end' : ''}`}>
                {
                    props.message.text ?
                    <ChatMessageBubbleWrapper
                        sentByLocalUser={props.sentByLocalUser}
                        className="w-[fit-content]"
                    >
                        {props.message.text}
                    </ChatMessageBubbleWrapper> :
                    props.message.schedule ?
                    <>
                        <ScheduledCardVar2
                            item={props.message.schedule}
                        />
                    </>
                    : <></>
                }
                <div className={`mt-2 text-sm text-grayVar3 flex items-center ${props.sentByLocalUser ? 'flex-row-reverse' : ''}`}>
                    {
                        props.sentByLocalUser ?
                        <SvgAsset
                            name={
                                (['delivered', 'read'] as (chatMessageDeliveryStatus | undefined)[]).includes(props.message.delivery?.status) ?
                                'CheckDouble' : 'Check'
                            }
                            className={`${props.message.delivery?.status === 'read' ? 'fill-redVar1' : ''}
                                ${props.sentByLocalUser ? 'mr-0': 'ml-0'} mx-1
                            `}
                            size={20}
                        /> : <></>
                    }
                    <div>
                        <span className="capitalize">{timeProps?.human.chatFriendly}</span>
                        <span className="uppercase"> {timeProps?.time.in12Hr}</span>
                    </div>
                </div>
                {/* {
                    props.message.isRequest && props.chat?.request?.status !== 'accepted' && !props.sentByLocalUser ?
                    <div className="mt-2">
                        <div>
                            A message request was sent to you, should you choose to accept or decline.
                        </div>
                        <div className="mt-2 flex flex-col items-center">
                            <Button theme="pink" className="px-4 !py-2 rounded-md w-full">
                                Decline Request
                            </Button>
                            <Button theme="red" className="mt-2 px-4 !py-2 rounded-md w-full">
                                Accept Request
                            </Button>
                        </div>
                    </div> : <></>
                } */}
            </div>
        </div>
    );
}

export default ChatMessage;