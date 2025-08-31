'use client';

import ImageAsset from "../../assets/images/ImageAsset";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { useAppRoutes } from "../../utils/funcs/app-routes/useAppRoutes";
import BiggerButton from "../button/BiggerButton";
import { useRef } from "react";
import { useScaleUpOnScroll } from "../motions/useScaleUpOnScroll";
import HeadingText from "../heading/HeadingText";

type BringingYouJoyProps = ComponentPrimitiveProps & {
    onProgress?: (progress: number) => void;
};

const BringingYouJoy = (props: BringingYouJoyProps) => {
    const routes = useAppRoutes();
    const ref = useRef<HTMLDivElement | null>(null);
    useScaleUpOnScroll({
        targetRef: ref,
        onProgress: props.onProgress,
    });
    
    return (
        <div
            // onProgress={props.onProgress}
            ref={ref}
            className={`${props.className || ''} px-4 md:px-0 pb-10 md:pb-40 text-center bg-gradient-to-b from-white from-[3%] to-pinkVar6 to-[100%]`}
        >
            <HeadingText className="max-w-[860px] mx-auto">
                Bringing you joy
                <div className="text-redVar1"> one call at a time.</div>
            </HeadingText>
            <ImageAsset
                name="mobileVideoCallPng"
                className="mt-14 md:mt-24 w-auto h-[76vh] mx-auto"
                // className="mt-14 md:mt-32 w-full max-w-[490px] h-auto mx-auto"
            />
            <div className="mt-14 md:mt-20">
                <HeadingText size="sm" className="text-blackVar8 max-w-[800px] mx-auto !font-semibold">
                    We're here to make every day a little brighter for you. Start meeting Amies!
                </HeadingText>
                <BiggerButton href={routes.auth(['sign-up'], {type :'senior'})} theme="red-gradient" className="mt-12 md:mt-16">
                    Schedule Your First Call
                </BiggerButton>
            </div>
        </div>
    );
}

export default BringingYouJoy;