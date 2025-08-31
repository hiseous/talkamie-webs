'use client';

import { useEffect, useRef, useState } from "react";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { UseScrollOptions } from "motion/react";
import { __classSelectors } from "../../utils/constants/querySelectors";
import ScaleUpOnScrollInnerWrapper from "./ScaleUpOnScrollInnerWrapper";
import { getNewKey } from "../../utils/funcs/string/string";

type ScaleUpOnScrollWrapperProps = ComponentPrimitiveProps & {
    children?: React.ReactNode;
    offset?: UseScrollOptions['offset'];
    onProgress?: (progress: number) => void;
};

const ScaleUpOnScrollWrapper = (props: ScaleUpOnScrollWrapperProps) => {
    const scrollContainerRef = useRef<HTMLElement | null>(null);
    const [key, setKey] = useState<string | undefined>(undefined);
    
    useEffect(() => {
        scrollContainerRef.current = document.querySelector(`.${__classSelectors.appBodyClass}`);
    }, []);
    useEffect(() => {
        if(scrollContainerRef.current){
            setKey(getNewKey());
        }
    }, [scrollContainerRef.current]);

    return (
        <ScaleUpOnScrollInnerWrapper
            scrollContainerRef={scrollContainerRef}
            key={key}
            className={`${props.className || ''}`}
            onProgress={props.onProgress}
        >
            {props.children}
        </ScaleUpOnScrollInnerWrapper>
    );
}

export default ScaleUpOnScrollWrapper;