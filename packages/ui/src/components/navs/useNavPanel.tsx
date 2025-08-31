'use client';

import { svgAssetName } from "../../assets/svg/SvgAsset";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import { useAppRoutes } from "../../utils/funcs/app-routes/useAppRoutes";

type nav = {
    iconName: svgAssetName;
    focusedIconName?: svgAssetName;
    label: string;
    href?: string;
    new?: boolean;
    newItemCount?: number;
}
type deviceProps = {
    navs?: nav[];
    pathNames?: string[];
}

export const useNavPanel = () => {
    const localUser = useLocalUser();
    const routes = useAppRoutes();

    const mobile: deviceProps = {
        navs: [
            {
                iconName: 'HomeDashHeart',
                focusedIconName: 'HomeDashHeartFill',
                label: 'Home',
                href: routes.dashboard(),
            },
            {
                iconName: 'Chats',
                focusedIconName: 'ChatsFill',
                label: 'Chat',
                href: routes.chats(),
                new: (localUser?.totalUnreadChats ?? 0) > 0 ? true : false,
            },
            {
                iconName: 'CalendarEmptyAlt',
                focusedIconName: 'CalendarEmptyAltFill',
                label: 'Schedules',
                href: routes.schedules(),
            },
            {
                iconName: 'LayerGroup',
                focusedIconName: 'LayerGroupFill',
                label: 'History',
                href: routes.history(),
            },
            ...(
                localUser?.id ? [
                    {
                        iconName: 'User',
                        focusedIconName: 'UserFill',
                        label: 'Account',
                        href: routes.settings(),
                    },
                ] : []
            ) as nav[],
        ],
    };
    mobile.pathNames = mobile.navs?.map(nav => nav.href ?? '');

    const desktop: deviceProps = {
        navs: [
            {
                iconName: 'HomeDashHeartFill',
                label: 'Home',
                href: routes.dashboard(),
            },
            {
                iconName: 'ChatsTextFill',
                label: 'Chat',
                href: routes.chats(),
                new: (localUser?.totalUnreadChats ?? 0) > 0 ? true : false,
            },
            {
                iconName: 'CalendarFill',
                label: 'Schedules',
                href: routes.schedules(),
            },
            {
                iconName: 'LayerGroupFill',
                label: 'History',
                href: routes.history(),
            },
            ...(
                localUser?.id ? [
                    {
                        iconName: 'NutFill',
                        label: 'Settings',
                        href: routes.settings(),
                    },
                ] : []
            ) as nav[],
        ],
    };
    desktop.pathNames = desktop.navs?.map(nav => nav.href ?? '');

    return {
        mobile,
        desktop,
    };
};