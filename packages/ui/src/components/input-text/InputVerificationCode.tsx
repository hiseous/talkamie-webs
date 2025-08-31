'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { useInputVerificationCode } from "./useInputVerificationCode";
import InputLabel from "../input-label/InputLabel";
import InputText from "./InputText";

export type inputVerificationCodeOnChangeFieldProps = {
    value?: string;
}
type inputVerificationCodeFieldProps = {
    defaultValue?: string;
    placeholder?: string;
    disabled?: boolean;
}
type inputVerificationCodeOnChangeProps = {
    field: inputVerificationCodeOnChangeFieldProps;
    fieldIndex: number;
    concatenatedFieldValues?: string;
}
type inputVerificationLastFilledProps = {
    concatenatedFieldValues?: string;
}

export type InputVerificationCodeProps = ComponentPrimitiveProps & {
    label?: string;
    hint?: string;
    fieldNumber?: number;
    // size?: componentSize;
    fields?: inputVerificationCodeFieldProps[];
    fieldsPlaceholder?: string;
    hyphenated?: boolean;
    disabled?: boolean;
    onChange?: (changeProps: inputVerificationCodeOnChangeProps) => void;
    onLastInputFilled?: (lastFilledProps: inputVerificationLastFilledProps) => void;
}

const InputVerificationCode = (props: InputVerificationCodeProps) => {
    const hook = useInputVerificationCode(props);

    return (
        <div
            className={`${props.className || ''}`}
        >
            {
                props.label &&
                <InputLabel className="mb-2">{props.label}</InputLabel>
            }
            {
                hook.fieldLen > 0 ?
                <div className="flex items-center justify-center">
                    {
                        hook.fields.map((field, i) => {
                            const initialField = props.fields?.length ? props.fields[i] : undefined;
                            const quotient = Math.floor(hook.fieldLen / 2);
                            const midFieldIndex = (hook.fieldLen % 2 === 0) ? (quotient - 1) : quotient;
                            const isMiddle =  i === midFieldIndex;
                            return (
                                <div key={i}>
                                    <InputText
                                        defaultValue={initialField?.defaultValue || undefined}
                                        autoFocus={i === 0}
                                        className={`${i > 0 ? 'ml-1' : ''} border-[1px] border-grayVar6
                                            text-center font-semibold !w-18 !h-18 md:!w-24 md:!h-24 text-5xl md:text-6xl
                                        `}
                                        placeholder={initialField?.placeholder || props.fieldsPlaceholder || '0'}
                                        maxLength={1}
                                        // showRemainingCharLength={false}
                                        autoFocusKey={hook.focusedIndex === i ? hook.autoFocusKey : undefined}
                                        disabled={initialField?.disabled ?? props.disabled}
                                        onChange={(value) => {
                                            hook.handles.change(i, value);
                                        }}
                                    />
                                    {
                                        (props.hyphenated && isMiddle) ?
                                        <div
                                            className={`ml-4 shrink-0 w-[22px] h-[5px]
                                                ${field.value ? `bg-brand600` : `bg-grayVar6`}
                                            `}
                                        ></div> :
                                        <></>
                                    }
                                </div>
                            )
                        })
                    }
                </div> :
                <></>
            }
            <div className="[&>*]:mt-2 text-sm">
                {
                    props.hint &&
                    <div className="text-gray600">{props.hint}</div>
                }
            </div>
        </div>
    )
}

export default InputVerificationCode;