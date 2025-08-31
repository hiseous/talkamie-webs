'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import VerifiedBadge from "../icon/VerifiedBadge";
import { userProps } from "../../utils/types/user";
import RatingStars from "../node/RatingStars";
import NodeMayBeLink from "../node/NodeMayBeLink";
import { useAppRoutes } from "../../utils/funcs/app-routes/useAppRoutes";

type UserNameAgeBadgeProps = ComponentPrimitiveProps & {
    user: userProps | undefined;
    nameAgeSeparator?: string;
    nameAgeClassName?: string;
    showRating?: boolean;
};

const UserNameAgeBadge = (props: UserNameAgeBadgeProps) => {
    const routes = useAppRoutes();
    
    return (
        <div className={`${props.className || ''} flex`}>
            <div>
                <NodeMayBeLink
                    href={props.user?.id ? routes.user(props.user.id) : undefined}
                    className={`${props.nameAgeClassName || ''} text-2xl font-bold line-clamp-2`}
                >
                    {props.user?.name}
                    {props.user?.age ? `${props.nameAgeSeparator ?? ', '} ${props.user.age}` : ``}
                </NodeMayBeLink>
                {
                    props.showRating && props.user?.rating ?
                    <RatingStars
                        rating={props.user.rating}
                        className="mt-2"
                    /> : <></>
                }
            </div>
            {
                props.user?.verification?.verified ?
                <VerifiedBadge className="mt-1" type={props.user.type} /> : <></>
            }
        </div>
    );
}

export default UserNameAgeBadge;