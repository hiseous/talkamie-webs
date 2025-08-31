
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import IconWrapper from '../icon/IconWrapper';
import { __classNames } from '../../utils/constants/classNames';
import { useSwiper } from 'swiper/react';
import LandingSlideshowDots from "./LandingSlideshowDots";

type LandingSlideshowButtonsProps = ComponentPrimitiveProps & {
    isBeginning?: boolean;
    isEnd?: boolean;
    activeIndex?: number;
};

const LandingSlideshowButtons = (props: LandingSlideshowButtonsProps) => {
    const swiper = useSwiper();
    const buttonClassName = `p-4 xl:p-5 rounded-full bg-redVar1 flex items-center justify-center fill-white lg:[&>*]:w-[44px] lg:[&>*]:h-[44px]`;
    
    return (
        <div className={`${props.className || ''} flex items-center justify-between mx-auto max-w-[800px]`}>
            <IconWrapper
                svgAssetName="AngleLeft"
                className={`${buttonClassName} ${props.isBeginning ? 'opacity-[.2]' : 'cursor-pointer'} ${__classNames.transition}`}
                onClick={() => {
                    swiper.slidePrev();
                }}
            />
            <LandingSlideshowDots
                length={swiper.slides.length}
                activeIndex={props.activeIndex ?? 0}
                className="flex-1"
            />
            <IconWrapper
                svgAssetName="AngleRight"
                className={`${buttonClassName} ${props.isEnd ? 'opacity-[.2]' : 'cursor-pointer'} ${__classNames.transition}`}
                onClick={() => {
                    swiper.slideNext();
                }}
            />
        </div>
    );
}

export default LandingSlideshowButtons;