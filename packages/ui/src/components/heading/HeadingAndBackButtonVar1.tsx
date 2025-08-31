'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import BackButton from "../button/BackButton";
import HeadingText from "./HeadingText";

type HeadingAndBackButtonVar1Props = ComponentPrimitiveProps & {
    children?: React.ReactNode;
};

const HeadingAndBackButtonVar1 = (props: HeadingAndBackButtonVar1Props) => {
    
    return (
        <div className={`${props.className || ''} sticky top-0 z-[2] bg-white py-3 flex items-center`}>
            <BackButton
                className={`mr-2`}
                theme="red"
            />
            <HeadingText size="2xs" className="font-semibold">
                {props.children}
            </HeadingText>
        </div>
    );
}

export default HeadingAndBackButtonVar1;