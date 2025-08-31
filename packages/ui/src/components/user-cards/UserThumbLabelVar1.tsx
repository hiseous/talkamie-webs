'use client';

import { useAppRoutes } from "../../utils/funcs/app-routes/useAppRoutes";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { userProps } from "../../utils/types/user";
import VerifiedBadge from "../icon/VerifiedBadge";
import NodeMayBeLink from "../node/NodeMayBeLink";
import Thumb from "../thumb/Thumb";

export type UserThumbLabelVar1Props = ComponentPrimitiveProps & {
    user: userProps | undefined;
    link?: 'chat' | 'schedule' | 'user';
    hideSublabel?: boolean;
    nameClassName?: string;
}
const UserThumbLabelVar1 = (props: UserThumbLabelVar1Props) => {
    const routes = useAppRoutes();
    // const locationValue = (
    //     !props.hideSublabel ? (props.user?.location?.country || props.user?.location?.state || props.user?.location?.city)
    //     : undefined
    // );

    const href = (
        props.link === 'chat' && props.user?.viewer?.chat?.id ? routes.chat(props.user.viewer.chat.id)
        : props.link === 'chat' && props.user?.id ? routes.user(props.user.id, ['chat'])
        : props.link === 'schedule' && props.user?.id ? routes.user(props.user.id, ['schedule'])
        : props.link === 'user' && props.user?.id ? routes.user(props.user.id)
        : undefined
    );
    const userLink = (props.user?.id ? routes.user(props.user.id) : undefined);
    
    return (
        <div
            // href={href}
            className={`${props.className || ''} flex items-center hover:bg-pinkVar1 hover:text-redVar1 px-2 py-4 rounded-md`}
        >
            <NodeMayBeLink href={userLink}>
                <Thumb
                    picture={props.user?.picture}
                    size="sm"
                />
            </NodeMayBeLink>
            <NodeMayBeLink href={href} className="pl-3 flex-1">
                <div className="flex items-center">
                    <div className={`${props.nameClassName || ''} text-lg font-semibold`}>{props.user?.name}</div>
                    {
                        props.user?.verification?.verified ?
                        <VerifiedBadge className="ml-1 mt-1" type={props.user?.type} /> : <></>
                    }
                </div>
                {
                    props.user?.bio ?
                    <div className="text-grayVar8 font-semibold line-clamp-1">{props.user.bio}</div> : <></>
                }
            </NodeMayBeLink>
        </div>
    );
}

export default UserThumbLabelVar1;