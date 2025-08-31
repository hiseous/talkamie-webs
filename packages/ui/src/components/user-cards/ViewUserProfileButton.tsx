'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { useAppRoutes } from "../../utils/funcs/app-routes/useAppRoutes";
import NodeMayBeLink from "../node/NodeMayBeLink";
import { usePopUp } from "../pop-up-provider/usePopUpContext";
import UserProfileCardModal from "../user-profile/UserProfileCardModal";
import { userProps } from "../../utils/types/user";

type ViewUserProfileButtonProps = ComponentPrimitiveProps & {
    user?: userProps;
    label?: string;
    type?: 'link' | 'pop-up';
    updateUser?: (userProps?: Partial<userProps>) => void;
};

const ViewUserProfileButton = (props: ViewUserProfileButtonProps) => {
    const routes = useAppRoutes();
    const popUp = usePopUp();
    const userLink = (
        props.type === 'link' && props.user?.id ? routes.user(props.user.id) : undefined
    );
    
    return (
        <NodeMayBeLink
            href={userLink}
            onClick={() => {
                if(props.type === 'pop-up'){
                    popUp?.set({
                        nodes: [
                            <>
                                <UserProfileCardModal
                                    defaultUser={props.user}
                                    updateUser={props.updateUser}
                                    // onRequestAccepted={props.onRequestAccepted}
                                />
                            </>,
                        ],
                    });
                }
            }}
            className={`${props.className || ''}
                cursor-pointer absolute right-3 top-3 px-8 py-3 bg-white text-black font-semibold backdrop-blur-[12px] rounded-full border-[1px] border-blackVar5
            `}
        >
            {props.label || 'View profile'}
        </NodeMayBeLink>
    );
}

export default ViewUserProfileButton;