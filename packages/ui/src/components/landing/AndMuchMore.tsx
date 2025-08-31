'use client';

import ImageAsset from "../../assets/images/ImageAsset";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { __classNames } from "../../utils/constants/classNames";
import { useAppRoutes } from "../../utils/funcs/app-routes/useAppRoutes";
import Button from "../button/Button";
import IconWrapper from "../icon/IconWrapper";
import ScaleUpOnScrollWrapper from "../motions/ScaleUpOnScrollWrapper";

type AndMuchMoreProps = ComponentPrimitiveProps & {
    onProgress?: (progress: number) => void;
};

const AndMuchMore = (props: AndMuchMoreProps) => {
    const routes = useAppRoutes();
    
    return (
        <ScaleUpOnScrollWrapper
            onProgress={props.onProgress}
            className={`${props.className || ''} ${__classNames.screenH}`}
        >
            <div
                // style={{backgroundImage: `url(${__imageAssets.smilingFemale.src})`}}
                className="h-full relative px-4 md:px-10 md:py-4 text-white overflow-hidden bg-no-repeat bg-top bg-cover bg-black"
            >
                <div
                    className="absolute w-full h-full top-0 left-0 bg-black/[.4]"
                ></div>
                <div className="relative h-full flex flex-col justify-center text-center">
                    <div className="text-4xl md:text-6xl font-semibold max-w-[600px] mx-auto">
                        And so much more.
                    </div>
                    <div className="mt-8 md:mt-12 relative w-[fit-content] mx-auto">
                        <ImageAsset
                            name="_005CroppedPng"
                            className="w-[94px] h-auto"
                        />
                        <IconWrapper
                            className="absolute top-[-4px] right-[-4px] w-0 h-0 p-2 box-content rounded-full bg-redVar1 fill-none stroke-white"
                            svgAssetName="CheckCircleBroken"
                            iconSize={14}
                        />
                    </div>
                    <div className="mt-8 md:mt-4 max-w-[310px] mx-auto text-grayVar5">
                        We are creating a more caring and connected world, one call at a time.
                    </div>
                    <Button href={routes.auth(['sign-in'])} theme="red" className="mt-16 md:px-28 md:py-4 font-medium rounded-[40px] whitespace-nowrap w-full md:w-[fit-content] mx-auto">
                        Join the party!
                    </Button>
                </div>
            </div>
        </ScaleUpOnScrollWrapper>
    );
}

export default AndMuchMore;