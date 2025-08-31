// 'use client';

import ImageAsset from "../../assets/images/ImageAsset";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";

type LandingSlide2Props = ComponentPrimitiveProps & {
    
};

const LandingSlide2 = (props: LandingSlide2Props) => {
    
    return (
        <div className={`${props.className || ''} h-[calc(100vh-150px)]`}>
            <ImageAsset
                name="mobileVideoCallPng"
                className={`${props.className || ''} w-auto h-full mx-auto`}
            />
        </div>
    );
}

export default LandingSlide2;