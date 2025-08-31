import { itemId } from "../../utils/types/global.types";
import { apiChatsSubpath, apiFinanceSubpath, apiSchedulesSubpath } from "../types/api";
import { __app } from "./app";

// const apiBaseDomain = `http://localhost:4000`; 
// const apiBaseDomain = 'https://test-api.talkamie.com';
// const apiBaseDomain = `10.39.0.234:4000`;
// const apiBaseDomain = `10.39.0.205:4000`;
// const apiBaseDomain = `192.168.43.10:4000`;
const apiBaseDomain = __app.stage === 'prod' ? `https://api.talkamie.com` : `https://test-api.talkamie.com`;
const __apiBaseUrl = `${apiBaseDomain}/v1`;

const appendPathToBase = (pathname: string) => `${__apiBaseUrl}${pathname}`;

export const __apiUrls = {
    auth: (
        subpaths?: (
            'sign-in' | 'sign-up' | 'sign-out' | 'refresh'
        )[]
    ) => appendPathToBase(
        `/auth${subpaths?.length ? `/${subpaths.join('/')}` : ''}`
    ),
    faqs: () => appendPathToBase(`/faqs`),
    otp: (
        subpaths?: (
            'verify'
        )[]
    ) => appendPathToBase(
        `/otp${subpaths?.length ? `/${subpaths.join('/')}` : ''}`
    ),
    
    users: () => appendPathToBase(`/users`),

    user: (
        userId: itemId,
        subpaths?: (
            'respond' | 'schedule' | 'schedules' | 'past' | 'upcoming' | 'chat'
            | 'message' | 'request' | 'background-check' | 'request' | 'connection'
            | 'accept' | 'reject' | 'password' | 'review' | 'reviews'
        )[]
    ) => appendPathToBase(
        `/user/${userId}${subpaths?.length ? `/${subpaths.join('/')}` : ''}`
    ),
    connections: (
        subpaths?: (
            'pending' | 'users'
        )[]
    ) => appendPathToBase(
        `/connections${subpaths?.length ? `/${subpaths.join('/')}` : ''}`
    ),
    interests: () => appendPathToBase(`/interests`),
    schedule: (
        scheduleId: itemId,
        subpaths?: (
            ''
        )[]
    ) => appendPathToBase(
        `/schedule${scheduleId ? `/${scheduleId}` : ``}${subpaths?.length ? `/${subpaths.join('/')}` : ''}`
    ),
    schedules: (subpaths?: apiSchedulesSubpath[]) => appendPathToBase(
        `/schedules${subpaths?.length ? `/${subpaths.join('/')}` : ''}`
    ),
    chat: (
        chatId: itemId,
        subpaths?: (
            'messages'
        )[]
    ) => appendPathToBase(
        `/chat/${chatId}${subpaths?.length ? `/${subpaths.join('/')}` : ''}`
    ),
    chats: (subpaths?: apiChatsSubpath[]) => appendPathToBase(
        `/chats${subpaths?.length ? `/${subpaths.join('/')}` : ''}`
    ),
    call: (
        callId: itemId
    ) => appendPathToBase(
        `/call/${callId}`
    ),
    calls: (
        subpaths?: (
            'histories'
        )[]
    ) => appendPathToBase(
        `/calls${subpaths?.length ? `/${subpaths.join('/')}` : ''}`
    ),
    finance: (
        subpaths?: apiFinanceSubpath[]
    ) => appendPathToBase(
        `/finance${subpaths?.length ? `/${subpaths.join('/')}` : ''}`
    ),
    reviews: () => appendPathToBase(
        `/reviews`
    ),
    signedUrls: () => appendPathToBase(
        `/signed/urls`
    ),
    availability: (
        subpaths?: (
            'custom' | 'weekly'
        )[]
    ) => appendPathToBase(
        `/availability${subpaths?.length ? `/${subpaths.join('/')}` : ''}`
    ),
    alerts: () => appendPathToBase(
        `/alerts`
    ),
    support: (
        subpaths?: (
            'open' | 'ticket'
        )[]
    ) => appendPathToBase(
        `/support${subpaths?.length ? `/${subpaths.join('/')}` : ''}`
    ),
    verification: (
        subpaths?: (
            'background'
        )[]
    ) => appendPathToBase(
        `/verification${subpaths?.length ? `/${subpaths.join('/')}` : ''}`
    ),
    webFinance: (
        subpaths?: (
            // 'subscription' |
            'session' | 'top-up'
        )[]
    ) => appendPathToBase(
        `/web/finance${subpaths?.length ? `/${subpaths.join('/')}` : ''}`
    ),

    // stunServer: `stun:stun.l.google.com:19302`,
    // stunServer1: `stun:stun1.l.google.com:19302`,
    // rtcServer: apiBaseDomain,
    // rtcPath: `/v1/rtc`,

    // webSocket: `ws://${apiDomain}`,
    // webSocket: (accessToken?: string) => `wss://your-api-id.execute-api.region.amazonaws.com/dev?accessToken=${accessToken || ''}`,
    // webSocket: (accessToken?: string) => `wss://wtgag6y208.execute-api.us-east-1.amazonaws.com/dev`,
    webSocket: () => `wss://fizcttb8g2.execute-api.us-east-1.amazonaws.com/prod/`,
};