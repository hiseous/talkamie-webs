// 'use client';

// import { authProviderName, ComponentPrimitiveProps } from "../../utils/types/global.types";
// import AuthButton from "../button/AuthButton";
// import { useAuthProviderButtons, useAuthProviderButtonsProps } from "./useAuthProviderButtons";

// type AuthProviderButtonsProps = ComponentPrimitiveProps & useAuthProviderButtonsProps & {
//     labelType?: 'up' | 'in';
// };

// const AuthProviderButtons = (props: AuthProviderButtonsProps) => {
//     const providers: authProviderName[] = ['google', 'apple'];
//     const hook = useAuthProviderButtons(props);

//     return (
//         <div
//             className={`${props.className || ''}`}
//         >
//             {
//                 providers.map((provider, i) => {
//                     return (
//                         <AuthButton
//                             key={i}
//                             className={`${i > 0 ? 'mt-4' : ''}`}
//                             provider={provider}
//                             authType={props.labelType === 'up' ? 'sign-up' : 'sign-in'}
//                             onClick={() => {
//                                 if(provider === 'google'){
//                                     hook.google.signIn();
//                                 }
//                                 else if(provider === 'apple'){
//                                     hook.apple.signIn();
//                                 }
//                             }}
//                         />
//                     )
//                 })
//             }
//         </div>
//     );
// }

// export default AuthProviderButtons;