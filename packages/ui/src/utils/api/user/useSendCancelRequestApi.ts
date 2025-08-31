// import { __apiUrls } from "../../constants/api-urls";
// import { useFetchApi } from "../useFetchApi";
// import { userProps } from "./useGetUserApi";

// type triggerProps = {
//     requesteeId: string;
// }
// type respData = {
//     user?: userProps;
// };
// type useSendCancelRequestApiProps = {
//     action?: 'send' | 'cancel';
// };

// export const useSendCancelRequestApi = (props: useSendCancelRequestApiProps) => {
//     const api = useFetchApi<respData>({
//         fallBackToastError: `could not ${props.action || 'cancel'} request`,
//     });

//     const handles = {
//         trigger: (triggerProps: triggerProps) => {
//             api.trigger({
//                 url: __apiUrls.user(triggerProps.requesteeId, ['request']),
//                 method: props.action === 'send' ? 'post' : 'delete',
//             });
//         },
//     };

//     return {
//         ...api,
//         ...handles,
//     };
// }