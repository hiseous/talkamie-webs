import { useEffect, useState } from "react";
import { itemId, queryPaginationProps } from "../../utils/types/global.types";
import { useGetPendingConnectRequestsApi } from "../../utils/api/connection/get-pending-connect-requests";
import { connectRequestProps } from "../../utils/types/connect";
import { getNewKey } from "../../utils/funcs/string/string";
import { findItemInObjectItems } from "../../utils/funcs/array/find";

// type filterProps = {
//     keyword?: string;
// }
type states = {
    initiallyLoading?: boolean;
    items?: connectRequestProps[];
    pagination?: queryPaginationProps;
    wasTriggered?: boolean;
    key?: string;
}
export const useDashPendingReqs = () =>  {
    // const debounce = useDebounce();
    const getApi = useGetPendingConnectRequestsApi();
    const [states, setStates] = useState<states>({});
    // const [filter, setFilter] = useState<filterProps>({});

    const handles = {
        addOrReplaceItem: (item: connectRequestProps) => {
            if(item.id){
                setStates(prev => {
                    const findProps = findItemInObjectItems({
                        items: prev.items,
                        key: ['id', item.id],
                    });
                    if(typeof findProps.index === 'number' && prev.items?.length && findProps.index in prev.items){
                        prev.items[findProps.index] = {
                            ...prev.items[findProps.index],
                            ...item,
                        };
                    }
                    else {
                        prev.items = [
                            item,
                            ...prev.items || [],
                        ];
                    }

                    return {...prev};
                })
            }
        },
        removeItem: (itemId?: itemId, userId?: itemId) => {
            setStates(prev => {
                let itemIndex: number | undefined;

                if(itemId){
                    const findProps = findItemInObjectItems({
                        items: prev.items,
                        key: ['id', itemId],
                    });
                    itemIndex = findProps.index;
                }
                else if(userId){
                    if(prev.items?.length){
                        for(let i = 0; i < prev.items.length; i++){
                            if(prev.items[i]?.user?.id === userId){
                                itemIndex = i;
                                break;
                            }
                        }
                    }
                }

                if(typeof itemIndex === 'number' && prev.items?.length && itemIndex in prev.items){
                    prev.items.splice(itemIndex, 1);
                }

                return {...prev};
            })
        },
        getItems: (reset?: boolean) => {
            setStates(prev => {
                if(reset){
                    prev = {key: getNewKey()};
                }
                else {
                    prev.wasTriggered = true;
                }
                getApi.trigger({
                    query: {
                        // keyword: filter.keyword,
                        lastEvaluatedKey: prev.pagination?.lastEvaluatedKey,
                        pageSize: 20,
                    }
                });

                return {...prev};
            })
        },
        reset: () => {
            setStates({key: getNewKey()});
        },
        // onKeywordChange: (keyword?: string) => {
        //     const debouncedQuery = debounce.trigger(() => {
        //         setFilter(prev => ({
        //             ...prev,
        //             keyword,
        //         }));
        //     }, 1000);
        //     debouncedQuery();
        // },
    };
    
    // useEffect(() => {
    //     if(localUser?.id && states.wasTriggered){
    //         handles.getItems(true);
    //     }
    // }, [filter]);
    useEffect(() => {
        if(getApi.loading !== undefined){
            setStates(prev => {
                if(getApi.success){
                    prev.pagination = getApi.pagination;
                    prev.items = [
                        ...prev.items || [],
                        ...getApi.data || [],
                    ];
                }

                return {
                    ...prev,
                    initiallyLoading: [undefined, true].includes(prev.initiallyLoading) ? getApi.loading : prev.initiallyLoading,
                }
            });
        }
    }, [getApi.loading]);

    return {
        ...handles,
        ...states,
        // filter,
        loading: getApi.loading,
    };
};