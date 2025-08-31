'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { __app } from "../../utils/constants/app";
import Button from "../button/Button";
import NodeMayBeLink from "../node/NodeMayBeLink";
import { __classNames } from "../../utils/constants/classNames";
import { useAppRoutes } from "../../utils/funcs/app-routes/useAppRoutes";
import { __landingPageHeaderLinks } from "../../utils/constants/header/_index";
import MobileHeaderMenu from "./MobileHeaderMenu";
import IconWrapper from "../icon/IconWrapper";
import BlandDropdown from "../dropdown/BlandDropdown";
import CustomImage from "../node/CustomImage";
import { userType } from "../../utils/types/user";
import { __hashSelectors } from "../../utils/constants/querySelectors";
// import { motion } from "motion/react";

export type headerTheme = 'dark' | 'light';
type HeaderProps = ComponentPrimitiveProps & {
    // bgIsWhite?: boolean;
    theme?: headerTheme;
    type: userType;
};

const Header = (props: HeaderProps) => {
    const routes = useAppRoutes();
    const themeIsDark = props.theme === 'dark';
    // const bgIsWhite = props.theme === 'white';
    // const bgIsWhite = props.bgIsWhite;
    
    return (
        <div className="relative">
            <div
                className={`${props.className || ''} ${themeIsDark ? 'border-black stroke-black' : 'text-white fill-white border-white stroke-white'} ${__classNames.transition}
                    backdrop-blur-md rounded-[80px] shadow-xl shadow-black/[.08]
                `}
            >
                <div className="relative flex items-center justify-between xl:hidden">
                    <div className="text-xl font-semibold flex items-center">
                        <BlandDropdown
                            className="!static"
                            handle={{
                                children: <>
                                    <IconWrapper
                                        svgAssetName="Hamburger"
                                        iconSize={32}
                                        className="mr-1"
                                    />
                                </>,
                            }}
                            renderMenu={(renderProps) => {
                                return ({
                                    // className: '!w-[calc(100vw-48px)] mt-4',
                                    className: 'w-full mt-4',
                                    children: <>
                                        <MobileHeaderMenu
                                            type={props.type}
                                            // className="absolute top-[calc(100%+84px)]"
                                        />
                                    </>,
                                    onClick: () => {
                                        if(renderProps.closeMenu) renderProps.closeMenu();
                                    },
                                })
                            }}
                        />
                        <NodeMayBeLink href="/">
                            {__app.name}
                        </NodeMayBeLink>
                    </div>
                    <div className="text-white">
                        <NodeMayBeLink
                            href={routes.auth(['sign-in'])}
                            className="bg-white text-redVar1 rounded-3xl px-8 py-3 font-medium"
                        >Get started</NodeMayBeLink>
                        <div>

                        </div>
                    </div>
                </div>
                <div className="hidden xl:flex items-center justify-between">
                    <div className="flex items-center font-medium xl:text-xl">
                        {
                            __landingPageHeaderLinks(props.type).map((headerLink, i) => {
                                return (
                                    <NodeMayBeLink
                                        key={i}
                                        href={headerLink.href}
                                        onClick={headerLink.onClick}
                                        className={`${i > 0 ? 'pl-8' : ''}`}
                                    >
                                        {headerLink.label}
                                    </NodeMayBeLink>
                                )
                            })
                        }
                    </div>
                    <NodeMayBeLink href="/" className="flex items-center uppercase text-xl font-bold">
                        <CustomImage
                            src={`/images/app/icon-red.png`}
                            // src={`/images/app/icon-${themeIsDark ? 'white' : 'red'}.png`}
                            className="w-auto h-[28px] xl:h-[44px] xxl:h-[64px]"
                        />
                        <div className="pl-2 xxl:pl-0 xl:text-2xl xxl:text-[2.45rem]">{__app.name}</div>
                    </NodeMayBeLink>
                    <div className="flex items-center">
                        <Button
                            href={`#${__hashSelectors.landingPage.downloadApps}`}
                            className={`font-semibold rounded-[40px] px-8 xl:py-6 xl:rounded-full xl:text-xl flex items-center border-[2px] ${themeIsDark ? 'border-black hover:bg-white' : 'border-white hover:bg-black'} ${__classNames.transition}`}
                        >
                            <div>Get the App</div>
                        </Button>
                        <Button
                            href={routes.auth(['sign-in'])}
                            theme={themeIsDark ? 'red' : 'white'}
                            className={`block ml-3 font-semibold rounded-[40px] px-9 xl:py-6 xl:rounded-full xl:text-xl`}
                        >
                            Get Started
                        </Button>
                    </div>
                </div>
            </div>
            {/* <MobileHeaderMenu
                className="absolute top-[calc(100%+84px)]"
            /> */}
        </div>
    );
}

export default Header;