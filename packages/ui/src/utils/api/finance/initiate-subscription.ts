// import { __apiUrls } from "../../constants/api-urls";
// import { financeTierNumber, financeTierPeriodicRate } from "../../types/finance";
// import { itemId } from "../../types/global.types";
// import { useFetchApi, useFetchApiProps } from "../useFetchApi";


// export type initiateSubscriptionTriggerProps = {
//     body: {
//         tier?: financeTierNumber;
//         periodicRate?: financeTierPeriodicRate;
//         recurring?: boolean;
//         transactionId?: itemId;
//     };
// }
// export type initiateSubscriptionRespData = {
//     session?: {
//         id?: string;
//         url?: string;
//     };
//     transaction?: {
//         id?: itemId;
//     };
// }

// export const useInitiateSubscriptionApi = (props?: useFetchApiProps) => {

//     const api = useFetchApi<initiateSubscriptionRespData>({
//         ...props,
//         fallBackToastError: `could not initiate subscription session`,
//     });
    
//     const handle = {
//         trigger: (triggerProps: initiateSubscriptionTriggerProps) => {
//             api.trigger({
//                 url: __apiUrls.webFinance(['subscription', 'session']),
//                 body: triggerProps.body,
//                 method: 'post',
//             });
//         },
//     };
    
//     return {
//         ...api,
//         ...handle,
//     };
// }