'use client';

import { useState, useEffect } from 'react';
import { __creds } from '../../utils/constants/creds/_index';
import { removeTraillingSlash } from '../../utils/funcs/string/string';
import { decodeJwtToken } from '../../utils/funcs/jwt/_index';
import { ssoResponse } from './useSignInWithGoogle';

type appleResponse = {
    authorization?: {
        code?: string;
        id_token?: string;
    };
    user?: {
        email?: string;
        name?: {
            firstName?: string;
            lastName?: string;
        };
    };
}

const wind = window as any;

const useAppleSignIn = () => {
    const creds = {
        clientId: __creds.NEXT_PUBLIC_APPLE_AUTH_CLIENT_ID,
        redirectURI: removeTraillingSlash(location.href),
        scope: 'name email',
    };
    
    const [scriptIsLoaded, setScriptIsLoaded] = useState(false);
    const [response, setResponse] = useState<ssoResponse>({});

    useEffect(() => {
        // Load the Apple script if it's not already loaded
        if (!wind.AppleID) {
            const script = document.createElement('script');
            script.src = 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js';
            script.onload = () => setScriptIsLoaded(true);
            script.onerror = () => setResponse({error: 'Failed to load Apple Sign-In script',});
            document.body.appendChild(script);
        } else {
            setScriptIsLoaded(true);
        }
    }, []);

    const signIn = async () => {
        setResponse({
            loading: true,
        });

        if (!scriptIsLoaded || response.error){
            setResponse({
                loading: false,
            });

            console.log('Apple Sign-In is not ready:', response.error);
            return;
        }

        try {
            wind.AppleID.auth.init({
                clientId: creds.clientId,
                scope: creds.scope,
                redirectURI: creds.redirectURI,
                usePopup: true,
            });

            const response = await wind.AppleID.auth.signIn() as appleResponse | undefined;

            // console.log('Apple response', response);

            const newResponse: ssoResponse = {
                loading: false,
            };
            
            const authObj = decodeJwtToken(response?.authorization?.id_token ?? '');
            const email = response?.user?.email || authObj?.email;
            
            if(email){
                let displayName = response?.user?.name?.firstName ?? '';
                displayName += `${displayName ? ' ' : ''}${response?.user?.name?.lastName ?? ''}`;

                newResponse.user = {
                    email,
                    names: {
                        full: displayName,
                        first: response?.user?.name?.firstName,
                        last: response?.user?.name?.lastName,
                    },
                    tokens: {
                        access: response?.authorization?.id_token,
                    },
                };
                newResponse.success = true;
                newResponse.error = undefined;
            }
            else {
                newResponse.error = 'no email found for the Apple account'
            }

            setResponse(newResponse);

            return response; // Contains authorization code and user info
        } catch (err) {
            console.log('Apple Sign-In failed:', err);
            setResponse({
                loading: false,
                error: `Apple Sign-In failed`,
            });
        }
    };

    return {
        signIn,
        response,
    };
};

export default useAppleSignIn;