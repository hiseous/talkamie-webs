'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import InputTag from "./InputTag";
import { inputTagProps, inputTagsChangeProps, useInputTags } from "./useInputTags";

export type InputTagsProps = ComponentPrimitiveProps & {
    defaultTags?: inputTagProps[];
    defaulValueList?: string[];
    onChange?: (changeProps: inputTagsChangeProps) => void;
};

const InputTags = (props: InputTagsProps) => {
    const hook = useInputTags({
        defaultTags: props.defaultTags,
        defaulValueList: props.defaulValueList,
        onChange: props.onChange,
    });
    
    return (
        <div
            className={`${props.className || ''} flex items-center flex-wrap`}
        >
            {
                hook.tags.map((tag, i) => {
                    return (
                        <div
                            key={`${i}_${tag.defaultChecked}_${tag.checked}`}
                            className={`${(i < hook.tags.length - 1) ? 'pr-3 md:pr-6' : ''} py-3`}
                        >
                            <InputTag
                                label={tag.label || tag.name || tag.value}
                                iconName={tag.iconName}
                                iconSrc={tag.iconSrc}
                                emoji={tag.emoji}
                                defaultChecked={tag.checked ?? tag.defaultChecked}
                                onChange={(checked) => {
                                    hook.onChange(i, checked);
                                }}
                            />
                        </div>
                    )
                })
            }
        </div>
    );
}

export default InputTags;