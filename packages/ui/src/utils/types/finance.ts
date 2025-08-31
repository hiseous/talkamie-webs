import { itemId } from "./global.types";
import { isoDateTime } from "./time";


export type financeTierNumber = 1 | 2;
export type financeTierPeriodicRate = 'monthly' | 'yearly';

export type subscriptionPlanProps = {
    name?: string;
    periodicRates?: {
        [key in financeTierPeriodicRate]?: {
            amount?: number; //in US cents;
            originalAmount?: number; //in cents;
        }
    };
    tier?: financeTierNumber;
}

export type transactionProps = {
    id?: itemId;
    type?: 'purchase' | 'earning' | 'withdrawal';
    intent?: 'top-up' | 'subscription' | 'withdraw';
    status?: (
        'pending' // transaction initiated, third-party hasn't processed yet;
        | 'processing' // third-party is processing it;
        | 'succeeded' //	Payment completed successfully
        | 'failed' //	Payment failed due to card error, insufficient funds, etc.
        | 'canceled' //	Subscription or payment was canceled before or after processing
        | 'incomplete' //	Stripe started the process but did not receive full payment (e.g., 3DS fail)
        | 'refunded' //	Full or partial refund issued
        | 'expired' //	Payment session expired (e.g., user didn't complete checkout)
    );
    funds?: {
        amount?: number; //in US cents;
        currency?: string;
    };
    coins?: {
        amount?: number;
    };
    timestamp?: isoDateTime;
}