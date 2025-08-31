import { __imageAssets } from "../../assets/images/_index";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { __classNames } from "../../utils/constants/classNames";
import BiggerButton from "../button/BiggerButton";
import { useRef } from "react";
import { useScaleUpOnScroll } from "../motions/useScaleUpOnScroll";
import HeadingText from "../heading/HeadingText";

type LandingBody5Props = ComponentPrimitiveProps & {
    onProgress?: (progress: number) => void;
};

const LandingBody5 = (props: LandingBody5Props) => {
    // const routes = useAppRoutes();
    const ref = useRef<HTMLDivElement | null>(null);
    useScaleUpOnScroll({
        targetRef: ref,
        onProgress: props.onProgress,
    });
    
    return (
        <div
            // onProgress={props.onProgress}
            ref={ref}
            className={`${props.className || ''} ${__classNames.screenH}`}
        >
            <div
                style={{backgroundImage: `url(${__imageAssets.elderHappyManJpeg.src})`}}
                className="h-full relative px-4 md:px-10 md:py-4 text-white overflow-hidden bg-no-repeat bg-top bg-cover"
            >
                <div
                    className="absolute w-full h-full top-0 left-0 bg-black/[.4]"
                ></div>
                <div className="relative h-full flex flex-col justify-between">
                    <div></div>
                    <HeadingText className="md:mt-12 max-w-[700px] text-center mx-auto">
                        Do you need Help Getting Started?
                        {/* Make a Difference, One Call at a Time */}
                    </HeadingText>
                    <BiggerButton
                        // href={routes.auth(['sign-up'])}
                        theme="white"
                        className="mb-6">
                        Reach out to us
                    </BiggerButton>
                </div>
            </div>
        </div>
    );
}

export default LandingBody5;