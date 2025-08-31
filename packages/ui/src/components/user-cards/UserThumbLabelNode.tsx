'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import Thumb, { ThumbProps } from "../thumb/Thumb";
import UserNameAgeBadge from "../user-cards/UserNameAgeBadge";
import { userProps } from "../../utils/types/user";
import { useAppRoutes } from "../../utils/funcs/app-routes/useAppRoutes";

type UserThumbLabelNodeProps = ComponentPrimitiveProps & {
    user: userProps | undefined;
    showRating?: boolean;
    leadingNode?: React.ReactNode;
    thumbSize?: ThumbProps['size'];
};

const UserThumbLabelNode = (props: UserThumbLabelNodeProps) => {
    const routes = useAppRoutes();
    
    return (
        <div className={`${props.className || ''} flex justify-between items-center flex-wrap`}>
            <div
                className="flex-1 flex items-center"
            >
                <Thumb
                    href={props.user?.id ? routes.user(props.user.id) : undefined}
                    picture={props.user?.picture}
                    size={props.thumbSize ?? 'md'}
                />
                <UserNameAgeBadge
                    user={props.user}
                    className="pl-2"
                    showRating={props.showRating}
                />
            </div>
            {props.leadingNode}
        </div>
    );
}

export default UserThumbLabelNode;