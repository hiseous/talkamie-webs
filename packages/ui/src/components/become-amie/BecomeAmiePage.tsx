'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import Header from "../landing/Header";
import LandingBody2 from "../landing/LandingBody2";
import LandingBody6 from "../landing/LandingBody6";
import LandingBody7 from "../landing/LandingBody7";
import LandingBody8 from "../landing/LandingBody8";
import LandingBodyPaddingWrapper from "../landing/LandingBodyPaddingWrapper";
import { useLandingPage } from "../landing/useLandingPage";
import Body1 from "./Body1";
import Body3 from "./Body3";

type BecomeAmiePageProps = ComponentPrimitiveProps & {
    
};

const BecomeAmiePage = (props: BecomeAmiePageProps) => {
    const hook = useLandingPage();
    
    return (
        <div
            className={`${props.className || ''} relative`}
        >
            <div className="sticky top-2 z-[1] mx-2">
                <Header
                    theme={hook.headerTheme}
                    type="volunteer"
                    className="px-4 py-5 md:px-10 md:py-4 absolute w-full top-0 left-0"
                />
            </div>
            <Body1
                onProgress={hook.onProgress}
            />
            <LandingBody2 //who are the seniors;
                onProgress={(progress) => hook.onProgress(progress, true)}
                className="pt-20 md:pt-48"
                type="senior"
            />
            <LandingBodyPaddingWrapper>
                <Body3
                    onProgress={hook.onProgress}
                    className={`mt-20 md:mt-36`}
                />
            </LandingBodyPaddingWrapper>
            <LandingBody6
                onProgress={(progress) => hook.onProgress(progress, true)}
                className="mt-20 md:mt-20"
            />
            <LandingBody7
                onProgress={hook.onProgress}
                className="mt-10 md:mt-20"
            />
            <LandingBody8
                onProgress={(progress) => hook.onProgress(progress, true)}
            />
        </div>
    );
}

export default BecomeAmiePage;