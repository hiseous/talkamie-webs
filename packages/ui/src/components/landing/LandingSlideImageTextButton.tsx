'use client';

import { imageAssetName } from "../../assets/images/ImageAsset";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { useAppRoutes } from "../../utils/funcs/app-routes/useAppRoutes";
import BiggerButton from "../button/BiggerButton";
import HeadingText from "../heading/HeadingText";
import { ButtonProps } from "../button/Button";

type LandingSlideImageTextButtonProps = ComponentPrimitiveProps & {
    imageName: imageAssetName;
    texts: [string, string],
    buttonProps?: ButtonProps;
    reverse?: boolean;
};

const LandingSlideImageTextButton = (props: LandingSlideImageTextButtonProps) => {
    const routes = useAppRoutes();
    
    return (
        <div
            className={`${props.className || ''} text-center xl:flex items-stretch ${props.reverse ? 'xl:flex-row-reverse' : ''} h-full`}
        >
            {/* <div className="mt-3 relative w-[fit-content] h-[fit-content] xl:h-[initial] mx-auto shrink-0">
                <ImageAsset
                    name={props.imageName}
                    // className="w-[180px] md:w-[280px] h-auto rounded-[70px]"
                    className="w-full h-full max-w-[280px] max-h-[410px] xl:w-[460px] xl:max-h-full rounded-full object-cover"
                />
                <IconWrapper
                    className="absolute -top-3 right-3 w-0 h-0 p-3 md:p-4 [&>*]:md:w-[44px] [&>*]:md:h-[44px] box-content rounded-full bg-redVar1 fill-none stroke-white"
                    svgAssetName="CheckCircleBroken"
                    iconSize={48}
                />
            </div> */}
            <div className={`flex-1 flex flex-col items-center justify-center`}>
            {/* <div className={`mt-4 xl:mt-0 flex-1 flex flex-col items-center justify-center ${props.reverse ? 'xl:pr-20' : 'xl:pl-20'}`}> */}
                <HeadingText className="max-w-[700px] xl:max-w-[800px] mx-auto">
                    {props.texts[0]}
                    <br/>
                    <span className="text-redVar1"> {props.texts[1]}</span>
                </HeadingText>
                <BiggerButton
                    href={routes.auth(['sign-up'], {type: 'senior'})}
                    theme="red-gradient"
                    className="mt-6 md:mt-8 xl:mt-12"
                    {...props.buttonProps}
                />
            </div>
        </div>
    );
}

export default LandingSlideImageTextButton;