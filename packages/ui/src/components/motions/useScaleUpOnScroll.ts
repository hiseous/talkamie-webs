import { useScroll } from "motion/react";
import { useEffect } from "react";

type useScaleUpOnScrollProps = {
    children?: React.ReactNode;
    containerRef?: React.RefObject<HTMLElement | null>;
    targetRef?: React.RefObject<HTMLElement | null>;
    // offset?: UseScrollOptions['offset'];
    onProgress?: (progress: number) => void;
}
export const useScaleUpOnScroll = (props: useScaleUpOnScrollProps) => {
    const scroll = useScroll({
        container: props.containerRef,
        target: props.targetRef,
        // offset: ["0 1.5", "1 1.25"],
        // offset: ["start end", "end start"],
        offset: ["start end", "0 0.15"],
        // layoutEffect: false,
    });
    // const scale = useTransform(scroll.scrollYProgress, [0.05, 0.8, 1], [0.7, 0.9, 1])
    // const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1])


    useEffect(() => {
        scroll.scrollYProgress.on("change", (progress) => {
            if(props.onProgress) props.onProgress(progress);
        });
    }, [scroll.scrollYProgress]);

};