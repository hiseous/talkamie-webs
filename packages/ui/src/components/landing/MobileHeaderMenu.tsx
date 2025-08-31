import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { __landingPageHeaderLinks } from "../../utils/constants/header/_index";
import NodeMayBeLink from "../node/NodeMayBeLink";
import { userType } from "../../utils/types/user";
// import { motion } from "motion/react";

export type headerTheme = 'dark' | 'light';
type MobileHeaderMenuProps = ComponentPrimitiveProps & {
    type: userType;
};

const MobileHeaderMenu = (props: MobileHeaderMenuProps) => {
    
    return (
        <div
            className={`${props.className || ''} bg-white text-black font-semibold w-full px-4 rounded-3xl text-lg`}
        >
            <div>
                {
                    __landingPageHeaderLinks(props.type).map((headerLink, i) => {
                        return (
                            <NodeMayBeLink
                                key={i}
                                href={headerLink.href}
                                onClick={headerLink.onClick}
                                className={`block py-5`}
                            >
                                {headerLink.label}
                            </NodeMayBeLink>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default MobileHeaderMenu;