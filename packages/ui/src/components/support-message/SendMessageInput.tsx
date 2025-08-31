
import { useRef, useState } from "react";
import { ComponentPrimitiveProps, valueOf } from "../../utils/types/global.types";
import { __classNames } from "../../utils/constants/classNames";
import { compressedFileProps } from "../../utils/types/file";
import { stringIsEmpty } from "../../utils/funcs/string/string";

type formProps = {
    text?: string;
    files?: compressedFileProps[];
};
type states = {
    form?: formProps;
    validated?: boolean;
}
type SendMessageInputProps = ComponentPrimitiveProps & {
    disabled?: boolean;
    placeholder?: React.ReactNode;
    send?: (formProps: formProps) => void;
}

const SendMessageInput = (props: SendMessageInputProps) => {
    const ref = useRef<HTMLTextAreaElement | null>(null);
    const [states, setStates] = useState<states>({});
    const handles = {
        validateForm: (currStates: states) => {
            let valid = stringIsEmpty(currStates.form?.text) ? false : true;

            return valid;
        },
        onFormChange: (name: keyof formProps, value: valueOf<formProps>) => {
            setStates(prev => {
                if(!props.disabled){
                    prev.form = {
                        ...prev.form,
                        [name]: value,
                    };
                    prev.validated = handles.validateForm(prev);
                }

                return {...prev};
            });
        },
        onTextareaChange: (e: React. ChangeEvent<HTMLTextAreaElement>) => {
            const el = e.currentTarget;
            const value = el.value;

            // if(ref.current && el){
            //     const scrollHeight = el.scrollHeight;
            //     const maxHeight = 400;
            //     const height = Math.min(scrollHeight, maxHeight);
            //     console.log(scrollHeight, height);

            //     ref.current.style.height = 'inherit';
            //     if(height){
            //         ref.current.style.height = `${height}px`;
            //     }
            //     else {
            //         ref.current.style.height = `56px`;
            //     }
            // }
            
            handles.onFormChange('text', value);
        },
        send: () => {
            if(props.send && states.form) props.send(states.form);
            // setStates(prev => {
            //     if(prev.form && prev.validated && props.send){
            //         props.send(prev.form);
            //     }

            //     return {...prev};
            // });
        },
        onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if(e.key === 'Enter'){
                if(e.shiftKey){
                    //inserts a new line;
                }
                else {
                    //may trigger the send button;
                    e.preventDefault();
                    handles.send();
                }
            }
        },
    };
    
    return (
        <div
            className={`${props.className || ''} flex items-center !rounded-md p-4
                bg-white dark:bg-gray800 dark:border-gray800 dark:focus-within:border-transparent
                dark:focus-within:shadow-gray500 dark:stroke-gray400 dark:text-gray200
                ${props.disabled ? 'opacity-[.7] cursor-not-allowed [&_*]:!cursor-not-allowed' : ''}
            `}
        >
            <label
                className={`relative flex-1 w-full h-full pr-4 ${props.disabled ? 'pointer-events-none' : ''}`}
            >
                {
                    props.placeholder ?
                    <div
                        className={`${__classNames.transition} ${states.form?.text ? 'opacity-0' : 'cursor-text'} absolute left-0 top-0 w-full h-full flex items-center`}
                    >{props.placeholder}</div> : undefined
                }
                <textarea
                    ref={ref}
                    className={`${states.form?.text ? 'relative' : ''} bg-transparent border-0 outline-0 w-full h-full resize-none overflow-y-auto customScrollbar`}
                    value={states.form?.text}
                    rows={1}
                    onChange={handles.onTextareaChange}
                    onKeyDown={handles.onKeyDown}
                />
            </label>
            <div
                onClick={handles.send}
                className="fill-gray800 dark:fill-gray200"
            >
                <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.22583 3.65211C1.93237 2.77171 2.84984 1.97599 3.67989 2.39101L17.0348 9.0685C17.8026 9.45234 17.8026 10.548 17.0348 10.9318L3.67989 17.6093C2.84983 18.0243 1.93237 17.2286 2.22583 16.3483L4.13357 10.625H7.709C8.05417 10.625 8.33399 10.3452 8.33399 10C8.33399 9.65484 8.05417 9.375 7.709 9.375H4.13346L2.22583 3.65211Z" />
                </svg>
            </div>
        </div>
    )
}

export default SendMessageInput;