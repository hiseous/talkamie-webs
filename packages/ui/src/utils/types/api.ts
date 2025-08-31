import { itemId } from "./global.types";


export type apiSchedulesSubpath = 'past' | 'upcoming';
export type apiChatsSubpath = 'frequent' | 'unread';
export type apiAvailabilitySubpath = 'custom' | 'weekly';
export type apiFinanceSubpath = 'transactions' | `transaction/${itemId}` | 'purchases' | 'withdrawals' | 'earnings'
    | 'subscriptions' | 'withdraw'
;