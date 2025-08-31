'use client';

import { useEffect, useState } from "react";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { useSignUpApi } from "../../utils/api/auth/useSignUpApi";
import { useGenerateOtpApi } from "../../utils/api/otp/useGenerateOtpApi";
import { useVerifyOtpApi } from "../../utils/api/otp/useVerifyOtpApi";
import Button from "../button/Button";
import HeaderVar2 from "../heading/HeadingVar2";
import InputVerificationCode from "../input-text/InputVerificationCode";
import { useTimer } from "../../utils/funcs/time/useTimer";
import { fromSeconds } from "../../utils/funcs/time/seconds";
import { toTwoDigits } from "../../utils/funcs/digit";
import { getNewKey } from "../../utils/funcs/string/string";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import AuthBackButton from "./AuthBackButton";
import { useAuth } from "../auth-provider/useAuth";

type VerifyEmailProps = ComponentPrimitiveProps & {

};

const VerifyEmail = (props: VerifyEmailProps) => {
    const auth = useAuth();
    const generateOtpApi = useGenerateOtpApi();
    const verifyOtpApi = useVerifyOtpApi();
    const signUpApi = useSignUpApi();
    const timer = useTimer({
        initialSeconds: 60,
        finalSeconds: 0,
        direction: 'desc',
    });
    const localUser = useLocalUser();
    const [code, setCode] = useState({
        value: undefined as string | undefined,
        key: '',
    });
    
    const secProps = fromSeconds(timer.seconds);
    const resendIn = ` in ${toTwoDigits(secProps.parts.mm)}:${toTwoDigits(secProps.parts.ss)}`;
    
    const handles = {
        submitOtp: (codeValue?: string) => {
            if(auth?.signUp?.form?.email && codeValue){
                verifyOtpApi.trigger({
                    body: {
                        email: auth?.signUp?.form?.email,
                        code: codeValue,
                    },
                });
            }
        },
        sendOtp: () => {
            if(auth?.signUp?.form?.email){
                generateOtpApi.trigger({
                    body: {email: auth?.signUp?.form.email},
                });
            }
        },
        resetCode: () => {
            setCode(prev => ({
                ...prev,
                key: getNewKey(),
            }));
        },
        signUp: () => {
            signUpApi.trigger({
                body: auth?.signUp?.form ?? {},
            });
        },
    };

    useEffect(() => {
        timer.start();
    }, []);
    useEffect(() => {
        if(generateOtpApi.loading === false && generateOtpApi.success){
            handles.resetCode();
            timer.reset();
            timer.start();
        }
    }, [generateOtpApi.loading]);
    useEffect(() => {
        if(verifyOtpApi.loading === false){
            if(verifyOtpApi.success){
                handles.signUp();
            }
            else {
                handles.resetCode();
            }
        }
    }, [verifyOtpApi.loading]);
    useEffect(() => {
        if(signUpApi.loading === false && signUpApi.success){
            localUser?.setUser(signUpApi.data?.user);
            localUser?.setLocalStorageUser({
                id: signUpApi.data?.user?.id,
                accessToken: signUpApi.data?.tokens?.access,
            });
            auth?.nextSignUpStep();
            // if(props.onNext) props.onNext();
        }
    }, [signUpApi.loading]);
    
    return (
        <div className={`${props.className || ''}`}>
            <AuthBackButton onClick={auth?.prevSignUpStep} className="mb-8" />
            <HeaderVar2
                className="mt-4"
                title={`Verify your email address`}
                subtitle={`We just sent you a mail (${auth?.signUp?.form?.email}). Enter the 4-digit code to verify your account.`}
            />
            <div className="mt-5 text-blackVar4">
                <span className="text-redVar1 cursor-pointer" onClick={auth?.prevSignUpStep}>Change email </span>
                <span
                    onClick={handles.sendOtp}
                    className={`${timer.status === 'stopped' ? 'cursor-pointer' : ''}`}
                >
                    or Resend code
                    {
                        timer.status === 'playing' ?
                        <>
                            {resendIn}
                        </> : <></>
                    }
                </span>
            </div>
            <InputVerificationCode
                key={code.key}
                className="mt-10"
                onChange={(changeProps) => {
                    setCode(prev => ({
                        ...prev,
                        otp: changeProps.concatenatedFieldValues,
                    }));
                }}
                disabled={verifyOtpApi.loading || generateOtpApi.loading}
                onLastInputFilled={(lastFilledProps) => {
                    handles.submitOtp(lastFilledProps.concatenatedFieldValues);
                }}
            />
            <Button
                className="mt-7 w-full block text-center !opacity-[1]"
                theme="red"
                loading={verifyOtpApi.loading || generateOtpApi.loading}
                disabled={
                    !auth?.signUp?.form?.email
                    || !code
                }
                onClick={() => {
                    handles.submitOtp(code.value);
                }}
            >
                Verify email address
            </Button>
        </div>
    );
}

export default VerifyEmail;