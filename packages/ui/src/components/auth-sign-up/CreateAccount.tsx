'use client';

import { useEffect, useState } from "react";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { useAppRoutes } from "../../utils/funcs/app-routes/useAppRoutes";
import Button from "../button/Button";
import InputTextLabel from "../input-text/InputTextLabel";
import HeaderVar2 from "../heading/HeadingVar2";
import NodeMayBeLink from "../node/NodeMayBeLink";
import { useGetUsersApi } from "../../utils/api/users/useGetUsersApi";
import { validateEmail } from "../../utils/funcs/validator/_index";
import { useGenerateOtpApi } from "../../utils/api/otp/useGenerateOtpApi";
import { __app } from "../../utils/constants/app";
import { useAuth } from "../auth-provider/useAuth";
import SsoButtons from "../auth-sso/SsoButtons";

type CreateAccountProps = ComponentPrimitiveProps & {
    // form?: signUpForm;
    // onChange?: (changeProps: signUpFormChangeProps) => void;
    // onNext?: (nextProps?: Partial<signUpForm>) => void;
    // updateForm?: (updateProps: Partial<signUpForm>) => void;
};

const CreateAccount = (props: CreateAccountProps) => {
    const routes = useAppRoutes();
    const auth = useAuth();
    const getUsersApi = useGetUsersApi();
    // const signUpApi = useSignUpApi();
    const generateOtpApi = useGenerateOtpApi({
        ...(
            __app.stage === 'dev' ? {
                toastSuccessMessage: true,
            } : undefined
        ),
    });
    // const [authResponse, setAuthResponse] = useState<authButtonResponse>({});
    const [emailExists, setEmailExists] = useState(false);

    useEffect(() => {
        if(getUsersApi.loading === false && getUsersApi.success){
            const user = getUsersApi.data?.length ? getUsersApi.data[0] : undefined;
            if(user){
                //email exists;
                setEmailExists(true);
            }
            else {
                generateOtpApi.trigger({
                    body: {
                        email: auth?.signUp.form?.email ?? '',
                    },
                });
            }
        }
    }, [getUsersApi.loading]);
    useEffect(() => {
        if(emailExists){
            setEmailExists(false);
        }
    }, [auth?.signUp.form?.email]);
    useEffect(() => {
        if(generateOtpApi.loading === false && generateOtpApi.success){
            auth?.updateProvider({
                type: 'password',
            });
            auth?.nextSignUpStep();
            // if(__app.stage === 'dev'){
            //     toast.success(`OTP: ${generateOtpApi.data?.otp}; you're seeing this because you're in a sandbox; however on production, you'll be mailed the code, securely.`);
            // }
            // if(props.updateForm) props.updateForm({authType: 'password'});
            // if(props.onNext) props.onNext();
        }
    }, [generateOtpApi.loading]);
    
    return (
        <div className={`${props.className || ''}`}>
            <HeaderVar2
                title={`Create an account`}
                // subtitle={`Book a call, and let the smiles begin. It’s that simple.`}
                subtitle={`You are few clicks away from your first call!`}
                subtitleClassName="max-w-[240px] md:max-w-full"
            />
            <div className="mt-4">
                <SsoButtons
                    labelType="up"
                    onClick={auth?.onSsoButtonClick}
                />
            </div>
            <div className="mt-5">
                <InputTextLabel
                    label="Full name"
                    inputProps={{
                        theme: 'white',
                        placeholder: "Full name",
                        defaultValue: auth?.signUp.form?.name,
                        onChange: (value) => auth?.onSignUpFormChange('name', value),
                    }}
                />
                <InputTextLabel
                    className="mt-4"
                    label="Email address"
                    inputProps={{
                        theme: 'white',
                        placeholder: "Email address",
                        defaultValue: auth?.signUp.form?.email,
                        onChange: (value) => auth?.onSignUpFormChange('email', value),
                    }}
                />
                {
                    emailExists ?
                    <div className="mt-1 text-sm text-redVar1">this email already exists</div> : <></>
                }
                <InputTextLabel
                    className="mt-4"
                    label="Password"
                    inputProps={{
                        theme: 'white',
                        placeholder: "Password",
                        defaultValue: auth?.signUp.form?.password,
                        type: 'password',
                        onChange: (value) => auth?.onSignUpFormChange('password', value),
                    }}
                />
            </div>
            <div className="mt-6 text-[grey]">
                By Creating an account you agree to Talkamie
                <NodeMayBeLink href="#" className="text-blackVar1 hover:underline"> Terms and Agreement </NodeMayBeLink>
                and
                <NodeMayBeLink href="#" className="text-blackVar1 hover:underline"> Privacy Policy</NodeMayBeLink>
            </div>
            <Button
                className="mt-7 w-full block text-center !opacity-[1]"
                theme="red"
                loading={getUsersApi.loading || generateOtpApi.loading || auth?.signUpLoading}
                disabled={
                    !auth?.signUp.form?.name
                    || (!validateEmail(auth?.signUp.form?.email) || emailExists)
                    || !auth?.signUp.form?.password
                }
                onClick={() => {
                    // if(auth?.provider?.type === 'sso'){
                    //     auth?.updateProvider({
                    //         type: 'password',
                    //     });
                    // }
                    getUsersApi.trigger({
                        query: {email: auth?.signUp?.form?.email}
                    });
                }}
            >
                Create Account
            </Button>
            <div className="mt-6 text-[grey] text-center">
                Already have an account?
                <NodeMayBeLink href={routes.auth(['sign-in'], {continue: auth?.continueUrl})} className="text-blackVar1 hover:underline"> Sign in</NodeMayBeLink>
            </div>
        </div>
    );
}

export default CreateAccount;