import { __apiUrls } from "../../constants/api-urls";
import { faqProps } from "../../types/faq";
import { queryPaginationProps } from "../../types/global.types";
import { useFetchApi } from "../useFetchApi";

export type getFaqsTriggerProps = {
    query?: queryPaginationProps & {
        keyword?: string;
    };
}

export const useGetFaqsApi = () => {
    const api = useFetchApi<faqProps[]>({
        fallBackToastError: `could not get faqs`,
    });

    const handles = {
        trigger: (triggerProps?: getFaqsTriggerProps) => {
            api.trigger({
                url: __apiUrls.faqs(),
                body: triggerProps?.query,
            });
        },
    };

    return {
        ...api,
        ...handles,
    };
}