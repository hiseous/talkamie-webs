'use client';

import { useEffect, useState } from "react";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { imageAssetName } from "../../assets/images/ImageAsset";
import BlandTag from "../label/BlandTag";

type InputTagProps = ComponentPrimitiveProps & {
    label: React.ReactNode;
    iconName?: imageAssetName;
    iconSrc?: string;
    emoji?: string;
    defaultChecked?: boolean;
    onChange?: (checked?: boolean) => void;
}
const InputTag = (props: InputTagProps) => {
    const [checked, setChecked] = useState(props.defaultChecked);
    
    useEffect(() => {
        if(props.defaultChecked !== undefined){
            if(props.onChange) props.onChange(props.defaultChecked);
        }
    }, []);

    return (
        <BlandTag
            onClick={() => {
                const newChecked = !checked;
                setChecked(newChecked);
                if(props.onChange) props.onChange(newChecked);
            }}
            className={`${props.className || ''}`}
            label={props.label}
            iconName={props.iconName}
            iconSrc={props.iconSrc}
            emoji={props.emoji}
            checked={checked}
        />
    )
}

export default InputTag;