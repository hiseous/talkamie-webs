// import { __apiUrls } from "../../constants/api-urls";
// import { useFetchApi, useFetchApiProps } from "../useFetchApi";

// export const useCancelSubscriptionApi = (props?: useFetchApiProps) => {

//     const api = useFetchApi({
//         ...props,
//         fallBackToastError: `could not cancel subscription`,
//     });
    
//     const handle = {
//         trigger: () => {
//             api.trigger({
//                 url: __apiUrls.webFinance(['subscription']),
//                 method: 'delete',
//             });
//         },
//     };
    
//     return {
//         ...api,
//         ...handle,
//     };
// }