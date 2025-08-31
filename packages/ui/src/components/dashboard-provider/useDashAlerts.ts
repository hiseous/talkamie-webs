import { useEffect, useRef } from "react";
import { itemId, itemsMap, queryPaginationProps } from "../../utils/types/global.types";
import { getNewKey } from "../../utils/funcs/string/string";
import { useRerenderComponent } from "../../utils/funcs/hooks/useRerenderComponent";
import { alertProps } from "../../utils/types/alert";
import { useGetAlertsApi } from "../../utils/api/alerts/get";
import { findItemInObjectItems } from "../../utils/funcs/array/find";

// type filter = {
//     keyword?: string;
//     changed?: boolean;
// }

type alertsMap = itemsMap<Pick<alertProps, 'status'>>;
type states = {
    initiallyLoading?: boolean;
    items?: alertProps[];
    pagination?: queryPaginationProps;
    wasTriggered?: boolean;
    key?: string;
}
type refs = {
    // filter?: filter;
    states?: states;
};

export const useDashAlerts = () => {
    // const debounce = useDebounce();
    const getApi = useGetAlertsApi();
    const reRender = useRerenderComponent();
    const refs = useRef<refs>({});

    const handles = {
        // addItem: (alertProps: alertProps) => {
        //     refs.current.states = {
        //         ...refs.current.states,
        //         items: [
        //             alertProps,
        //             ...refs.current.states?.items || [],
        //         ],
        //     };
        //     reRender.trigger();
        //     // setStates(prev => ({
        //     //     ...prev,
        //     //     items: [
        //     //         callProps,
        //     //         ...refs.current.states?.items || [],
        //     //     ],
        //     // }));
        // },
        // findItemInItems: (itemId: itemId, items: alertProps[] = []) => {
        //     let index: number | undefined;
        //     let item: alertProps | undefined;

        //     for(let i = 0; i < items.length; i++){
        //         if(itemId === items[i]?.id){
        //             item = items[i];
        //             index = i;
        //             break;
        //         }
        //     }

        //     return {
        //         index,
        //         item,
        //     };
        // },
        addItemAndRemoveOldOne: (alertProps: alertProps) => {
            let existingAlert: alertProps | undefined;
            if(alertProps.id){
                // const findProps = handles.findItemInItems(alertProps.id, refs.current.states?.items);
                const findProps = findItemInObjectItems({
                    items: refs.current.states?.items,
                    key: ['id', alertProps.id],
                });
                existingAlert = findProps.item;
                
                if(typeof findProps.index === 'number'){
                    //delete it;
                    refs.current.states?.items?.splice(findProps.index, 1);
                }
                
                refs.current.states = {
                    ...refs.current.states,
                    items: [
                        alertProps,
                        ...refs.current.states?.items || [],
                    ],
                };
                reRender.trigger();
            }

            return {
                existingAlert,
            };
        },
        removeItem: (itemId: itemId) => {
            if(itemId){
                const findProps = findItemInObjectItems({
                    items: refs.current.states?.items,
                    key: ['id', itemId],
                });
                if(typeof findProps.index === 'number' && refs.current.states?.items?.length && findProps.index in refs.current.states?.items){
                    refs.current.states.items.splice(findProps.index, 1);
                    reRender.trigger();
                }
            }
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
                    // keyword: refs.current.filter?.keyword,
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
        updateByAlertsMap: (alertsMap?: alertsMap) => {
            if(refs.current.states?.items?.length && alertsMap && Object.keys(alertsMap).length){
                for (const alertId in alertsMap) {
                    if (Object.prototype.hasOwnProperty.call(alertsMap, alertId)) {
                        const alertProps = alertsMap[alertId];
                        const findProps = findItemInObjectItems({
                            items: refs.current.states.items,
                            key: ['id', alertId],
                        });
                        if(typeof findProps.index === 'number'){
                            refs.current.states.items[findProps.index] = {
                                ...refs.current.states.items[findProps.index],
                                status: alertProps?.status,
                            };
                        }
                    }
                }

                reRender.trigger();
            }
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
            //         refs.current.states?.items = [
            //             ...refs.current.states?.items || [],
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