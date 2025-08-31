'use client';

import { userProps } from "../../utils/types/user";
import { useDashboard } from "../dashboard-provider/useDashboard";

type useUserProfileCardProps = {
    user: userProps;
    updateUser?: (newProps?: userProps) => void;
}
export const useUserProfileCard = (props: useUserProfileCardProps) => {
    const dashboard = useDashboard();

    const handles = {
        updateUser: (userProps?: Partial<userProps>) => {
            if(props.updateUser) props.updateUser(userProps);
            if(userProps?.viewer?.chat?.id){
                dashboard?.chats.updateChatPropsOnly(userProps.viewer.chat.id, userProps.viewer.chat);
            }
        },
    };

    return {
        ...handles,
        // user: props.user,
    };
};