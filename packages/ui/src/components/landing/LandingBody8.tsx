'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { __imageAssets } from "../../assets/images/_index";
import CustomImage from "../node/CustomImage";
import GetAppButton from "./GetAppButton";
import GetApp from "./GetApp";
import NodeMayBeLink from "../node/NodeMayBeLink";
import { getCurrentYear } from "../../utils/funcs/time/present-time";
import HeadingText from "../heading/HeadingText";
import { useRef } from "react";
import { useScaleUpOnScroll } from "../motions/useScaleUpOnScroll";
import { __hashSelectors } from "../../utils/constants/querySelectors";

type headerLink = {
    label: string;
    href?: string;
    onClick?: () => void;
}
type LandingBody8Props = ComponentPrimitiveProps & {
    onProgress?: (progress: number) => void;
};

const LandingBody8 = (props: LandingBody8Props) => {
    const ref = useRef<HTMLDivElement | null>(null);
    useScaleUpOnScroll({
        targetRef: ref,
        onProgress: props.onProgress,
    });
    const footerLinks: headerLink[] = [
        {
            label: `X.com`,
            href: `#href`,
        },
        {
            label: `Instagram`,
            href: `#href`,
        },
        {
            label: `Terms of Service`,
            href: `#href`,
        },
    ];
    
    return (
        <div
            // onProgress={props.onProgress}
            ref={ref}
            id={__hashSelectors.landingPage.downloadApps}
            className={`${props.className || ''}`}
        >
            <div
                style={{backgroundImage: `url(${__imageAssets.pinkGradientPng.src})`}}
                className="md:z-[1] relative !min-h-[100dvh] min-h-[100vh] p-2 md:px-12 md:pb-6 flex flex-col justify-between bg-top bg-cover bg-no-repeat"
            >
                <div></div>
                <div className="mt-10 md:mt-24 text-center">
                    <HeadingText className="mx-auto max-w-[300px] md:max-w-[900px] [&>*]:align-middle">
                        <span>Download</span>
                        <CustomImage
                            src={`/images/app/icon-red.png`}
                            className="hidden md:inline-block mx-1 md:mx-3 w-auto h-[28px] md:h-[56px] xxl:h-[76px]"
                        />
                        <span> Talkamie App Below</span>
                    </HeadingText>
                    <div className="mt-8">
                        <div className="md:hidden mx-auto max-w-[300px]">
                            <GetAppButton
                                className="mx-auto"
                                type="ios"
                                background="dark"
                            />
                            <GetAppButton
                                className="mx-auto mt-4"
                                background="dark"
                            />
                        </div>
                        <div className="md:mt-24 hidden md:flex items-center justify-center">
                            <GetApp type="ios" />
                            <GetApp className="ml-14" />
                        </div>
                    </div>
                </div>
                <div className="md:mt-24 flex flex-col md:flex-row items-center justify-between  text-sm md:text-base">
                    <div className="flex items-center">
                        {
                            footerLinks.map((footerLink, i) => {
                                return (
                                    <NodeMayBeLink
                                        key={i}
                                        href={footerLink.href}
                                        onClick={footerLink.onClick}
                                        className={`${i > 0 ? 'pl-8' : ''}`}
                                    >
                                        {footerLink.label}
                                    </NodeMayBeLink>
                                )
                            })
                        }
                    </div>
                    <div className="mt-2 md:mt-0">
                        Created with
                        <span className="text-redVar1"> ❤ </span>
                        and
                        <span className="text-redVar1"> ☕ </span>
                        by
                        <a className="text-redVar1 ml-2 underline" href="https://charisol.io" target="_blank" rel="noopener noreferrer">Charisol.io</a>
                    </div>
                    <div className="mt-2 md:mt-0">
                        © {getCurrentYear()} Talkamie. All Rights Reserved.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingBody8;