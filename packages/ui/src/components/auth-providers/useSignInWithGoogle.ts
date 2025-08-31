// 'use client';

// import { useGoogleLogin } from "@react-oauth/google";
// import axios from "axios";
// import { useState } from "react";

// export type authResponse = {
//     error?: string;
//     success?: boolean;
//     loading?: boolean;
//     user?: {
//         email?: string;
//         emailVerified?: string;
//         name?: string;
//         pictureSrc?: string;
//         token?: string;
//     };
// }
// export const useSignInWithGoogle = () => {
//     const [response, setResponse] = useState<authResponse>({});

//     const login = useGoogleLogin({
//         // flow: 'implicit',
//         scope: "openid profile email",
//         onError: () => {
//             const error = 'an error occurred';
//             setResponse({
//                 error,
//                 loading: false,
//             });
//         },
//         onNonOAuthError: (err: any) => {
//             setResponse({
//                 error: err.message || `an error occured`,
//                 loading: false,
//             });
//         },
//         onSuccess: async (tokenResp) => {
//             const newResponse: authResponse = {};

//             try {
//                 const res = await axios.get(
//                     `https://www.googleapis.com/oauth2/v3/userinfo`,
//                     {
//                         headers: {
//                             Authorization: `Bearer ${tokenResp.access_token}`,
//                         },
//                     }
//                 );
//                 // console.log(tokenResp, res);
//                 const data = res?.data;
//                 const email = data?.email;
//                 if(email){
//                     //send token to db;
//                     const validated = true;

//                     if(validated){
//                         newResponse.user = {
//                             email,
//                             emailVerified: data.email_verified,
//                             name: data.name || data.given_name || data.family_name,
//                             pictureSrc: data.picture,
//                             token: tokenResp.access_token,
//                         };
//                         newResponse.success = true;
//                         newResponse.error = undefined;
//                     }
//                     else {
//                         newResponse.error = `that email cannot be used for access`;
//                     }
//                 }
//                 else {
//                     newResponse.error = `null credentials`;
//                 }
//             }
//             catch(err){
//                 console.log(err);
//                 newResponse.error = 'something went wrong';
//             }

//             newResponse.loading = false;
//             setResponse({...newResponse});
//         },
//     });

//     const signIn = () => {
//         setResponse({loading: true,});
//         login();
//     };
    
//     return {
//         signIn,
//         response,
//     };
// }