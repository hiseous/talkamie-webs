import { ComponentPrimitiveProps } from "../../utils/types/global.types";

type ChatMessageBubbleWrapperProps = ComponentPrimitiveProps & {
    sentByLocalUser?: boolean;
    children?: React.ReactNode;
};

const ChatMessageBubbleWrapper = (props: ChatMessageBubbleWrapperProps) => {
    
    return (
        <div
            className={`${props.className || ''} rounded-2xl overflow-hidden px-5 py-4
                ${
                    props.sentByLocalUser ?
                    `bg-redVar1 rounded-tr-none text-white fill-white` :
                    `bg-whiteVar2 rounded-tl-none`
                }
            `}
        >
            {props.children}
        </div>
    );
}

export default ChatMessageBubbleWrapper;