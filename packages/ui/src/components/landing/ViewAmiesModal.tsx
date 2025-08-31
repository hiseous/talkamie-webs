'use client';

import ImageAsset from "../../assets/images/ImageAsset";
import { __landingPageAmies, __landingPageOtherAmieThumbImgs } from "../../utils/constants/placeholders/landing-page-amies";
import { useAppRoutes } from "../../utils/funcs/app-routes/useAppRoutes";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import Button from "../button/Button";
import ModalWrapper from "../modal/ModalWrapper";
import ViewAmieItem from "./ViewAmieItem";
import ViewAmieItemWrapper from "./ViewAmieItemWrapper";

type ViewAmiesModalProps = ComponentPrimitiveProps & {
    close?: () => void;
}
const ViewAmiesModal = (props: ViewAmiesModalProps) => {
    const routes = useAppRoutes();
    
    return (
        <ModalWrapper
            className={`${props.className || ''} md:max-w-[80%]`}
            onClose={props.close}
        >
            <ImageAsset
                name="appBrandRedPng"
                className="mt-1 md:mt-0 w-auto h-[40px] md:h-[64px] mx-auto"
            />
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {
                    __landingPageAmies.map((item, i) => {
                        return (
                            <ViewAmieItem
                                key={i}
                                item={item}
                            />
                        )
                    })
                }
                <ViewAmieItemWrapper className="bg-redVar1/[.06]">
                    <div>
                        <div className="ml-4 flex flex-wrap">
                            {
                                __landingPageOtherAmieThumbImgs.map((imgUrl, i) => {
                                    const isLast = (i === __landingPageOtherAmieThumbImgs.length - 1);
                                    return (
                                        <div
                                            key={i}
                                            style={{
                                                backgroundImage: `url(${imgUrl})`,
                                            }}
                                            className={`
                                                w-14 h-14 rounded-full bg-cover shrink-0 -ml-4 mb-2 overflow-hidden
                                                border-[1px] border-redVar1
                                            `}
                                        >
                                            {
                                                isLast ?
                                                <div className="w-full h-full bg-white/[.8] flex items-center justify-center text-redVar1 font-semibold">
                                                    +200
                                                </div> : undefined
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="text-redVar1 font-semibold text-2xl">
                            Over 200 Friendly Amies can't wait to meet you!
                        </div>
                    </div>
                    <Button
                        theme="red-gradient"
                        className="mt-4 w-full block text-center font-medium"
                        href={routes.auth(['sign-up'], {type: 'senior'})}
                    >
                        Get Started
                    </Button>
                </ViewAmieItemWrapper>
            </div>
        </ModalWrapper>
    );
}

export default ViewAmiesModal;