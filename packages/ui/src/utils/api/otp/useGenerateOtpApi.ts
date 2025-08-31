import { __apiUrls } from "../../constants/api-urls";
import { useFetchApi, useFetchApiProps } from "../useFetchApi";

type triggerProps = {
    body: {
        email: string;
    };
}
type respData = {
    otp?: string | number; //only appears in dev stage;
};

export const useGenerateOtpApi = (props?: useFetchApiProps) => {
    const api = useFetchApi<respData>({
        fallBackToastError: `could not generate OTP`,
        ...props,
    });

    const handles = {
        trigger: (triggerProps: triggerProps) => {
            api.trigger({
                url: __apiUrls.otp(),
                method: 'post',
                body: triggerProps.body,
            });
        },
    };

    return {
        ...api,
        ...handles,
    };
}