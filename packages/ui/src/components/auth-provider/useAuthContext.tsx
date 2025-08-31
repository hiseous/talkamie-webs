'use client';

import { useEffect, useState } from "react";
import { useDashboard } from "../dashboard-provider/useDashboard";
import { useRouter, useSearchParams } from "next/navigation";
import { authType, ssoName, valueOf } from "../../utils/types/global.types";
import { signInForm, useSignInApi } from "../../utils/api/auth/useSignInApi";
import { signUpForm, useSignUpApi } from "../../utils/api/auth/useSignUpApi";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import { useToastMessage } from "../../utils/funcs/hooks/useToastMessage";
import { ssoResponse } from "../auth-sso/useSignInWithGoogle";
import { useSsoButtons } from "../auth-sso/useSsoButtons";
import { validateEmail } from "../../utils/funcs/validator/_index";
import AddYourInfo from "../auth-sign-up/AddYourInfo";
import WelcomeIntro from "../auth-sign-up/WelcomeIntro";
import AddSpecialization from "../auth-sign-up/AddSpecialization";
import SelectUserType from "../auth-sign-up/SelectUserType";
import VerifyEmail from "../auth-sign-up/VerifyEmail";
import CreateAccount from "../auth-sign-up/CreateAccount";
import { __routes } from "../../utils/constants/app-routes";
import { userType } from "../../utils/types/user";

type provider = {
    type?: authType;
    name?: ssoName;
    token?: string;
    loading?: boolean;
    user?: ssoResponse['user'];
}

type statesType = 'sign-in' | 'sign-up';
type states = {
    type?: statesType;
    signIn: {
        form?: signInForm;
        validated?: boolean;
        // loading?: boolean;
        // success?: boolean;
    };
    signUp: {
        form?: signUpForm;
        validated?: boolean;
        // loading?: boolean;
        // success?: boolean;
        step?: {
            index?: number;
            // node?: React.ReactNode;
        };
    };
    provider?: provider;
    // authResponse?: authButtonResponse;
}

export type AuthContextType = ReturnType<typeof useAuthContext> | undefined;
export const useAuthContext = () => {
    const navigate = useRouter();
    const dashboard = useDashboard();
    const continueUrl = dashboard?.continueUrl.url;
    const localUser = useLocalUser();
    const ssoHook = useSsoButtons();
    const toast = useToastMessage();

    const searchParams = useSearchParams();
    const rawParamUserType = searchParams.get('type');
    const paramUserType: userType | undefined = (
        rawParamUserType === 'senior' ? 'senior' :
        rawParamUserType === 'volunteer' ? 'volunteer' :
        rawParamUserType === 'amie' ? 'volunteer' :
        undefined
    );
    // const paramReferralCode = searchParams.get('referralCode') || undefined;

    const redirectStatusCodes = [404, 422];
    const signInApi = useSignInApi({
        doNotToastErrorOnStatusCodes: redirectStatusCodes,
    });
    const signUpApi = useSignUpApi();
    
    const [states, setStates] = useState<states>({
        signIn: {},
        signUp: {},
        provider: {type: 'password'}
    });

    const handles = {
        setType: (type: statesType) => {
            setStates(prev => {
                prev.type = type;

                if(type === 'sign-up'){
                    prev.signUp.step = {
                        ...prev.signUp.step,
                        index: 0,
                    };
                }

                return {...prev};
            });
        },
        onSignInFormChange: (name: keyof signInForm, value?: valueOf<signInForm>) => {
            setStates(prev => {
                prev.signIn.form = {
                    ...prev.signIn.form,
                    [name]: value,
                };
                prev.signIn.validated = (
                    validateEmail(prev.signIn.form.email) && prev.signIn.form.password
                ) ? true : false;

                return {...prev};
            });
        },
        onSignUpFormChange: (name: keyof signUpForm, value?: valueOf<signUpForm>) => {
            setStates(prev => {
                prev.signUp.form = {
                    ...prev.signUp.form,
                    [name]: value,
                };

                return {...prev};
            });
        },
        updateProvider: (partialProvider?: Partial<provider>) => {
            setStates(prev => {
                // prev.authResponse = authResp;
                prev.provider = {
                    ...prev.provider,
                    ...partialProvider,
                };

                return {...prev};
            });
        },
        setSsoResponse: (providerName: ssoName | undefined, ssoResp: ssoResponse | undefined) => {
            setStates(prev => {
                prev.provider = {
                    type: 'sso',
                    name: providerName,
                    token: ssoResp?.user?.tokens?.access,
                    loading: ssoResp?.loading,
                    user: ssoResp?.user,
                };

                if(ssoResp?.loading === false && ssoResp.success){
                    if(prev.type === 'sign-in'){
                        prev.signIn.form = {
                            ...prev.signIn.form,
                            email: ssoResp?.user?.email,
                        };
                        handles.submitSignInForm(prev);
                    }
                    else {
                        prev.signUp.form = {
                            ...prev.signUp.form,
                            email: ssoResp?.user?.email,
                            name: ssoResp?.user?.names?.full,
                        };
                        // handles.submitSignUpForm(prev);
                        handles.nextSignUpStep();
                    }
                }

                return {...prev};
            });
        },
        prevSignUpStep: () => {
            setStates(prev => {
                const currIndex = prev.signUp.step?.index ?? 0;
                let goToIndex = currIndex - 1;
                if(goToIndex < 0) goToIndex = 0;
                prev.signUp.step = {
                    ...prev.signUp.step,
                    index: goToIndex,
                };

                return {...prev};
            });
        },
        nextSignUpStep: () => {
            setStates(prev => {
                const currIndex = prev.signUp.step?.index ?? 0;
                let goToIndex = currIndex + 1;
                prev.signUp.step = {
                    ...prev.signUp.step,
                    index: goToIndex,
                };

                return {...prev};
            });
        },
        submitSignInForm: (currStates: states) => {
            signInApi.trigger({
                headers: {
                    ...(
                        currStates.provider?.type === 'sso' ? {
                            "x-auth-provider": `${currStates.provider.name} ${currStates.provider.token}`,
                        } : {}
                    ),
                },
                body: {
                    ...currStates.signIn.form,
                },
            });
        },
        submitSignUpForm: (currStates: states) => {
            signUpApi.trigger({
                headers: {
                    ...(
                        currStates.provider?.type === 'sso' ? {
                            "x-auth-provider": `${currStates.provider.name} ${currStates.provider.token}`,
                        } : {}
                    ),
                },
                body: {
                    ...currStates.signUp.form,
                },
            });
        },
        submit: () => {
            setStates(prev => {
                if(prev.type === 'sign-in'){
                    handles.submitSignInForm(prev);
                }
                else {
                    handles.submitSignUpForm(prev);
                }

                return {...prev};
            });
        },
        onSsoButtonClick: (providerName?: ssoName) => {
            if(providerName === 'google'){
                ssoHook.google.signIn();
            }
            // else if(providerName === 'facebook'){
            //     ssoHook.facebook.login();
            // }
            else if(providerName === 'apple'){
                ssoHook.apple.signIn();
            }
        },
    };

    const signUpStepNodes = [
        <CreateAccount />,
        ...(
            states.provider?.name ? [
                
            ] : [
                <VerifyEmail />
            ]
        ),
        ...(
            states.signUp.form?.type ? [] : [
                <SelectUserType />
            ]
        ),
        ...(
            (states.signUp.form?.type === 'volunteer') ? [
                <WelcomeIntro />,
                <AddSpecialization />,
            ] : []
        ),
        <AddYourInfo />,
    ];

    useEffect(() => {
        if(continueUrl && states.type){
            if(states.type === 'sign-in') navigate.replace(__routes.auth(['sign-in']));
            else navigate.replace(__routes.auth(['sign-up']));
        }
    }, [continueUrl, states.type, paramUserType]);
    useEffect(() => {
        if(paramUserType){
            handles.onSignUpFormChange('type', paramUserType);
        }
    }, [paramUserType]);
    useEffect(() => {
        if(signInApi.loading === false){
            if(signInApi.success){
                const user = signInApi.data?.user;
                localUser?.setUser(user);
                localUser?.setLocalStorageUser({
                    id: user?.id,
                    accessToken: signInApi.data?.tokens?.access,
                });
                navigate.replace(continueUrl || __routes.dashboard());
            }
            else {
                if(signInApi.statusCode && redirectStatusCodes.includes(signInApi.statusCode)){
                    if(signInApi.message) toast.warn(signInApi.message);
                    setStates(prev => {
                        prev.signUp.form = {
                            email: prev.signIn.form?.email,
                            name: prev.provider?.user?.names?.full,
                        };

                        if(prev.provider?.type === 'sso' && prev.provider.token && prev.signIn.form?.email){
                            prev.signUp.step = {
                                ...prev.signUp.step,
                                index: 1,
                            };
                        }

                        return {...prev};
                    });
                    navigate.replace(__routes.auth(['sign-up'], {
                        continue: continueUrl,
                    }))
                }
            }
        }
    }, [signInApi.loading]);
    useEffect(() => {
        if(signUpApi.loading === false && signUpApi.success){
            const user = signUpApi.data?.user;
            localUser?.setUser(user);
            localUser?.setLocalStorageUser({
                accessToken: signUpApi.data?.tokens?.access,
            });
            handles.nextSignUpStep();
        }
    }, [signUpApi.loading]);
    useEffect(() => {
        if(ssoHook.apple.response.loading !== undefined){
            handles.setSsoResponse('apple', {
                ...ssoHook.apple.response,
            });
        }
    }, [ssoHook.apple.response.loading]);
    // useEffect(() => {
    //     if(ssoHook.facebook.response.loading !== undefined){
    //         handles.setSsoResponse('facebook', {
    //             ...ssoHook.facebook.response,
    //         });
    //     }
    // }, [ssoHook.facebook.response.loading]);
    useEffect(() => {
        if(ssoHook.google.response.loading !== undefined){
            handles.setSsoResponse('google', {
                ...ssoHook.google.response,
            });
        }
    }, [ssoHook.google.response.loading]);
    
    return {
        ...handles,
        ...states,
        continueUrl,
        signUpStepNode: signUpStepNodes[states.signUp.step?.index ?? 0],
        signInLoading: signInApi.loading,
        signUpLoading: signUpApi.loading,
    };
}