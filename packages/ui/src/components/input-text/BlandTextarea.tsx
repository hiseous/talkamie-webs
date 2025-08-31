'use client';

import { useRef } from "react";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { useBlandTexarea } from "./useBlandTextarea";

export type BlandTextareaProps = ComponentPrimitiveProps & {
    defaultValue?: string;
    placeholder?: HTMLInputElement['placeholder'];
    maxLength?: number;
    autoFocusKey?: string;
    autoFocus?: boolean;
    disabled?: boolean;
    onChange?: (value?: string) => void;
    onEnterToSend?: () => void;
};

const BlandTextarea = (props: BlandTextareaProps) => {
    const ref = useRef<HTMLTextAreaElement | null>(null);
    const hook = useBlandTexarea({
        ...props,
        ref,
    });
    
    return (
        <textarea
            ref={ref}
            className={`${props.className || ''} bg-transparent flex-1 w-full h-full outline-none resize-none`}
            placeholder={props.placeholder}
            maxLength={props.maxLength}
            defaultValue={props.defaultValue}
            autoFocus={props.autoFocus}
            disabled={props.disabled}
            onKeyDown={hook.onKeyDown}
            onChange={(e) => {
                if(props.onChange) props.onChange(e.currentTarget.value);
            }}
        ></textarea>
    );
}

export default BlandTextarea;