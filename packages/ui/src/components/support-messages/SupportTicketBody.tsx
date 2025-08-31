import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { __classSelectors } from "../../utils/constants/querySelectors";
import { supportTicketProps } from "../../utils/types/support";
import SupportTicketStatusTag from "./SupportTicketStatusTag";
import { Fragment } from "react";
import HeadingText from "../heading/HeadingText";
import { useSupportTicketBody } from "./useSupportTicketBody";
import ChatMessage from "../chat/ChatMessage";
import { useLocalUser } from "../local-user-provider/useLocalUser";

type SupportTicketBodyProps = ComponentPrimitiveProps & {
    ticket: supportTicketProps | undefined;
    updateTicket?: (supportTicketProps?: supportTicketProps) => void;
};

const SupportTicketBody = (props: SupportTicketBodyProps) => {
    const hook = useSupportTicketBody(props);
    const localUser = useLocalUser();

    return (
        <div
            className={`${props.className || ''} ${__classSelectors.chatBody} flex-1 overflow-y-auto customScrollbar px-3 py-4`}
            // onScroll={hook.onScroll}
        >
            {
                props.ticket?.status !== 'closed' ?
                <SupportTicketStatusTag
                    status="open"
                    className="sticky top-0"
                /> : undefined
            }
            {
                hook.loading ?
                <HeadingText size="2xs" className="text-center my-5 italic text-grayVar3">
                    loading messages...
                </HeadingText> : undefined
            }
            {
                // hook.chat?.messages?.items?.length ?
                hook.ticket?.messages?.items?.map((message, i) => {
                    return (
                        <Fragment
                            key={`${i}_${message.id}`}
                        >
                            <ChatMessage
                                message={message}
                                className={`${i > 0 ? 'mt-8' : ''}`}
                                sentByLocalUser={localUser?.isMe(message.sender?.id)}
                            />
                        </Fragment>
                    )
                })
                // : <></>
            }
            {
                props.ticket?.status === 'closed' ?
                <div>
                    <SupportTicketStatusTag
                        status={props.ticket.status}
                    />
                    <div className="mt-1 text-xs text-center">
                        This case is now resolved
                    </div>
                </div> : undefined
            }
        </div>
    );
}

export default SupportTicketBody;