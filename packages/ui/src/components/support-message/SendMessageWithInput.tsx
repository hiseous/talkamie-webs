
import { useState } from "react";
import SendMessageInput from "./SendMessageInput";
import { supportMessageProps } from "../../utils/types/support";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";

type sentProps = {
    message?: supportMessageProps;
}
type SendMessageWithInputProps = ComponentPrimitiveProps & {
    placeholder?: string;
    onSent?: (sentProps: sentProps) => void;
}

const SendMessageWithInput = (props: SendMessageWithInputProps) => {
    // const sendApi = useSendSupportMessageApi();
    const [key] = useState<string | undefined>();

    // useEffect(() => {
    //     if(sendApi.response.loading === false && sendApi.response.success){
    //         setKey(getNewKey());
    //         if(props.onSent) props.onSent({
    //             message: sendApi.response.data?.message,
    //         });
    //     }
    // }, [sendApi.response.loading]);
    
    return (
        <SendMessageInput
            key={key}
            className={`${props.className || ''}`}
            placeholder={props.placeholder}
            // disabled={sendApi.response.loading}
            // send={(formProps) => {
            //     sendApi.trigger({
            //         body: {
            //             ...formProps,
            //         },
            //     });
            // }}
        />
    )
}

export default SendMessageWithInput;