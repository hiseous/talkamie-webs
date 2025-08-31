import { useLocalUser } from "../../../components/local-user-provider/useLocalUser";
import { __apiUrls } from "../../constants/api-urls";
import { useFetchApi } from "../useFetchApi";

export type changePasswordTriggerProps = {
    body: {
        oldPassword?: string;
        newPassword?: string;
    };
}

export const useChangePasswordApi = () => {
    const api = useFetchApi({
        fallBackToastError: `could not update password`,
    });
    const localUserId = useLocalUser()?.id;

    const handles = {
        trigger: (triggerProps: changePasswordTriggerProps) => {
            if(localUserId){
                api.trigger({
                    url: __apiUrls.user(localUserId, ['password']),
                    method: 'put',
                    body: triggerProps.body,
                });
            }
            else {
                api.toastError(`Please, sign in or sign up for an account.`);
            }
        },
    };

    return {
        ...api,
        ...handles,
    };
}