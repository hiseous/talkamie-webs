'use client';

import { useEffect, useRef, useState } from "react";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import HeadingText from "../heading/HeadingText";
import { useScaleUpOnScroll } from "../motions/useScaleUpOnScroll";
import Faq from "./Faq";
import { __hashSelectors } from "../../utils/constants/querySelectors";
import { useDashFaqs } from "../dashboard-provider/useDashFaqs";

type LandingBody7Props = ComponentPrimitiveProps & {
    onProgress?: (progress: number) => void;
};

const LandingBody7 = (props: LandingBody7Props) => {
    const [openIndex, setOpenIndex] = useState<number | undefined>(undefined);
    const ref = useRef<HTMLDivElement | null>(null);
    useScaleUpOnScroll({
        targetRef: ref,
        onProgress: props.onProgress,
    });

    const faqsHook = useDashFaqs();
    useEffect(() => {
        faqsHook.get({
            pageSize: 5,
        });
    }, []);
    
    return (
        <div
            ref={ref}
            className={`${props.className || ''} px-4 py-10 md:px-0 md:py-48 !min-h-[100dvh] min-h-[100vh] bg-black text-white fill-grayVar4`}
        >
            <HeadingText className="mx-auto max-w-[860px] text-center">
                In case you missed anything.
            </HeadingText>
            <div id={__hashSelectors.landingPage.faqs} className="mt-10 md:mt-40 rounded-3xl bg-blackVar1 mx-auto max-w-[1200px] px-4 md:px-6">
                {
                    faqsHook.loading === false ?
                    <>
                        {
                            faqsHook.items?.length ?
                            <>
                                {
                                    faqsHook.items.map((faq, i) => {
                                        return (
                                            <Faq
                                                key={i}
                                                className={`py-5`}
                                                item={faq}
                                                defaultOpen={i === openIndex}
                                                onClick={() => {
                                                    setOpenIndex(i === openIndex ? undefined : i);
                                                }}
                                            />
                                        )
                                    })
                                }
                            </> :
                            <>

                            </>
                        }
                    </> :
                    faqsHook.loading ?
                    <div className="py-8 text-center italic">
                        Loading FAQs...
                    </div> :
                    <></>
                }
            </div>
        </div>
    );
}

export default LandingBody7;