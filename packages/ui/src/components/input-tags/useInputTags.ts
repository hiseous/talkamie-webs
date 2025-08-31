'use client';

import { useEffect, useState } from "react";
import { imageAssetName } from "../../assets/images/ImageAsset";
import { interestProps } from "../../utils/types/interest";

export type inputTagProps = {
    label?: string;
    name?: string;
    iconName?: imageAssetName;
    emoji?: string;
    iconSrc?: string;
    description?: string;
    value?: string | undefined;
    defaultChecked?: boolean;
    checked?: boolean;
}
type interest = Pick<interestProps, 'emoji' | 'name'>;
export type inputTagsChangeProps = {
    // delimitedValues?: string;
    valueList?: string[];
    tags?: inputTagProps[];
    interests?: interest[];
}
type useInputTagsProps = {
    defaultTags?: inputTagProps[];
    defaulValueList?: string[];
    onChange?: (changeProps: inputTagsChangeProps) => void;
}

export const useInputTags = (props: useInputTagsProps) => {
    const [tags, setTags] = useState<inputTagProps[]>([]);

    const handles = {
        getCheckedTags: (newTags: typeof tags, useDefaultChecked = false) => {
            // let delimitedTags = '';
            const checkedTags: inputTagProps[] = [];
            const valueList: string[] = [];
            const interests: interest[] = [];

            newTags.map((tag) => {
                if(tag.checked || (useDefaultChecked && tag.defaultChecked)){
                    checkedTags.push(tag);
                    valueList.push(tag.value || '');
                    interests.push({
                        name: tag.name || tag.label,
                        emoji: tag.emoji,
                    })
                    // delimitedTags += (delimitedTags ? ',' : '') + tag.value;
                }
            });

            return {
                delimitedValues: valueList.join(','),
                valueList,
                tags: checkedTags,
                interests,
            };
        },
        onChange: (index: number, checked?: boolean) => {
            tags[index].checked = checked;
            if(props.onChange){
                props.onChange(handles.getCheckedTags(tags));
            }
        },
    };

    useEffect(() => {
        if(props.defaultTags?.length){
            const newTags: inputTagProps[] = [];
            const defaulValueList = props.defaulValueList || [];
            
            for(let i = 0; i < props.defaultTags.length; i++){
                const tag = props.defaultTags[i];
                
                if(tag.value && defaulValueList.includes(tag.value)){
                    tag.defaultChecked = true;
                }
                newTags.push(tag);
            }
            
            setTags(newTags);
    
            const checkedProps = handles.getCheckedTags(newTags, true);
            if(checkedProps){
                if(props.onChange) props.onChange(checkedProps);
            }
        }
    }, [props.defaulValueList]);
    
    return {
        ...handles,
        tags,
    };
};