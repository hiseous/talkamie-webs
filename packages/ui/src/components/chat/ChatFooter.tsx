import { chatProps } from "../../utils/types/chat";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import IconWrapper from "../icon/IconWrapper";
import BlandTextarea from "../input-text/BlandTextarea";
import { useChatFooter } from "./useChatFooter";

type ChatFooterProps = ComponentPrimitiveProps & {
    chat: chatProps;
    updateChat?: (chatProps?: chatProps) => void;
};

const ChatFooter = (props: ChatFooterProps) => {
    const hook = useChatFooter(props);
    
    return (
        <div className={`${props.className || ''} flex items-center`}>
            <label className="bg-whiteVar1 rounded-full px-8 py-2 block flex-1">
                <BlandTextarea
                    key={hook.message.key}
                    placeholder={
                        props.chat.id && props.chat.request?.status === 'accepted' ? `Type your message...` :
                        `Write a one-time message request...`
                    }
                    // autoFocus
                    onChange={hook.onTextChange}
                    onEnterToSend={hook.sendMessage}
                />
            </label>
            <IconWrapper
                svgAssetName="SendRightFill"
                className={`mx-2 rounded-full p-3 bg-redVar1 fill-white`}
                iconSize={32}
                onClick={hook.sendMessage}
                // theme="red"
            />
        </div>
    );
}

export default ChatFooter;