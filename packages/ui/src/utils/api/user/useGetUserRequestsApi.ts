// import { __apiUrls } from "../../constants/api-urls";
// import { useFetchApi } from "../useFetchApi";
// import { userProps } from "./useGetUserApi";

// type triggerProps = {
//     userId: string;
// }
// type respData = {
//     items?: userProps[];
// };

// export const useGetUserRequestsApi = () => {
//     const api = useFetchApi<respData>({
//         fallBackToastError: `could not get user requests`,
//     });

//     const handles = {
//         trigger: (triggerProps: triggerProps) => {
//             api.trigger({
//                 url: __apiUrls.user(triggerProps.userId, ['requests']),
//             });
//         },
//     };

//     return {
//         ...api,
//         ...handles,
//     };
// }