'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import HeadingText from "../heading/HeadingText";
import { useRef } from "react";
import { useScaleUpOnScroll } from "../motions/useScaleUpOnScroll";
import ImageAsset, { imageAssetName } from "../../assets/images/ImageAsset";
import Button from "../button/Button";
import { __routes } from "../../utils/constants/app-routes";

type card = {
    imageName: imageAssetName;
    label: string;
}
type WhatWillYouLikeToDoProps = ComponentPrimitiveProps & {
    onProgress?: (progress: number) => void;
};

const WhatWillYouLikeToDo = (props: WhatWillYouLikeToDoProps) => {
    const ref = useRef<HTMLDivElement | null>(null);
    useScaleUpOnScroll({
        targetRef: ref,
        onProgress: props.onProgress,
    });
    const cards: card[] = [
        {
            imageName: 'vectorComputerVideoCallPng',
            label: `Video Call an Amie`,
        },
        {
            imageName: 'vectorCallChatLinearPng',
            label: `Voice Call an Amie`,
        },
        {
            imageName: 'vectorChatSquareCallOutlinePng',
            label: `Become a Pen Pal`,
        },
    ];

    return (
        <div
            ref={ref}
            className={`${props.className || ''} px-8 md:px-14 xl:px-24 xxl:px-36 mx-auto`}
        >
            <HeadingText className="max-w-[700px] text-center mx-auto">
                What would you like to do today?
            </HeadingText>
            <div className="mt-16 grid grid-cols-1 xl:grid-cols-3 gap-6 text-center">
                {
                    cards.map((card, i) => {
                        return (
                            <div
                                key={i}
                                className="bg-redVar1/[.02] flex flex-col items-center p-6 rounded-lg shadow-xl shadow-black/[.05]"
                            >
                                <ImageAsset name={card.imageName} className="w-[100px] h-auto" />
                                <HeadingText size="xs" className="mt-6">{card.label}</HeadingText>
                                <Button theme="red-gradient" href={__routes.auth(['sign-up'], {type: 'senior'})} className="w-full font-semibold mt-8 block shadow-xl shadow-black/[.12] 2xl:py-5 rounded-full">
                                    <HeadingText size="2xs">
                                        Get Started
                                    </HeadingText>
                                </Button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default WhatWillYouLikeToDo;
