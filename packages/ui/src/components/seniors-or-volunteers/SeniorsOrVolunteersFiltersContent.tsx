'use client';

import { ComponentPrimitiveProps, valueOf } from "../../utils/types/global.types";
import { getUsersTriggerProps } from "../../utils/api/users/useGetUsersApi";
import InputSelectGender from "../input-select/InputSelectGender";
import InputSelectCountry from "../input-select/InputSelectCountry";
import InputAgeRange from "../input-text/InputAgeRange";
import { useState } from "react";
import { getNewKey } from "../../utils/funcs/string/string";

type SeniorsOrVolunteersFiltersContentProps = ComponentPrimitiveProps & {
    resetKey?: string;
    defaultFilter?: getUsersTriggerProps['query'];
    onChange?: (filterName: keyof Exclude<getUsersTriggerProps['query'], undefined>, filterValue?: valueOf<Exclude<getUsersTriggerProps['query'], undefined>>) => void;
    onReset?: () => void;
};

const SeniorsOrVolunteersFiltersContent = (props: SeniorsOrVolunteersFiltersContentProps) => {
    const buttonClassName = `border-[1px] border-grayVar6 px-4 py-3 rounded-md`;
    const [resetKey, setResetKey] = useState<string | undefined>(props.resetKey);
    const handles = {
        reset: () => {
            setResetKey(getNewKey());
            if(props.onReset) props.onReset();
        },
    };
    
    return (
        <div
            key={resetKey}
            className={`${props.className || ''} md:flex items-center justify-between`}
        >
            {/* <div className="[&>*]:inline-block [&>*]:pb-2 [&>*]:pr-2 [&>*:nth-child(3)]:pr-0"> */}
            <div className="[&>*]:mt-3 md:[&>*]:mt-0 md:[&>*]:ml-2 md:[&>*:nth-child(1)]:ml-0 md:flex">
                <InputSelectGender
                    placeholder={<span className="text-black">Gender</span>}
                    handleClassName={`${buttonClassName}`}
                    menuPosition={{x: 'left'}}
                    defaultValue={props.defaultFilter?.gender}
                    onChange={(value) => {
                        if(props.onChange) props.onChange('gender', value);
                    }}
                />
                <InputAgeRange
                    handle={{
                        className: buttonClassName,
                    }}
                    menuPosition={{x: "left"}}
                    defaultValues={{min: props.defaultFilter?.minAge?.toString(), max: props.defaultFilter?.maxAge?.toString()}}
                    onMinChange={(value) => {
                        if(props.onChange) props.onChange('minAge', value);
                    }}
                    onMaxChange={(value) => {
                        if(props.onChange) props.onChange('maxAge', value);
                    }}
                />
                {/* <InputSelectAge
                    placeholder={<span className="text-black">Age</span>}
                    handleClassName={`${buttonClassName}`}
                    menuPosition={{x: "left"}}
                    onChange={(value) => {
                        if(props.onChange) props.onChange('age', value);
                    }}
                /> */}
                <InputSelectCountry
                    placeholder={<span className="text-black">Location</span>}
                    handleClassName={`${buttonClassName} [&_*]:!w-[max-content] [&_img]:hidden`}
                    menuPosition={{x: "left"}}
                    onChange={(value) => {
                        if(props.onChange) props.onChange('location', value.country);
                    }}
                />
            </div>
            <div
                onClick={handles.reset}
                className={`${buttonClassName} cursor-pointer w-full md:w-[fit-content] text-center bg-pinkVar1 text-redVar1 hover:bg-redVar1 hover:text-white`}
            >
                Reset Filter
            </div>
        </div>
    );
}

export default SeniorsOrVolunteersFiltersContent;