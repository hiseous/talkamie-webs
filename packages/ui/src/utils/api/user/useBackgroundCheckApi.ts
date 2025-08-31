// import { useLocalUser } from "../../../components/local-user-provider/useLocalUser";
// import { __apiUrls } from "../../constants/api-urls";
// import { useFetchApi } from "../useFetchApi";

// export type backgroundCheckForm = {
//     dob?: string;
//     state?: string;
//     links?: string[];
// }
// type triggerProps = {
//     body: backgroundCheckForm;
// }
// // type respData = userProps;

// export const useBackgroundCheckApi = () => {
//     const api = useFetchApi({
//         fallBackToastError: `could not check backgound`,
//     });
//     const localUserId = useLocalUser()?.id;

//     const handles = {
//         trigger: (triggerProps: triggerProps) => {
//             if(localUserId){
//                 api.trigger({
//                     url: __apiUrls.user(localUserId, ['background-check']),
//                     method: 'post',
//                     body: triggerProps.body,
//                 });
//             }
//             else {
//                 api.toastError(`Please, sign in or sign up for an account.`);
//             }
//         },
//     };

//     return {
//         ...api,
//         ...handles,
//     };
// }