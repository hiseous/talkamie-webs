'use client';

import { useLocalUser } from "../../../components/local-user-provider/useLocalUser";
import { itemId } from "../../../utils/types/global.types";
import { __routes } from "../../constants/app-routes";
import { accountAppRouteSubpath } from "../../types/app-routes";

export const useAppRoutes = () => {
    const localUser = useLocalUser();

    const routes = {
        ...__routes,
        user: (
            userId: itemId,
            subpaths?: (
                'schedule' | 'chat' | 'reviews'
            )[]
        ) => {
            return (
                (!subpaths?.length || subpaths?.includes('reviews')) && localUser?.isMe(userId) ?
                routes.account(subpaths?.length as (accountAppRouteSubpath[] | undefined)) :
                `/user/${userId}${subpaths?.length ? `/${subpaths.join('/')}` : ''}`
            );
        },
    };

    return {
        ...routes,
    };
};