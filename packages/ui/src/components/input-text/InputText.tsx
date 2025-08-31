'use client';

import { useEffect, useRef, useState } from "react";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import Icon from "../icon/Icon";

export type InputTextProps = ComponentPrimitiveProps & {
    theme?: 'white';
    defaultValue?: string;
    value?: string; //to control component;
    type?: 'text' | 'textarea' | 'password' | 'number';
    placeholder?: HTMLInputElement['placeholder'];
    maxLength?: number;
    autoFocusKey?: string;
    autoFocus?: boolean;
    disabled?: boolean;
    pattern?: string;
    min?: number;
    step?: number;
    onChange?: (value?: string) => void;
    onBlur?: () => void;
};

const InputText = (props: InputTextProps) => {
    const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
    const [showPassword, setShowPassword] = useState(false);

    // useEffect(() => {
    //     if(props.onChange) props.onChange(props.defaultValue);
    // }, []);
    useEffect(() => {
        if(props?.autoFocusKey || props.autoFocus){
            const input = inputRef?.current;
            input?.focus();
        }
    }, [props?.autoFocusKey]);
    
    return (
        <div
            className={`${props.className || ''}
                w-full flex-1 p-4 flex items-center rounded-3xl
                ${
                    props.theme === 'white' ?
                    `border-[1px] border-grayVar2` :
                    ``
                }
            `}
        >
            {
                props.type === 'textarea' ?
                <textarea
                    ref={inputRef}
                    className="bg-transparent flex-1 w-full h-full outline-none resize-none"
                    placeholder={props.placeholder}
                    maxLength={props.maxLength}
                    defaultValue={props.defaultValue}
                    value={props.value}
                    autoFocus={props.autoFocus}
                    disabled={props.disabled}
                    onChange={(e) => {
                        if(props.onChange) props.onChange(e.currentTarget.value);
                    }}
                    onBlur={props.onBlur}
                ></textarea> :
                <input
                    ref={inputRef}
                    className="bg-transparent flex-1 w-full h-full outline-none"
                    placeholder={props.placeholder}
                    type={
                        showPassword ? 'text' : props.type
                    }
                    maxLength={props.maxLength}
                    defaultValue={props.defaultValue}
                    value={props.value}
                    autoFocus={props.autoFocus}
                    disabled={props.disabled}
                    pattern={props.pattern}
                    min={props.min}
                    step={props.step}
                    onChange={(e) => {
                        if(props.onChange) props.onChange(e.currentTarget.value);
                    }}
                    onBlur={props.onBlur}
                />
            }
            {
                props.type === 'password' ?
                <Icon
                    iconName={showPassword ? "Eye" : "EyeSlash"}
                    className="cursor-pointer fill-[grey] md:w-[28px] md:h-[28px]"
                    size={17}
                    onClick={() => {
                        setShowPassword(!showPassword);
                    }}
                /> :
                <></>
            }
        </div>
    );
}

export default InputText;