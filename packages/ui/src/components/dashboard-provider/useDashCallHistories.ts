import { useEffect, useRef } from "react";
import { queryPaginationProps } from "../../utils/types/global.types";
import { useGetCallHistoriesApi } from "../../utils/api/calls/get-call-histories";
import { getNewKey } from "../../utils/funcs/string/string";
import { useDebounce } from "../../utils/funcs/debounce/useDebounce";
import { callProps } from "../../utils/types/call";
import { useRerenderComponent } from "../../utils/funcs/hooks/useRerenderComponent";

type filter = {
    keyword?: string;
    changed?: boolean;
}
type states = {
    initiallyLoading?: boolean;
    items?: callProps[];
    pagination?: queryPaginationProps;
    wasTriggered?: boolean;
    key?: string;
}
type refs = {
    filter?: filter;
    states?: states;
};

export const useDashCallHistories = () => {
    const debounce = useDebounce();
    const getApi = useGetCallHistoriesApi();
    const reRender = useRerenderComponent();
    const refs = useRef<refs>({});
    // const [filter, setFilter] = useState<filter>({});
    // const [states, setStates] = useState<states>({});

    const handles = {
        addItem: (callProps: callProps) => {
            refs.current.states = {
                ...refs.current.states,
                items: [
                    callProps,
                    ...refs.current.states?.items || [],
                ],
            };
            reRender.trigger();
            // setStates(prev => ({
            //     ...prev,
            //     items: [
            //         callProps,
            //         ...prev.items || [],
            //     ],
            // }));
        },
        getItems: (reset?: boolean) => {
            if(reset){
                refs.current.states = {key: getNewKey()};
            }
            else {
                refs.current.states = {
                    ...refs.current.states,
                    wasTriggered: true,
                };
            }
            getApi.trigger({
                query: {
                    keyword: refs.current.filter?.keyword,
                    lastEvaluatedKey: refs.current.states?.pagination?.lastEvaluatedKey,
                    pageSize: 25,
                }
            });
            reRender.trigger();
            // setStates(prev => {
            //     if(reset){
            //         prev = {key: getNewKey()};
            //     }
            //     else {
            //         prev.wasTriggered = true;
            //     }
            //     getApi.trigger({
            //         query: {
            //             lastEvaluatedKey: prev.pagination?.lastEvaluatedKey,
            //             pageSize: 20,
            //         }
            //     });

            //     return {...prev};
            // })
        },
        reset: () => {
            refs.current.states = {key: getNewKey()};
            reRender.trigger();
            // setStates({key: getNewKey()});
        },
        onKeywordChange: (keyword?: string) => {
            const debouncedQuery = debounce.trigger(() => {
                refs.current.filter = {
                    ...refs.current.filter,
                    keyword,
                    changed: true,
                };
                reRender.trigger();
                // setFilter(prev => ({
                //     ...prev,
                //     keyword,
                //     changed: true,
                // }));
            }, 1000);
            debouncedQuery();
        },
    };

    useEffect(() => {
        if(getApi.loading !== undefined){
            refs.current.states = {
                ...refs.current.states,
                initiallyLoading: [undefined, true].includes(refs.current.states?.initiallyLoading) ? getApi.loading : refs.current.states?.initiallyLoading,
            };
            if(getApi.success){
                refs.current.states.pagination = getApi.pagination;
                refs.current.states.items = [
                    ...refs.current.states.items || [],
                    ...getApi.data || [],
                ];
            }
            reRender.trigger();

            // setStates(prev => {
            //     if(getApi.success){
            //         prev.pagination = getApi.pagination;
            //         prev.items = [
            //             ...prev.items || [],
            //             ...getApi.data || [],
            //         ];
            //     }

            //     return {
            //         ...prev,
            //         initiallyLoading: [undefined, true].includes(prev.initiallyLoading) ? getApi.loading : prev.initiallyLoading,
            //     }
            // });
        }
    }, [getApi.loading]);

    return {
        ...handles,
        ...refs.current.states,
        filter: {...refs.current.filter},
        // ...states,
        // filter,
        loading: getApi.loading,
    };
};