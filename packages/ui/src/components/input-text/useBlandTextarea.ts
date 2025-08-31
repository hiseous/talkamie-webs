import { KeyboardEvent, RefObject, useEffect } from "react";
import { BlandTextareaProps } from "./BlandTextarea";

type useBlandTextareaProps = BlandTextareaProps & {
    ref?: RefObject<HTMLTextAreaElement | null>;
}
export const useBlandTexarea = (props?: useBlandTextareaProps) => {

    const handles = {
        onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => {
            if(e.key === 'Enter'){
                if(e.shiftKey){
                    //inserts a new line;
                }
                else {
                    //may trigger the send button;
                    if(props?.onEnterToSend){
                        e.preventDefault();
                        props.onEnterToSend();
                    }
                }
            }
        },
    };

    useEffect(() => {
        if(props?.autoFocusKey){
            const input = props?.ref?.current;
            input?.focus();
        }
    }, [props?.autoFocusKey, props?.ref?.current]);

    return {
        ...handles,
    };
};