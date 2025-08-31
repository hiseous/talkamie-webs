import { useLocalUser } from "../../../components/local-user-provider/useLocalUser";
import { __apiUrls } from "../../constants/api-urls";
import { compressedFileProps } from "../../types/file";
import { interestProps } from "../../types/interest";
import { userProps } from "../../types/user";
import { useFetchApi } from "../useFetchApi";

export type updateUserForm = Partial<Pick<userProps,
    'type' | 'gender' | 'bio' | 'language' | 'name' | 'visibility' | 'fileDirPath'
    | 'picture' | 'video'
>> & {
    // profilePicture?: File;
    // introVideo?: File;
    // certificate?: File;
    country?: string;
    state?: string;
    city?: string;
    specialization?: string;
    certificate?: compressedFileProps;
    licenseId?: string;
    dob?: string;
    certificateState?: string;
    interests?: Pick<interestProps, 'emoji' | 'name'>[];
    maxCallDuration?: number; //in seconds;
    maxCallCount?: number;
    pushNotification?: {
        enabled?: boolean;
    };
}
type triggerProps = {
    body: updateUserForm;
}
type respData = userProps;

export const useUpdateUserApi = () => {
    const api = useFetchApi<respData>({
        fallBackToastError: `could not update user`,
    });
    const localUserId = useLocalUser()?.id;

    const handles = {
        trigger: (triggerProps: triggerProps) => {
            if(localUserId){
                api.trigger({
                    url: __apiUrls.user(localUserId),
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