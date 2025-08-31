'use client';

import { useEffect, useState } from "react";

type useCheckboxProps = {
    defaultChecked?: boolean;
    onChange?: (checked?: boolean) => void;
}
export const useCheckbox = (props: useCheckboxProps) => {
    const [checked, setChecked] = useState(props.defaultChecked);
    
    const onClick = () => {
        const newChecked = !checked;
        setChecked(newChecked);
        if(props.onChange) props.onChange(newChecked);
        return newChecked;
    }

    useEffect(() => {
        if((props.defaultChecked !== checked)) setChecked(props.defaultChecked);
    }, [props.defaultChecked]);

    return {
        checked,
        onClick,
    }
}