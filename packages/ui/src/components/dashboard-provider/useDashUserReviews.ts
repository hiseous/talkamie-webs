import { useEffect, useRef } from "react";
import { itemId, queryPaginationProps } from "../../utils/types/global.types";
import { getNewKey } from "../../utils/funcs/string/string";
import { useRerenderComponent } from "../../utils/funcs/hooks/useRerenderComponent";
import { useGetLocalUserReviewsApi } from "../../utils/api/reviews/get-reviews";
import { useGetUserReviewsApi } from "../../utils/api/user/get-reviews";
import { userReviewProps } from "../../utils/types/user-review";

// type filter = {
//     keyword?: string;
//     changed?: boolean;
// }
type states = {
    initiallyLoading?: boolean;
    items?: userReviewProps[];
    pagination?: queryPaginationProps;
    wasTriggered?: boolean;
    key?: string;
}
type refs = {
    // filter?: filter;
    states?: states;
};
type useDashUserReviewsProps = {
    asViewer?: boolean;
    forUserId?: itemId;
}

export const useDashUserReviews = (props?: useDashUserReviewsProps) => {
    const getApi = (props?.asViewer ? useGetLocalUserReviewsApi : useGetUserReviewsApi)();
    const reRender = useRerenderComponent();
    const refs = useRef<refs>({});
    // const [filter, setFilter] = useState<filter>({});
    // const [states, setStates] = useState<states>({});

    const handles = {
        addItem: (userReviewProps: userReviewProps) => {
            refs.current.states = {
                ...refs.current.states,
                items: [
                    userReviewProps,
                    ...refs.current.states?.items || [],
                ],
            };
            reRender.trigger();
            // setStates(prev => ({
            //     ...prev,
            //     items: [
            //         userReviewProps,
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

            if(props?.asViewer){

            }
            else if(props?.forUserId){

            }
            getApi.trigger({
                userId: props?.forUserId,
                query: {
                    // keyword: refs.current.filter?.keyword,
                    lastEvaluatedKey: refs.current.states?.pagination?.lastEvaluatedKey,
                    pageSize: 25,
                }
            } as any);
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
        // onKeywordChange: (keyword?: string) => {
        //     const debouncedQuery = debounce.trigger(() => {
        //         refs.current.filter = {
        //             ...refs.current.filter,
        //             keyword,
        //             changed: true,
        //         };
        //         reRender.trigger();
        //         // setFilter(prev => ({
        //         //     ...prev,
        //         //     keyword,
        //         //     changed: true,
        //         // }));
        //     }, 1000);
        //     debouncedQuery();
        // },
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
        // filter: {...refs.current.filter},
        // ...states,
        // filter,
        loading: getApi.loading,
    };
};