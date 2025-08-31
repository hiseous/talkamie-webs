'use client';

import { useEffect } from "react";
import { useAuth } from "../auth-provider/useAuth";

const SignUp = () => {
    // const hook = useSignUp();
    const hook = useAuth();

    useEffect(() => {
        hook?.setType('sign-up');
    }, []);
    
    return (
        <>
            {hook?.signUpStepNode}
        </>
    );
}

export default SignUp;