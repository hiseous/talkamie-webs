import { __apiUrls } from "../../constants/api-urls";
import { itemId } from "../../types/global.types";
import { useFetchApi, useFetchApiProps } from "../useFetchApi";


export type initiateBalanceTopUpTriggerProps = {
    body: {
        coins?: number;
        transactionId?: itemId;
    };
}
type initiateBalanceTopUpRespData = {
    session?: {
        id?: string;
        url?: string;
    };
    transaction?: {
        id?: itemId;
    };
}

export const useInitiateBalanceTopUpApi = (props?: useFetchApiProps) => {

    const api = useFetchApi<initiateBalanceTopUpRespData>({
        ...props,
        fallBackToastError: `could not initiate account balance top-up session`,
    });
    
    const handle = {
        trigger: (triggerProps: initiateBalanceTopUpTriggerProps) => {
            api.trigger({
                url: __apiUrls.webFinance(['top-up', 'session']),
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