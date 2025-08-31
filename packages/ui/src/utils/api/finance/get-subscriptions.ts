import { __apiUrls } from "../../constants/api-urls";
import { subscriptionPlanProps } from "../../types/finance";
import { useFetchApi, useFetchApiProps } from "../useFetchApi";


export const useGetSubscriptionsApi = (props?: useFetchApiProps) => {

    const api = useFetchApi<subscriptionPlanProps[]>({
        ...props,
        fallBackToastError: `could not get subscription plans`,
    });
    
    const handle = {
        trigger: () => {
            api.trigger({
                url: __apiUrls.finance(['subscriptions']),
            });
        },
    };
    
    return {
        ...api,
        ...handle,
    };
}