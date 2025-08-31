'use client';

import { useEffect } from "react";
import NodeMayBeLink from "../node/NodeMayBeLink";
import { usePopUp } from "./usePopUpContext";
import ModalUnderlay from "../modal/ModalUnderlay";
import { usePathname } from "next/navigation";

const PopUp = () => {
    const pathname = usePathname();
    const popUp = usePopUp();

    useEffect(() => {
        if(popUp?.nodes?.length) popUp.reset();
    }, [pathname]);

    return (
        <>
            {
                popUp?.nodes?.map((node, i) => {
                    return (
                        <ModalUnderlay
                            key={i}
                            {...popUp?.underlay.props}
                            className={`${popUp.underlay.props?.className ?? ''} z-[2] flex flex-col items-center justify-center`}
                        >
                            <NodeMayBeLink
                                className={`block w-full h-full absolute cursor-pointer`}
                                href={popUp.underlay.props?.href}
                                onClick={() => {
                                    if(popUp.underlay.props?.onClick) popUp.underlay.props.onClick();
                                    popUp.popNode();
                                }}
                            ></NodeMayBeLink>
                            {node}
                        </ModalUnderlay>
                    )
                })
            }
            {/* {
                popUp?.nodes?.length &&
                <ModalUnderlay
                    {...popUp?.underlay.props}
                    className={`${popUp.underlay.props?.className ?? ''} z-[1] flex flex-col items-center justify-center`}
                >
                    <NodeMayBeLink
                        className={`block w-full h-full absolute cursor-pointer`}
                        href={popUp.underlay.props?.href}
                        onClick={() => {
                            if(popUp.underlay.props?.onClick) popUp.underlay.props.onClick();
                            popUp.reset();
                        }}
                    ></NodeMayBeLink>
                    {popUp?.nodes}
                </ModalUnderlay>
            } */}
        </>
    );
}

export default PopUp;