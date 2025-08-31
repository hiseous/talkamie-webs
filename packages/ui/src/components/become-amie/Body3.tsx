import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { useRef } from "react";
import { useScaleUpOnScroll } from "../motions/useScaleUpOnScroll";
import HeadingText from "../heading/HeadingText";

type Body3Props = ComponentPrimitiveProps & {
    onProgress?: (progress: number) => void;
};

const Body3 = (props: Body3Props) => {
    const ref = useRef<HTMLDivElement | null>(null);
    useScaleUpOnScroll({
        targetRef: ref,
        onProgress: props.onProgress,
    });
    
    return (
        <div
            // onProgress={props.onProgress}
            ref={ref}
            className={`${props.className || ''}`}
        >
            <HeadingText size="sm" className="text-center text-redVar1">
                Why Become an Amie?
            </HeadingText>
            <video
                src="/videos/welcome-intro.mp4"
                controls
                muted autoPlay loop
                className="mt-12 w-full h-auto bg-black mx-auto md:rounded-3xl"
            />
        </div>
    );
}

export default Body3;