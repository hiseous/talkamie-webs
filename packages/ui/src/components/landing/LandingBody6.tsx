'use client';

import ImageAsset, { imageAssetName } from "../../assets/images/ImageAsset";
import { svgAssetName } from "../../assets/svg/SvgAsset";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { useAppRoutes } from "../../utils/funcs/app-routes/useAppRoutes";
import BiggerButton from "../button/BiggerButton";
import IconWrapper from "../icon/IconWrapper";
import { useRef } from "react";
import { useScaleUpOnScroll } from "../motions/useScaleUpOnScroll";
import HeadingText from "../heading/HeadingText";

type benefitProps = {
    iconName?: svgAssetName;
    thumbName?: imageAssetName;
    thumbAsIcon?: boolean;
    label: string;
}
type LandingBody6Props = ComponentPrimitiveProps & {
    onProgress?: (progress: number) => void;
};

const LandingBody6 = (props: LandingBody6Props) => {
    const routes = useAppRoutes();
    const ref = useRef<HTMLDivElement | null>(null);
    useScaleUpOnScroll({
        targetRef: ref,
        onProgress: props.onProgress,
    });
    const mobBenefits: benefitProps[] = [
        {
            label: `Get Verified`,
            thumbName: '_000CroppedPng',
        },
        {
            label: `Set Availability`,
            iconName: 'CalendarEmptyAlt',
        },
        {
            label: `Talk to Seniors`,
            thumbName: '_003CroppedPng',
        },
        {
            label: `Earn Revenue`,
            thumbName: 'dollarBrokenPng',
            thumbAsIcon: true,
        },
    ];
    const benefits: benefitProps[] = [
        {
            label: `Set Availability`,
            iconName: 'CalendarEmptyAlt',
        },
        {
            label: `Get Verified`,
            thumbName: '_000CroppedPng',
        },
        {
            label: `Talk to Seniors`,
            thumbName: '_003CroppedPng',
        },
        {
            label: `Earn Revenue`,
            thumbName: 'dollarBrokenPng',
            thumbAsIcon: true,
        },
    ];
    
    return (
        <div
            // onProgress={props.onProgress}
            ref={ref}
            className={`${props.className || ''}`}
        >
            {/* <ImageAsset
                name="screeshotLandingBody6"
                className="w-full max-w-[960px] h-auto mx-auto mb-20 md:mb-48 "
            /> */}
            <div id="become-volunteer" className="text-center">
                <HeadingText className="max-w-[800px] mx-auto">
                    Join a
                    <span className="text-redVar1"> rewarding </span>
                    community.
                </HeadingText>
                <div className="md:hidden px-4 md:px-0 overflow-hidden xl:pb-16">
                    <div className="xl:scale-[1.5] xl:mt-16 mt-4 md:mt-8 py-4 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-4 mx-auto max-w-[860px]">
                        {
                            mobBenefits.map((benefit, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="flex items-center rounded-[60px] shadow-black/[.1] shadow-md px-3 py-2 md:p-3 border-[1px] border-black/[.04]"
                                    >
                                        <div className={`shrink-0 rounded-full overflow-hidden w-[fit-content] h-[fit-content] ${benefit.thumbAsIcon || benefit.iconName ? 'bg-pinkVar3 p-3' : ''}`}>
                                            {
                                                benefit.iconName ?
                                                <IconWrapper
                                                    svgAssetName={benefit.iconName}
                                                    className="fill-redVar1 [&>*]:w-[24px] [&>*]:h-[24px] [&>*]:md:w-[32px] [&>*]:md:h-[32px]"
                                                /> :
                                                benefit.thumbName ?
                                                <ImageAsset
                                                    name={benefit.thumbName}
                                                    className={`${benefit.thumbAsIcon ? `w-[24px] h-[24px] md:w-[32px] md:h-[32px]` : `w-[51px] h-[51px] md:w-[60px] md:h-[60px]`} object-cover rounded-full overflow-hidden`}
                                                /> :
                                                <></>
                                            }
                                        </div>
                                        <div className="md:text-xl font-semibold pl-4 pr-5">
                                            {benefit.label}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="hidden md:block px-4 md:px-0 overflow-hidden xl:pb-16">
                    <div className="xl:scale-[1.5] xl:mt-16 mt-4 md:mt-8 py-4 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-4 mx-auto max-w-[860px]">
                        {
                            benefits.map((benefit, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="flex items-center rounded-[60px] shadow-black/[.1] shadow-md px-3 py-2 md:p-3 border-[1px] border-black/[.04]"
                                    >
                                        <div className={`shrink-0 rounded-full overflow-hidden w-[fit-content] h-[fit-content] ${benefit.thumbAsIcon || benefit.iconName ? 'bg-pinkVar3 p-3' : ''}`}>
                                            {
                                                benefit.iconName ?
                                                <IconWrapper
                                                    svgAssetName={benefit.iconName}
                                                    className="fill-redVar1 [&>*]:w-[24px] [&>*]:h-[24px] [&>*]:md:w-[32px] [&>*]:md:h-[32px]"
                                                /> :
                                                benefit.thumbName ?
                                                <ImageAsset
                                                    name={benefit.thumbName}
                                                    className={`${benefit.thumbAsIcon ? `w-[24px] h-[24px] md:w-[32px] md:h-[32px]` : `w-[51px] h-[51px] md:w-[60px] md:h-[60px]`} object-cover rounded-full overflow-hidden`}
                                                /> :
                                                <></>
                                            }
                                        </div>
                                        <div className="md:text-xl font-semibold pl-4 pr-5">
                                            {benefit.label}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="mt-12 md:mt-16 xl:mt-4 px-8 md:px-0">
                    <div className="text-lg md:text-xl xl:text-2xl max-w-[640px] mx-auto font-semibold">
                        Start connecting with seniors who are looking for a friendly ear and a kind heart.
                    </div>
                    <BiggerButton href={routes.auth(['sign-up'], {type: 'volunteer'})} theme="red-gradient" className="mt-16">
                        Become an Amie
                    </BiggerButton>
                </div>
            </div>
        </div>
    );
}

export default LandingBody6;