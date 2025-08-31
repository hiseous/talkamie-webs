'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { useLandingPage } from "./useLandingPage";
import Header from "./Header";
import LandingBody1 from "./LandingBody1";
import LandingBody2 from "./LandingBody2";
import LandingBody8 from "./LandingBody8";
import LandingBody5 from "./LandingBody5";
import WhatWillYouLikeToDo from "./WhatWillYouLikeToDo";
import BringingYouJoy from "./BringingYouJoy";

type LandingPageProps = ComponentPrimitiveProps & {
    
};

const LandingPage = (props: LandingPageProps) => {
    const hook = useLandingPage();
    
    return (
        <div
            className={`${props.className || ''} relative`}
        >
            <div className="sticky top-2 z-[1] mx-2">
                <Header
                    theme={hook.headerTheme}
                    type="senior"
                    className="px-4 py-5 md:px-10 md:py-4 absolute w-full top-0 left-0"
                />
            </div>
            <LandingBody1 //ongoing virtual companiounship for seniors;
                onProgress={hook.onProgress}
            />
            <LandingBody2 //who are the amies;
                onProgress={(progress) => hook.onProgress(progress, true)}
                className="pt-20 md:pt-48"
            />
            <WhatWillYouLikeToDo
                className="pt-20 md:pt-48"
            />
            <BringingYouJoy
                // onProgress={(progress) => hook.onProgress(progress, true)}
                className="mt-10 md:mt-48"
            />
            {/* <LandingBody3
                onProgress={hook.onProgress}
                className={`mt-20 md:mt-36`}
            /> */}
            {/* <LandingSlideshow
                onProgress={(progress) => hook.onProgress(progress, true)}
                className="mt-10 md:mt-16"
             /> */}
            {/* <LandingBody4
                // onProgress={(progress) => hook.onProgress(progress, true)}
                className="mt-10 md:mt-48"
            /> */}
            <LandingBody5
                onProgress={hook.onProgress}
                className=""
            />
            {/* <LandingBody6
                onProgress={(progress) => hook.onProgress(progress, true)}
                className="mt-20 md:mt-20"
            /> */}
            {/* <LandingBody7
                onProgress={hook.onProgress}
                className="mt-10 md:mt-36"
            /> */}
            <LandingBody8
                onProgress={(progress) => hook.onProgress(progress, true)}
            />
        </div>
    );
}

export default LandingPage;