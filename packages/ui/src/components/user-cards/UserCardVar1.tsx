'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { useAppRoutes } from "../../utils/funcs/app-routes/useAppRoutes";
import Icon from "../icon/Icon";
import NodeMayBeLink from "../node/NodeMayBeLink";
import { userProps } from "../../utils/types/user";

type UserCardVar1Props = ComponentPrimitiveProps & {
    user: userProps;
    showViewProfileTag?: boolean;
    nameAgeSeparator?: string;
    nameAgeClassName?: string;
};

const UserCardVar1 = (props: UserCardVar1Props) => {
    const locationValue = props.user.location?.country || props.user.location?.state || props.user.location?.city;
    const routes = useAppRoutes();
    const userLink = props.user.id ? routes.user(props.user.id) : undefined;
    
    return (
        <NodeMayBeLink
            style={{
                backgroundImage: `url(${props.user.picture?.org?.url})`,
            }}
            href={!props.showViewProfileTag ? userLink : undefined}
            className={`${props.className || ''} relative overflow-hidden rounded-xl bg-blackVar1 bg-cover bg-no-repeat`}
        >
            {
                props.showViewProfileTag ?
                <NodeMayBeLink
                    href={userLink}
                    className="absolute right-3 top-3 px-4 py-[6px] bg-black/[.1] text-white font-semibold backdrop-blur-[4px] rounded-3xl border-[1px] border-white">
                    View profile
                </NodeMayBeLink> : <></>
            }
            <div className="absolute left-0 bottom-0 w-full bg-black/[.08] backdrop-blur-[4px] px-5 py-3 text-white fill-white">
                <div className={`${props.nameAgeClassName || ''} text-2xl font-bold line-clamp-2`}>
                    {props.user.name}
                    {props.user.age ? `${props.nameAgeSeparator ?? ', '} ${props.user.age}` : ``}
                </div>
                {
                    locationValue ?
                    <div className="flex items-center text-xsm">
                        <Icon iconName="GeoAlt" size={12} />
                        <span className="pl-1 line-clamp-1">{locationValue}</span>
                    </div> : <></>
                }
            </div>
        </NodeMayBeLink>
    );
}

export default UserCardVar1;