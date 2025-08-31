
import { __apiUrls } from "../../constants/api-urls";
import { userProps, userType } from "../../types/user";
import { useFetchApi } from "../useFetchApi";
import { signInForm, signInHeadersForm } from "./useSignInApi";

export type signUpForm = signInForm & {
    name?: string;
    type?: userType;
}
type triggerProps = {
    body: signUpForm;
    headers?: signInHeadersForm;
}
type respData = {
    user?: userProps;
    tokens?: {
        access?: string;
        refresh?: string;
    };
};

export const useSignUpApi = () => {
    const api = useFetchApi<respData>({
        fallBackToastError: `could not sign you up`,
    });

    const handles = {
        trigger: (triggerProps: triggerProps) => {
            api.trigger({
                url: __apiUrls.auth(['sign-up']),
                method: 'post',
                body: triggerProps.body,
                headers: triggerProps.headers,
            });
        },
    };

    return {
        ...api,
        ...handles,
    };
}