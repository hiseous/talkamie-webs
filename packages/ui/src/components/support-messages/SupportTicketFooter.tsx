import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { supportTicketProps } from "../../utils/types/support";
import IconWrapper from "../icon/IconWrapper";
import BlandTextarea from "../input-text/BlandTextarea";
import { useSupportTicketFooter } from "./useSupportTicketFooter";

type SupportTicketFooterProps = ComponentPrimitiveProps & {
    ticket: supportTicketProps | undefined;
    updateTicket?: (supportTicketProps?: supportTicketProps) => void;
};

const SupportTicketFooter = (props: SupportTicketFooterProps) => {
    const hook = useSupportTicketFooter(props);
    
    return (
        <div className={`${props.className || ''} flex items-center`}>
            <label className="bg-whiteVar1 rounded-full px-8 py-2 block flex-1">
                <BlandTextarea
                    key={hook.message.key}
                    placeholder={`Type your message...`}
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
                theme="red"
            />
        </div>
    );
}

export default SupportTicketFooter;