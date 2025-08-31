'use client';

import { useEffect, useRef } from "react";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { motion, useScroll, useTransform } from "motion/react";

type ScaleUpOnScrollInnerWrapperProps = ComponentPrimitiveProps & {
    children?: React.ReactNode;
    scrollContainerRef?: React.RefObject<HTMLElement | null>;
    // offset?: UseScrollOptions['offset'];
    onProgress?: (progress: number) => void;
};

const ScaleUpOnScrollInnerWrapper = (props: ScaleUpOnScrollInnerWrapperProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const scroll = useScroll({
        container: props.scrollContainerRef,
        target: ref,
        // offset: ["0 1.5", "1 1.25"],
        // offset: ["start end", "end start"],
        offset: ["start end", "0 0.15"],
        // layoutEffect: false,
    });
    const scale = useTransform(scroll.scrollYProgress, [0.05, 0.8, 1], [0.7, 0.9, 1])
    // const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1])


    useEffect(() => {
        scroll.scrollYProgress.on("change", (progress) => {
            if(props.onProgress) props.onProgress(progress);
        });
    }, [scroll.scrollYProgress]);

    return (
        <motion.div
            ref={ref}
            className={`${props.className || ''}`}
            style={{
                scale,
                // opacity: hook.video2Opacity,
            }}
        >
            {props.children}
        </motion.div>
    );
}

export default ScaleUpOnScrollInnerWrapper;