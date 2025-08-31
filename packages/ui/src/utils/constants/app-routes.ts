import { objectToQueryParams } from "../funcs/object/object-as-params";
import { apiAvailabilitySubpath, apiChatsSubpath, apiFinanceSubpath, apiSchedulesSubpath } from "../types/api";
import { accountAppRouteSubpath, settingsAppRouteSubpath } from "../types/app-routes";
import { itemId } from "../types/global.types";
import { userType } from "../types/user";


export const __routes = {
    auth: (
        subpaths?: (
            'sign-in' | 'sign-up'
        )[],
        searchParams?: {
            type?: userType;
            continue?: string;
        }
    ) => {
        const query = objectToQueryParams(searchParams);
        return `/auth${subpaths?.length ? `/${subpaths.join('/')}` : ''}${query ? `?${query}` : ``}`;
    },
    chats: (
        subpaths?: (
            'new'
        )[],
        searchParams?: {
            tab?: apiChatsSubpath,
        }
    ) => {
        const query = objectToQueryParams(searchParams);
        return `/chats${subpaths?.length ? `/${subpaths.join('/')}` : ''}${query ? `?${query}` : ``}`;
    },
    chat: (
        chatId: itemId
    ) => `/chat/${chatId}`,
    
    dashboard: () => `/`,
    history: () => `/history`,
    callHistory: (
        callHistoryId: itemId,
    ) => `/history/call/${callHistoryId}`,
    schedules: (
        subpaths?: [],
        searchParams?: {
            tab?: apiSchedulesSubpath,
        }
    ) => {
        const query = objectToQueryParams(searchParams);
        return `/schedules${subpaths?.length ? `/${subpaths.join('/')}` : ''}${query ? `?${query}` : ``}`;
    },
    schedule: (
        scheduleId: itemId,
        subpaths?: (
            'edit'
        )[]
    ) => `/schedule/${scheduleId}${subpaths?.length ? `/${subpaths.join('/')}` : ''}`,
    seniors: () => `/users`,
    volunteers: () => `/users`,
    settings: (
        subpaths?: settingsAppRouteSubpath[],
        searchParams?: {
            tab?: apiAvailabilitySubpath | apiFinanceSubpath,
        }
    ) => {
        const query = objectToQueryParams(searchParams);
        return `/settings${subpaths?.length ? `/${subpaths.join('/')}` : ''}${query ? `?${query}` : ``}`;
    },
    account: (
        subpaths?: accountAppRouteSubpath[]
    ) => `/settings/profile${subpaths?.length ? `/${subpaths.join('/')}` : ''}`,
    becomeAmie: () => `/become-amie`,
    notifications: () => `/notifications`,
    support: (
        subpaths?: (
            'messages'
        )[]
    ) => `/support${subpaths?.length ? `/${subpaths.join('/')}` : ''}`,
};