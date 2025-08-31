import { __imageAssets } from "../../assets/images/_index";
import ImageAsset from "../../assets/images/ImageAsset";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { __classNames } from "../../utils/constants/classNames";
import IconWrapper from "../icon/IconWrapper";
import ScaleUpOnScrollWrapper from "../motions/ScaleUpOnScrollWrapper";

type WeCanBeFriendProps = ComponentPrimitiveProps & {
    onProgress?: (progress: number) => void;
};

const WeCanBeFriend = (props: WeCanBeFriendProps) => {
    
    return (
        <ScaleUpOnScrollWrapper
            onProgress={props.onProgress}
            className={`${props.className || ''} ${__classNames.screenH}`}
        >
            <div
                style={{backgroundImage: `url(${__imageAssets.smilingFemaleSitJpeg.src})`}}
                className="h-full relative px-4 md:px-10 md:py-4 text-white overflow-hidden bg-no-repeat bg-top bg-cover"
            >
                <div
                    className="absolute w-full h-full top-0 left-0 bg-black/[.4]"
                ></div>
                <div className="relative h-full flex flex-col justify-between">
                    <div></div>
                    <div className="text-5xl md:text-6xl max-w-[979px] text-center mx-auto font-semibold !leading-tight">
                        We can be a friend, we can also be like family!
                    </div>
                    <div className="mb-6 relative">
                        <ImageAsset
                            name="portraitOfHappyElderlyWomanPng"
                            className="w-auto h-[160px] md:h-[280px] rounded-2xl absolute bottom-20 md:bottom-0 right-0"
                        />
                        <div className="flex items-center justify-center">
                            <div className="flex items-center bg-black/[.5] px-5 py-4 rounded-full">
                                <div className="relative">
                                    <ImageAsset
                                        name="unionBoxDashedWhitePng"
                                        className="w-auto h-[24px] md:h-[32px]"
                                    />
                                    <div
                                        className="absolute top-[-4px] right-[-4px] w-0 h-0 p-[5px] md:p-[6px] box-content rounded-full bg-greenVar2"
                                    ></div>
                                </div>
                                <div className="pl-3 font-medium text-lg">
                                    Amie / Volunteer
                                </div>
                            </div>
                            <IconWrapper
                                className={`ml-2 fill-white bg-black/[.5] p-4 md:p-3 rounded-full bg-blueVar1`}
                                svgAssetName="CommentText"
                                iconSize={32}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </ScaleUpOnScrollWrapper>
    );
}

export default WeCanBeFriend;