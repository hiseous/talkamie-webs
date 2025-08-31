'use client';

import ImageAsset from "../../assets/images/ImageAsset";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { useAppRoutes } from "../../utils/funcs/app-routes/useAppRoutes";
import BiggerButton from "../button/BiggerButton";
import IconWrapper from "../icon/IconWrapper";
import { useRef } from "react";
import { useScaleUpOnScroll } from "../motions/useScaleUpOnScroll";
import HeadingText from "../heading/HeadingText";

type LandingBody4Props = ComponentPrimitiveProps & {
    onProgress?: (progress: number) => void;
};

const LandingBody4 = (props: LandingBody4Props) => {
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
            className={`${props.className || ''} px-4 md:px-0`}
        >
            {/* <div className="text-center">
                <HeadingText className="max-w-[700px] xl:max-w-[800px] mx-auto">
                    Feel heard, cared for,
                    <span className="text-redVar1"> and never alone!</span>
                </HeadingText>
                <div className="mt-8 md:mt-12 relative w-[fit-content] mx-auto">
                    <ImageAsset
                        name="positiveMatureManPng"
                        className="w-[180px] md:w-[280px] h-auto rounded-[70px]"
                    />
                    <IconWrapper
                        className="absolute -top-3 -right-3 w-0 h-0 p-3 md:p-4 [&>*]:md:w-[44px] [&>*]:md:h-[44px] box-content rounded-full bg-redVar1 fill-none stroke-white"
                        svgAssetName="CheckCircleBroken"
                        iconSize={32}
                    />
                </div>
                <BiggerButton href={routes.auth(['sign-up'], 'senior')} theme="red-gradient" className="mt-12 md:px-32">
                    Find a Friend
                </BiggerButton>
            </div> */}
            <ImageAsset
                name="mobileVideoCallPng"
                className="w-full max-w-[490px] h-auto mx-auto"
            />
            <div className="mt-20 md:mt-32 text-center">
                <HeadingText className="max-w-[860px] mx-auto">
                    Bringing you joy
                    <div className="text-redVar1"> one call at a time.</div>
                </HeadingText>
                <div className="mt-8 md:mt-16 relative w-[fit-content] mx-auto">
                    <ImageAsset
                        name="_001CroppedPng"
                        className="w-[180px] md:w-[280px] h-auto"
                    />
                    <IconWrapper
                        className="absolute -top-3 -right-3 w-0 h-0 p-3 md:p-4 [&>*]:md:w-[44px] [&>*]:md:h-[44px] box-content rounded-full bg-redVar1 fill-none stroke-white"
                        svgAssetName="CheckCircleBroken"
                        // imageAssetName="souldmatesstrokewhitePng"
                        iconSize={32}
                    />
                </div>
                <BiggerButton href={routes.auth(['sign-up'], {type: 'senior'})} theme="red-gradient" className="mt-12 md:mt-16">
                    Schedule Your First Call
                </BiggerButton>
            </div>
        </div>
    );
}

export default LandingBody4;