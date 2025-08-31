import { __apiUrls } from "../../constants/api-urls";
import { useFetchApi } from "../useFetchApi";

type triggerProps = {
    body: {
        email: string;
        code: string | number;
    };
}
type respData = {
    
};

export const useVerifyOtpApi = () => {
    const api = useFetchApi<respData>({
        fallBackToastError: `could not verify OTP`,
    });

    const handles = {
        trigger: (triggerProps: triggerProps) => {
            api.trigger({
                url: __apiUrls.otp(['verify']),
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