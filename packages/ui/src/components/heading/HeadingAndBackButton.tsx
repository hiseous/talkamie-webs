'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { __classNames } from "../../utils/constants/classNames";
import BackButton from "../button/BackButton";

type HeadingAndBackButtonProps = ComponentPrimitiveProps & {
    children?: React.ReactNode;
};

const HeadingAndBackButton = (props: HeadingAndBackButtonProps) => {
    
    return (
        <div
            className={`${props.className || ''} sticky top-0 z-[2] bg-white relative flex items-center justify-center text-2xl md:text-3xl font-semibold
                py-2 border-[2px] border-pinkVar1 rounded-sm
            `}
        >
            <BackButton
                className={`absolute left-2 ${__classNames.posCenterY}`}
                theme="red"
            />
            {
                props.children ?
                <span>
                    {props.children}
                </span> : <></>
            }
        </div>
    );
}

export default HeadingAndBackButton;