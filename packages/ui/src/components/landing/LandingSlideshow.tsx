// 'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import LandingSlide1 from './LandingSlide1';
import LandingSlide3 from './LandingSlide3';
import { useRef, useState } from 'react';
import { useScaleUpOnScroll } from '../motions/useScaleUpOnScroll';
import LandingSlideshowDots from './LandingSlideshowDots';

type states = {
    activeIndex?: number;
    isBeginning?: boolean;
    isEnd?: boolean;
}
type LandingSlideshowProps = ComponentPrimitiveProps & {
    onProgress?: (progress: number) => void;
};

const LandingSlideshow = (props: LandingSlideshowProps) => {
    const ref = useRef<HTMLDivElement | null>(null);
    useScaleUpOnScroll({
        targetRef: ref,
        onProgress: props.onProgress,
    });
    const [states, setStates] = useState<states>({
        activeIndex: 0,
        isBeginning: true,
    });

    const handles = {
        getSlides: () => {
            return ([
                <LandingSlide1 />,
                // <LandingSlide2 />,
                <LandingSlide3 />,
            ])
        },
    };
    
    return (
        <div
            ref={ref}
            className={`${props.className || ''} px-4 md:px-0 relative z-[0] py-20`}
        >
            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                centeredSlides
                centerInsufficientSlides
                onSlideChange={(swiper) => {
                    setStates(prev => ({
                        ...prev,
                        activeIndex: swiper.activeIndex,
                        isBeginning: swiper.isBeginning,
                        isEnd: swiper.isEnd,
                    }))
                }}
                onSwiper={(swiper) => console.log(swiper)}
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                className="!h-full [&>.swiper-wrapper]:items-center"
            >
                {
                    handles.getSlides().map((slide, i) => (
                        <SwiperSlide key={i} className="md:px-4 lg:px-10">
                            {slide}
                        </SwiperSlide>
                    ))
                }
                {/* <LandingSlideshowButtons
                    isBeginning={states.isBeginning}
                    isEnd={states.isEnd}
                    className="mt-4"
                    activeIndex={states.activeIndex ?? 0}
                /> */}
                <LandingSlideshowDots
                    className="mt-6 md:mt-8 xl:mt-12"
                    length={handles.getSlides().length}
                    activeIndex={states.activeIndex ?? 0}
                />
            </Swiper>
        </div>
    );
}

export default LandingSlideshow;