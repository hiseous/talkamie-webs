
import { useSwiper } from "swiper/react";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { __classNames } from "../../utils/constants/classNames";

type LandingSlideshowDotsProps = ComponentPrimitiveProps & {
    length?: number;
    activeIndex?: number;
};

const LandingSlideshowDots = (props: LandingSlideshowDotsProps) => {
    const swiper = useSwiper();
    
    return (
        <div className={`${props.className || ''} flex items-center justify-between mx-auto max-w-[50px] md:max-w-[60px]`}>
            {
                Array.from({length: props.length ?? 0}).map((unknown, i) => (
                    <div
                        key={`${i}_${unknown}`}
                        className={`cursor-pointer w-0 h-0 p-2 rounded-full bg-redVar1 ${props.activeIndex === i ? '' : 'opacity-[0.2]'} ${__classNames.transition}`}
                        onClick={() => {
                            swiper.slideTo(i);
                        }}
                    ></div>
                ))
            }
        </div>
    );
}

export default LandingSlideshowDots;