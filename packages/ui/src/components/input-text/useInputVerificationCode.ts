'use client';

import { useEffect, useState } from "react";
import { inputVerificationCodeOnChangeFieldProps, InputVerificationCodeProps } from "./InputVerificationCode";

export const useInputVerificationCode = (props: InputVerificationCodeProps) => {
    const fieldLen = props.fields?.length ?? props.fieldNumber ?? 4;
    const [states, setStates] = useState({
        fields: [] as inputVerificationCodeOnChangeFieldProps[],
        focusedIndex: undefined as number | undefined,
        autoFocusKey: undefined as string | undefined,
    });
    const handleChange = (index: number, value?: string) => {
        const fields = states.fields;
        if(index in fields){
            const newStates = {...states};
            const field = fields[index];
            field.value = value;
            let concatenatedFieldValues = '';
            fields.map((field) => {
                concatenatedFieldValues += field.value || '';
            })

            if(value && index < fields.length - 1){
                //autofocus the next field;
                newStates.autoFocusKey = `${Date.now()}`;
                newStates.focusedIndex = index + 1;
            }
            else if(value && index === fields.length - 1){
                //last input is filled;
                if(props.onLastInputFilled) props.onLastInputFilled({
                    concatenatedFieldValues,
                });
            }
            else {
                newStates.autoFocusKey = undefined;
                newStates.focusedIndex = undefined;
            }

            if(props.onChange) props.onChange({
                field,
                fieldIndex: index,
                concatenatedFieldValues,
            });
            
            fields[index] = field;
            newStates.fields = fields;
            setStates({...newStates});
        }
    }
    const handles = {
        change: handleChange,
    };

    useEffect(() => {
        const fields: inputVerificationCodeOnChangeFieldProps[] = [];
        const newStates = {...states};
        Array.from({length: fieldLen}, () => {
            const field: inputVerificationCodeOnChangeFieldProps = {};
            fields.push(field);
        })
        newStates.fields = fields;
        setStates({...newStates});
    }, [fieldLen]);
    
    return {
        ...states,
        fieldLen,
        handles,
    };
}