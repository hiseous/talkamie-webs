import { __imageAssets } from "../../assets/images/_index";
import ImageAsset from "../../assets/images/ImageAsset";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { __classNames } from "../../utils/constants/classNames";
import IconWrapper from "../icon/IconWrapper";
import { useRef } from "react";
import { useScaleUpOnScroll } from "../motions/useScaleUpOnScroll";

type LandingBody3Props = ComponentPrimitiveProps & {
    onProgress?: (progress: number) => void;
};

const LandingBody3 = (props: LandingBody3Props) => {
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
                style={{backgroundImage: `url(${__imageAssets.happyElderlyWomanVideoCallJpg.src})`}}
                className="h-full relative px-4 md:px-10 md:py-4 text-white overflow-hidden bg-no-repeat bg-top xl:bg-[100%_40%] bg-cover"
            >
                <div
                    className="absolute w-full h-full top-0 left-0 bg-black/[.3]"
                ></div>
                <div className="relative h-full flex flex-col justify-between">
                    <div></div>
                    {/* <HeadingText className="max-w-[979px] text-center mx-auto">
                        We can be a friend, we can also be like family!
                    </HeadingText> */}
                    <div className="mb-6 relative">
                        <ImageAsset
                            name="smilingFemaleSitJpeg"
                            className="w-[120px] h-[160px] md:w-[240px] md:h-[330px] object-cover rounded-2xl absolute bottom-20 md:bottom-0 right-0"
                        />
                        <div className="flex items-center justify-center text-lg 2xl:text-3xl">
                            <div className="flex items-center justify-center bg-black/[.5] px-5 py-4 2xl:py-10 max-w-[fit-content] 2xl:max-w-[500px] w-full rounded-full">
                                <div className="relative">
                                    <ImageAsset
                                        name="unionBoxDashedWhitePng"
                                        className="w-auto h-[24px] md:h-[32px] 2xl:h-[40px]"
                                    />
                                    <div
                                        className="absolute top-[-4px] right-[-4px] w-0 h-0 p-[5px] md:p-[6px] box-content rounded-full bg-greenVar2"
                                    ></div>
                                </div>
                                <div className="pl-3 font-medium">
                                    Amie / Friend
                                </div>
                            </div>
                            <IconWrapper
                                className={`ml-2 fill-white bg-black/[.5] p-4 md:p-3 2xl:p-6 2xl:[&>svg]:w-[60px] 2xl:[&>svg]:h-[60px] rounded-full bg-redVar1`}
                                svgAssetName="CommentText"
                                iconSize={32}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingBody3;