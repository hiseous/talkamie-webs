'use client';

import { useState } from "react";
import { ComponentPrimitiveProps, valueOf } from "../../utils/types/global.types";
import { getUsersTriggerProps } from "../../utils/api/users/useGetUsersApi";
import { getNewKey } from "../../utils/funcs/string/string";
import Button from "../button/Button";
import SeniorsOrVolunteersFiltersContent from "./SeniorsOrVolunteersFiltersContent";
import { usePopUp } from "../pop-up-provider/usePopUpContext";
import ModalWrapper from "../modal/ModalWrapper";
import HeadingText from "../heading/HeadingText";

type SeniorsOrVolunteersFilterProps = ComponentPrimitiveProps & {
    defaultFilter?: getUsersTriggerProps['query'];
    onChange?: (filterName: keyof Exclude<getUsersTriggerProps['query'], undefined>, filterValue?: valueOf<Exclude<getUsersTriggerProps['query'], undefined>>) => void;
    onReset?: () => void;
};

const SeniorsOrVolunteersFilter = (props: SeniorsOrVolunteersFilterProps) => {
    const popUp = usePopUp();
    const [resetKey, setResetKey] = useState<string | undefined>(undefined);
    const handles = {
        reset: () => {
            setResetKey(getNewKey());
            if(props.onReset) props.onReset();
        },
        renderContent: (className?: string) => {
            return (
                <SeniorsOrVolunteersFiltersContent
                    className={className}
                    resetKey={resetKey}
                    onChange={props.onChange}
                    defaultFilter={props.defaultFilter}
                    onReset={handles.reset}
                />
            )
        },
    };
    
    return (
        <div
            key={resetKey}
            className={`${props.className || ''}`}
        >
            <Button
                onClick={() => {
                    popUp?.set({
                        nodes: [
                            <>
                                <ModalWrapper>
                                    <HeadingText size="sm">Set filter</HeadingText>
                                    {handles.renderContent('mt-8')}
                                </ModalWrapper>
                            </>
                        ],
                    });
                }}
                theme="pink-var-1"
                className="px-5 md:hidden rounded-md"
            >
                <div>Set Filter</div>
                {/* <SvgAsset name="" size={24} className="ml-2 md:w-[28px] md:h-[28px]"/> */}
            </Button>
            {handles.renderContent('hidden md:block')}
        </div>
    );
}

export default SeniorsOrVolunteersFilter;