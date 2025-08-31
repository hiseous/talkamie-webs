'use client';

import { useEffect } from "react";
import { ssoName } from "../../utils/types/global.types";
import useAppleSignIn from "./useSignInWithApple";
import { ssoResponse, useSignInWithGoogle } from "./useSignInWithGoogle";


export type ssoButtonResponse = ssoResponse & {
    provider?: ssoName;
}
export type useSsoButtonsProps = {
    onOAuthResponse?: (response: ssoButtonResponse) => void;
}

export const useSsoButtons = (props?: useSsoButtonsProps) => {
    const googleHook = useSignInWithGoogle();
    // const facebookHook = useFacebook();
    const appleHook = useAppleSignIn();

    const handles = {
        onOAuthResponse: (response: ssoButtonResponse) => {
            if(props?.onOAuthResponse) props.onOAuthResponse(response);
        },
    };
    
    useEffect(() => {
        // if(googleHook.response.loading === false){
        //     const localUser = googleHook.response.user;
        //     if(localUser){
        //         handles.onOAuthResponse(localUser, 'google');
        //     }
        // }
        handles.onOAuthResponse({
            ...googleHook.response,
            provider: 'google',
        });
    }, [googleHook.response.loading]);
    // useEffect(() => {
    //     // if(facebookHook.response.loading === false){
    //     //     const localUser = facebookHook.response.user;
    //     //     if(localUser){
    //     //         handles.onOAuthResponse(localUser, 'facebook');
    //     //     }
    //     // }
    //     handles.onOAuthResponse({
    //         ...facebookHook.response,
    //         provider: 'facebook',
    //     });
    // }, [facebookHook.response.loading]);
    useEffect(() => {
        // if(appleHook.response.loading === false){
        //     const localUser = appleHook.response.user;
        //     if(localUser){
        //         handles.onOAuthResponse(localUser, 'apple');
        //     }
        // }
        handles.onOAuthResponse({
            ...appleHook.response,
            provider: 'apple',
        });
    }, [appleHook.response.loading]);

    return {
        apple: appleHook,
        google: googleHook,
        // facebook: facebookHook,
    };
};