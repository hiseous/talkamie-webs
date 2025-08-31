'use client';

import SvgAsset from "../../assets/svg/SvgAsset";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import RedDot from "../icon/RedDot";
import NodeMayBeLink from "../node/NodeMayBeLink";
import { useNavPanel } from "./useNavPanel";
import { useClosestPathnames } from "../../utils/funcs/hooks/useClosestPathnames";

type MobileNavPanelProps = ComponentPrimitiveProps & {
    
};

const MobileNavPanel = (props: MobileNavPanelProps) => {
    const hook = useNavPanel();
    const closestPaths = useClosestPathnames({pathnames: hook.mobile.pathNames});
    
    return (
        <div
            className={`${props.className || ''} flex items-center justify-center [&>*]:flex-1`}
        >
            {
                hook.mobile.navs?.map((nav, i) => {
                    const isThisLocation = closestPaths.isThisLocation(nav.href);
                    return (
                        <NodeMayBeLink
                            key={i}
                            href={nav.href}
                            // onClick={nav.onClick}
                            className={`flex flex-col items-center text-xxsm
                                ${isThisLocation ? `text-redVar1 fill-redVar1` : ``}
                            `}
                        >
                            {
                                nav.iconName ?
                                <div
                                    className={`w-[fit-content] h-[fit-content] box-content rounded-full`}
                                >
                                    <div className="relative">
                                        <SvgAsset
                                            name={
                                                isThisLocation && nav.focusedIconName ? nav.focusedIconName : nav.iconName
                                            }
                                            className=""
                                        />
                                        {
                                            nav.new ? <RedDot className={`absolute top-[-6px] right-[-3px] ${isThisLocation ? '!border-blue50 dark:!border-gray700' : ''}`} /> : <></>
                                        }
                                    </div>
                                </div> :
                                <></>
                            }
                            <div>
                                {
                                    typeof nav.label === 'string' ?
                                    <div className="mt-[6px] line-clamp-1">{nav.label}</div> :
                                    nav.label
                                }
                            </div>
                        </NodeMayBeLink>
                    )
                })
            }
        </div>
    );
}

export default MobileNavPanel;