import { financeTierNumber, financeTierPeriodicRate, subscriptionPlanProps } from "../../types/finance";
import { roundNumber } from "../digit/round-number";

type benefitProps = {
    title?: string;
    text?: string;
}
type nodeProps = {
    price?: number;
    originalPrice?: number;
    title?: string;
    tier?: financeTierNumber;
    benefits?: benefitProps[];
}
export const fromSubscriptionPlan = (plan: subscriptionPlanProps, periodicRate: financeTierPeriodicRate) => {
    const node: nodeProps = {
        tier: plan.tier,
    };
    if(periodicRate === 'monthly'){
        node.price = (
            plan.periodicRates?.monthly?.amount ?
            roundNumber(plan.periodicRates.monthly.amount / 100, 2) :
            undefined
        );
        node.originalPrice = (
            plan.periodicRates?.monthly?.originalAmount ?
            roundNumber(plan.periodicRates.monthly.originalAmount / 100, 2) :
            undefined
        );
    }
    else {
        node.price = (
            plan.periodicRates?.yearly?.amount ?
            roundNumber(plan.periodicRates.yearly.amount / 100, 2) :
            undefined
        );
        node.originalPrice = (
            plan.periodicRates?.yearly?.originalAmount ?
            roundNumber(plan.periodicRates.yearly.originalAmount / 100, 2) :
            undefined
        );
    }

    if(plan.tier === 1){
        node.title = `Care Plus`;
        node.benefits = [
            {
                title: `Extended Call Time`,
                text: `Unlimited calls, each up to 40 minutes.`,
            },
            {
                title: `Priority Matching`,
                text: `Get matched with companions based on detailed preferences.`,
            },
            {
                title: `Unlimited Chatting`,
                text: `Engage in text-based conversations with companions.`,
            },
            {
                title: `Recurring Calls`,
                text: `Schedule regular interactions with your favorite companions.`,
            },
            {
                title: `Enhanced Support`,
                text: `Access to FAQs and email support only.`,
            },
        ];
    }
    else if(plan.tier === 2){
        node.title = `Care Premium`;
        node.benefits = [
            {
                title: `Unlimited Call Time`,
                text: `Unlimited calls, each up to 40 minutes.`,
            },
            {
                title: `Premium Matching`,
                text: `Get personalized high-profile matching based your specific needs.`,
            },
            {
                title: `Unlimited Chatting`,
                text: `Engage in text-based conversations with companions.`,
            },
            {
                title: `Recurring Calls`,
                text: `Schedule regular interactions with your favorite companions.`,
            },
            {
                title: `Instant Calls`,
                text: `Connect immediately with your companion whenever you need.`,
            },
            // {
            //     title: `Exclusive Events`,
            //     text: `Access special group calls and activities.`,
            // },
            {
                title: `Wellness Check-Ins`,
                text: `Regular updates and check-ins to ensure your well-being.`,
            },
            {
                title: `Premium Support`,
                text: `24/7 live chat and phone support for immediate assistance.`,
            },
        ];
    }
    else {
        //free plan;
        node.title = `Care Basic`;
        node.benefits = [
            {
                title: `Limited Call Time`,
                text: `Enjoy 2-3 calls per week, each lasting up to 15 minutes.`,
            },
            {
                title: `Basic Matching`,
                text: `Connect with companions based on general preferences.`,
            },
            {
                title: `Unlimited Chatting`,
                text: `Engage in text-based conversations with companions.`,
            },
            {
                title: `Basic Support`,
                text: `Access to FAQs and email support only.`,
            },
        ];
    }

    return node;
};