import { __apiUrls } from "../../constants/api-urls";
import { supportTicketProps } from "../../types/support";
import { useFetchApi } from "../useFetchApi";


export const useGetSupportOpenTicketApi = () => {
    const api = useFetchApi<supportTicketProps>({
        fallBackToastError: `could not get support ticket`,
    });

    const handles = {
        trigger: () => {
            api.trigger({
                url: __apiUrls.support(['open', 'ticket']),
            });
        },
    };

    return {
        ...api,
        ...handles,
    };
}