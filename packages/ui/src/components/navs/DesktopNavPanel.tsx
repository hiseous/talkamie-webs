'use client';

import ImageAsset from "../../assets/images/ImageAsset";
import SvgAsset from "../../assets/svg/SvgAsset";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { useAppRoutes } from "../../utils/funcs/app-routes/useAppRoutes";
import SignInOrOutButton from "../button/SignInOrOutButton";
import RedDot from "../icon/RedDot";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import NodeMayBeLink from "../node/NodeMayBeLink";
import Thumb from "../thumb/Thumb";
import { useNavPanel } from "./useNavPanel";
import { useClosestPathnames } from "../../utils/funcs/hooks/useClosestPathnames";

type DesktopNavPanelProps = ComponentPrimitiveProps & {
    
};

const DesktopNavPanel = (props: DesktopNavPanelProps) => {
    const hook = useNavPanel();
    const localUser = useLocalUser();
    const routes = useAppRoutes();
    const closestPaths = useClosestPathnames({pathnames: hook.desktop.pathNames});
    
    return (
        <div className={`${props.className || ''} flex flex-col items-center justify-between`}>
            <div className="flex flex-col items-center">
                <div className="w-10 h-10 flex items-center rounded-full bg-redVar1">
                    <ImageAsset
                        name="soulMatesWhitePng"
                        className="mx-auto w-auto h-6"
                    />
                </div>
                <div className="mt-6">
                    {
                        hook.desktop.navs?.map((nav, i) => {
                            const isThisLocation = closestPaths.isThisLocation(nav.href);
                            return (
                                <NodeMayBeLink
                                    key={i}
                                    href={nav.href}
                                    // onClick={nav.onClick}
                                    className={`flex flex-col items-center text-sm font-medium
                                        ${isThisLocation ? `text-redVar1 fill-redVar1` : `text-grayVar8 fill-grayVar8`}
                                        ${i > 0 ? 'mt-4' : ''}
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
                                                    size={32}
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
            </div>
            <div className="mt-14 flex flex-col items-center">
                <NodeMayBeLink
                    href={localUser?.id ? routes.account() : undefined}
                    className="flex flex-col items-center"
                >
                    <Thumb
                        picture={localUser?.picture}
                    />
                    <div className="line-clamp-2 text-center text-sm text-grayVar9">
                        {localUser?.name}
                    </div>
                </NodeMayBeLink>
                <SignInOrOutButton className="mt-4" />
            </div>
        </div>
    );
}

export default DesktopNavPanel;