'use client';

import { __imageAssets } from "../../assets/images/_index";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { __classNames } from "../../utils/constants/classNames";
import HeadingText from "../heading/HeadingText";
import { useScaleUpOnScroll } from "../motions/useScaleUpOnScroll";
import { useRef } from "react";
import BiggerButton from "../button/BiggerButton";
import { usePopUp } from "../pop-up-provider/usePopUpContext";
import ViewAmiesModal from "./ViewAmiesModal";

type LandingBody1Props = ComponentPrimitiveProps & {
    onProgress?: (progress: number) => void;
};

const LandingBody1 = (props: LandingBody1Props) => {
    // const routes = useAppRoutes();
    const popUp = usePopUp();
    
    const ref = useRef<HTMLDivElement | null>(null);
    useScaleUpOnScroll({
        targetRef: ref,
        onProgress: props.onProgress,
    });
    
    return (
        <div
            // onProgress={props.onProgress}
            // offset={['start end', 'end start']}
            ref={ref}
            className={`${props.className || ''} ${__classNames.screenH}`}
        >
            <div
                style={{backgroundImage: `url(${__imageAssets._002Jpeg.src})`}}
                className="h-full relative px-4 md:px-10 md:py-4 xxl:pb-8 text-white overflow-hidden bg-no-repeat bg-[75%_10%] md:bg-top bg-cover"
            >
                <div
                    className="absolute w-full h-full top-0 left-0 bg-black/[.4]"
                ></div>
                <div className="relative h-full grid grid-rows-3 gap-0">
                    <div className="">
                    </div>
                    <div className="flex flex-col justify-end">
                        <HeadingText className="max-w-[679px] text-center mx-auto xl:mb-3 xxl:!leading-[1.18]">
                            Recurring Virtual Companionship for Seniors.
                        </HeadingText>
                    </div>
                    <div className="flex flex-col justify-end">
                        <BiggerButton
                            // href={routes.auth(['sign-in'])}
                            theme="white"
                            className="mt-10 xl:mt-14 2xl:mt-4 mb-4 xl:mb-0 !max-w-[1010px] mx-auto block"
                            // className="text-center max-w-[360px] w-full mt-14 mb-8 xxl:mt-20 mx-auto py-4 !rounded-[80px] text-3xl font-medium bg-white hover:bg-redVar1 text-redVar1 hover:text-white"
                            onClick={() => {
                                popUp?.set({
                                    nodes: [
                                        <ViewAmiesModal
                                            close={popUp.reset}
                                        />
                                    ],
                                });
                            }}
                        >
                            View Amies (Friends)
                        </BiggerButton>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingBody1;
