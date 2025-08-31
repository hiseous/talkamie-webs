// import { __apiUrls } from "../../constants/api-urls";
// import { useFetchApi } from "../useFetchApi";
// import { userProps } from "./useGetUserApi";

// export type respondToUserRequestAction = 'accept' | 'reject';
// type triggerProps = {
//     requesterId: string;
//     action?: respondToUserRequestAction;
// }
// type respData = {
//     user?: userProps;
// };

// export const useRespondToRequestApi = () => {
//     const api = useFetchApi<respData>({
//         fallBackToastError: `could not respond to request`,
//     });

//     const handles = {
//         trigger: (triggerProps: triggerProps) => {
//             api.trigger({
//                 url: __apiUrls.user(triggerProps.requesterId, ['request', 'respond']),
//                 method: triggerProps.action === 'accept' ? 'post' : 'delete',
//             });
//         },
//     };

//     return {
//         ...api,
//         ...handles,
//     };
// }