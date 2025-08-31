'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import IconWrapper from "../icon/IconWrapper";
import { svgAssetName } from "../../assets/svg/SvgAsset";
import { iconName } from "../icon/Icon";
import { useState } from "react";
import { __classNames } from "../../utils/constants/classNames";

type ConnectInputModalProps = ComponentPrimitiveProps & {
    title: string;
    subTitle: string | undefined;
    svgAssetName?: svgAssetName;
    iconName?: iconName;
    children?: React.ReactNode;
};

const ConnectInputModal = (props: ConnectInputModalProps) => {
    const [open, setOpen] = useState(false);
    
    return (
        <div className={`${props.className || ''}
                rounded-md border-[1.5px] border-whiteVar2 px-4 py-3
            `}
        >
            <div
                onClick={() => {
                    if(props.children) setOpen(!open);
                }}
                className="flex items-center justify-between cursor-pointer"
            >
                <div className="flex items-center">
                    <IconWrapper
                        iconName={props.iconName}
                        svgAssetName={props.svgAssetName}
                        className="p-3 bg-pinkVar1 rounded-lg fill-redVar1"
                    />
                    <div className="pl-4">
                        <div className="font-medium">{props.title}</div>
                        <div className="text-redVar1">{props.subTitle || `__`}</div>
                    </div>
                </div>
                {
                    props.children ?
                    <IconWrapper
                        iconName="ChevronDown"
                        className={`${__classNames.transition} ${open ? 'rotate-180' : ''}`}
                    /> : <></>
                }
            </div>
            {
                open ?
                <div className="mt-2">
                    {props.children}
                </div> : <></>
            }
        </div>
    );
}

export default ConnectInputModal;