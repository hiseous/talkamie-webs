'use client';

import { useAppRoutes } from "../../utils/funcs/app-routes/useAppRoutes";
import Button from "../button/Button";
import InputTextLabel from "../input-text/InputTextLabel";
import HeaderVar2 from "../heading/HeadingVar2";
import NodeMayBeLink from "../node/NodeMayBeLink";
import SsoButtons from "../auth-sso/SsoButtons";
import { useAuth } from "../auth-provider/useAuth";
import { useEffect } from "react";

const SignIn = () => {
    const routes = useAppRoutes();
    // const hook = useSignIn();
    const hook = useAuth();

    useEffect(() => {
        hook?.setType('sign-in');
    }, []);
    
    return (
        <>
            <HeaderVar2
                title={`Welcome Darling!`}
                subtitle={`Sign in to reconnect and continue building meaningful connection`}
            />
            <div className="mt-4">
                <SsoButtons
                    labelType="in"
                    onClick={hook?.onSsoButtonClick}
                    // onOAuthResponse={hook.setAuthResponse}
                />
            </div>
            <div className="mt-5">
                <InputTextLabel
                    label="Email address"
                    inputProps={{
                        theme: 'white',
                        placeholder: "Email address",
                        onChange: (value) => hook?.onSignInFormChange('email', value),
                    }}
                />
                <InputTextLabel
                    className="mt-4"
                    label="Password"
                    inputProps={{
                        theme: 'white',
                        placeholder: "Password",
                        type: 'password',
                        onChange: (value) => hook?.onSignInFormChange('password', value),
                    }}
                />
            </div>
            <div className="mt-6 text-blackVar3">
                Forgot Password?
            </div>
            <Button
                className="mt-7 w-full !opacity-[1]"
                theme="red"
                loading={hook?.signInLoading}
                disabled={!hook?.signIn.validated}
                onClick={hook?.submit}
            >
                Sign In
            </Button>
            <div className="mt-6 text-[grey] text-center">
                Don't have an account?
                <NodeMayBeLink href={routes.auth(['sign-up'], {continue: hook?.continueUrl})} className="text-blackVar1 hover:underline"> Create Account</NodeMayBeLink>
            </div>
        </>
    );
}

export default SignIn;