import { __apiUrls } from "../../constants/api-urls";
import { userProps } from "../../types/user";
import { useFetchApi, useFetchApiProps } from "../useFetchApi";

export type signInForm = {
    email?: string;
    password?: string;
    // authProvider?: authProviderName;
}
export type signInHeadersForm = {
    'x-user-device'?: string;
    'x-auth-provider'?: string;
}
type triggerProps = {
    body: signInForm;
    headers?: signInHeadersForm;
}
type respData = {
    user?: userProps;
    tokens?: {
        access?: string;
        refresh?: string;
    };
};

export const useSignInApi = (props?: useFetchApiProps) => {
    const api = useFetchApi<respData>({
        fallBackToastError: `could not sign you in`,
        ...props,
    });

    const handles = {
        trigger: (triggerProps: triggerProps) => {
            api.trigger({
                url: __apiUrls.auth(['sign-in']),
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