import { __apiUrls } from "../../constants/api-urls";
import { transactionProps } from "../../types/finance";
import { itemId } from "../../types/global.types";
import { useFetchApi, useFetchApiProps } from "../useFetchApi";


export type withdrawCoinsTriggerProps = {
    body: {
        coins?: number;
        transactionId?: itemId;
        paypal?: {
            email?: string;
        };
    };
}
type withdrawCoinsRespData = {
    transaction?: transactionProps;
}

export const useWithdrawCoinsApi = (props?: useFetchApiProps) => {

    const api = useFetchApi<withdrawCoinsRespData>({
        ...props,
        fallBackToastError: `could not initiate account balance top-up session`,
    });
    
    const handle = {
        trigger: (triggerProps: withdrawCoinsTriggerProps) => {
            api.trigger({
                url: __apiUrls.finance(['withdraw']),
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