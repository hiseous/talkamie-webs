import { __apiUrls } from "../../constants/api-urls";
import { useFetchApi, useFetchApiProps } from "../useFetchApi";


export type initiateBackgroundCheckTriggerProps = {
    body: {
        // email?: string; //fallback email, if user has none yet, which is unlikely;
        // telephone?: string | number;
        firstName?: string;
        lastName?: string;
        middleName?: string;
        // dob?: string;
        // ssn?: string;
        zipCode?: string;
        workLocations?: {
            countryCode?: string;
            stateCode?: string;
            city?: string;
        }[]
    };
}

export const useInitiateBackgroundCheckApi = (props?: useFetchApiProps) => {

    const api = useFetchApi({
        ...props,
        fallBackToastError: `could not initiate background check`,
    });
    
    const handle = {
        trigger: (triggerProps: initiateBackgroundCheckTriggerProps) => {
            api.trigger({
                url: __apiUrls.verification(['background']),
                body: triggerProps.body,
                method: 'post',
            });
        },
    };
    
    return {
        ...api,
        ...handle,
    };
}