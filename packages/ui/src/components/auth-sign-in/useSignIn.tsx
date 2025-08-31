// 'use client';

// import { useEffect, useState } from "react";
// import { useLocalUser } from "../local-user-provider/useLocalUser";
// import { signInForm, useSignInApi } from "../../utils/api/auth/useSignInApi";
// import { authButtonResponse } from "../auth-providers/useAuthProviderButtons";
// import { useAppRoutes } from "../../utils/funcs/app-routes/useAppRoutes";

// type changeProps = {
//     name: keyof signInForm;
//     value?: string;
// }

// export const useSignIn = () => {
//     // const navigate = useRouter();
//     const localUser = useLocalUser();
//     const api = useSignInApi();
//     const [form, setForm] = useState<signInForm>({});
//     const [authResponse, setAuthResponse] = useState<authButtonResponse>({});
//     const routes = useAppRoutes();

//     const handles = {
//         onChange: (changeProps: changeProps) => {
//             setForm({
//                 ...form,
//                 [changeProps.name]: changeProps.value,
//             });
//         },
//         signInWithEmail: () => {
//             api.trigger({
//                 body: form,
//             });
//         },
//         signInWithOAuth: (authResponse: authButtonResponse) => {
//             form.email = authResponse.user?.email;
//             form.authProvider = authResponse.provider;
    
//             api.trigger({
//                 body: {
//                     ...form,
//                     password: undefined,
//                 },
//                 headers: {
//                     'x-auth-provider': `${authResponse.provider} ${authResponse.user?.token}`,
//                 },
//             });
//         },
//     };

//     useEffect(() => {
//         if(api.loading === false && api.success){
//             const user = api.data?.user;
//             localUser?.setUser(user);
//             localUser?.setLocalStorageUser({
//                 id: user?.id,
//                 accessToken: api.data?.tokens?.access,
//             })
//             // navigate.replace(routes.dashboard());
//             window.location.href = routes.dashboard();
//         }
//     }, [api.loading]);
//     useEffect(() => {
//         if(authResponse.loading === false && authResponse.success){
//             handles.signInWithOAuth(authResponse);
//         }
//     }, [authResponse.loading]);

//     return {
//         ...handles,
//         form,
//         loading: api.loading,
//         setAuthResponse,
//     };
// };