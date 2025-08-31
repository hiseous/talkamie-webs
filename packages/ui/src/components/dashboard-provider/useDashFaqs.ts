import { getFaqsTriggerProps, useGetFaqsApi } from "../../utils/api/faq/get";
import { useGetObjectItems } from "../../utils/funcs/hooks/useGetObjectItems";

export const useDashFaqs = () =>  {
    const getHook = useGetObjectItems({
        getApi: useGetFaqsApi,
    });
    const handles = {
        get: (query?: getFaqsTriggerProps['query']) => {
            getHook.get({
                triggerProps: {
                    query: {
                        pageSize: 20,
                        ...query,
                    },
                },
            });
        },
    };
    
    return {
        ...getHook,
        ...handles,
    };
};