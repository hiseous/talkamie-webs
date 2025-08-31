// import { usePeerCall } from "../webrtc-peer-topology/usePeerCall";

import { useDashBody } from "./useDashBody";
import { useDashCallHistories } from "./useDashCallHistories";
import { useDashChats } from "./useDashChats";
import { useDashChatsUtils } from "./useDashChatsUtils";
import { useDashConnections } from "./useDashConnections";
import { useDashUserReviews } from "./useDashUserReviews";
import { useDashNavs } from "./useDashNavs";
import { useDashPendingReqs } from "./useDashPendingReqs";
import { useDashSchedules } from "./useDashSchedules";
import { useDashSchedulesUtils } from "./useDashSchedulesUtils";
import { useDashUsers } from "./useDashUsers";
import { useDashAlerts } from "./useDashAlerts";
import { useDashTransactions } from "./useDashTransactions";
import { useContinueUrl } from "./useContinueUrl";
import { useDashFaqs } from "./useDashFaqs";
import { useDashSelectedFaq } from "./useDashSelectedFaq";
import { useDashSupportTickets } from "./useDashSupportTickets";


export const useDashboardContext = () => {
    const navs = useDashNavs();
    const body = useDashBody();
    const continueUrl = useContinueUrl();

    const chatsUtils = useDashChatsUtils();
    const chats = useDashChats();
    const frequentChats = useDashChats({subpath: 'frequent'})
    const unreadChats = useDashChats({subpath: 'unread'})
    const connections = useDashConnections();
    const pendingReqs = useDashPendingReqs();

    const schedulesUtils = useDashSchedulesUtils();
    const schedules = useDashSchedules();
    const upcomingSchedules = useDashSchedules({subpath: 'upcoming'});
    const pastSchedules = useDashSchedules({subpath: 'past'});
    const volunteers = useDashUsers({type: 'volunteer'});
    const seniors = useDashUsers({type: 'senior'});
    const callHistories = useDashCallHistories();
    const localReviews = useDashUserReviews({asViewer: true});
    const alerts = useDashAlerts();

    const transactionPurchases = useDashTransactions({tab: 'purchases'});
    const transactionEarnings = useDashTransactions({tab: 'earnings'});
    const transactionWithdrawals = useDashTransactions({tab: 'withdrawals'});

    const faqs = useDashFaqs();
    const selectedFaq = useDashSelectedFaq();

    const supportTickets = useDashSupportTickets();
    
    return {
        navs,
        body,
        continueUrl,
        
        chatsUtils,
        chats,
        frequentChats,
        unreadChats,
        connections,
        pendingReqs,

        schedulesUtils,
        schedules,
        upcomingSchedules,
        pastSchedules,
        seniors,
        volunteers,
        callHistories,
        localReviews,
        alerts,

        transactionEarnings,
        transactionPurchases,
        transactionWithdrawals,

        faqs,
        selectedFaq,

        supportTickets,
    };
}