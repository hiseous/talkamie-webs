// 'use client';

// import { useEffect } from "react";
// import { authResponse, useSignInWithGoogle } from "./useSignInWithGoogle";
// import useAppleSignIn from "./useSignInWithApple";
// import { authProviderName } from "../../utils/types/global.types";

// export type authButtonResponse = authResponse & {
//     provider?: authProviderName;
// }
// export type useAuthProviderButtonsProps = {
//     onOAuthResponse?: (response: authButtonResponse) => void;
// }

// export const useAuthProviderButtons = (props?: useAuthProviderButtonsProps) => {
//     const googleHook = useSignInWithGoogle();
//     const appleHook = useAppleSignIn();

//     const handles = {
//         onOAuthResponse: (response: authButtonResponse) => {
//             if(props?.onOAuthResponse) props.onOAuthResponse(response);
//         },
//     };
    
//     useEffect(() => {
//         // if(googleHook.response.loading === false){
//         //     const localUser = googleHook.response.user;
//         //     if(localUser){
//         //         handles.onOAuthResponse(localUser, 'google');
//         //     }
//         // }
//         handles.onOAuthResponse({
//             ...googleHook.response,
//             provider: 'google',
//         });
//     }, [googleHook.response.loading]);
//     useEffect(() => {
//         // if(appleHook.response.loading === false){
//         //     const localUser = appleHook.response.user;
//         //     if(localUser){
//         //         handles.onOAuthResponse(localUser, 'apple');
//         //     }
//         // }
//         handles.onOAuthResponse({
//             ...googleHook.response,
//             provider: 'apple',
//         });
//     }, [appleHook.response.loading]);

//     return {
//         apple: appleHook,
//         google: googleHook,
//     };
// };