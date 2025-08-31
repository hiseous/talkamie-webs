import { useEffect, useState } from "react";
import { useDebounce } from "../../utils/funcs/debounce/useDebounce";
import { itemId, queryPaginationProps } from "../../utils/types/global.types";
import { useGetUsersInConnectionApi } from "../../utils/api/connections/get";
import { userProps } from "../../utils/types/user";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import { getNewKey } from "../../utils/funcs/string/string";
import { findItemInObjectItems } from "../../utils/funcs/array/find";

type filterProps = {
    keyword?: string;
}
type states = {
    initiallyLoading?: boolean;
    items?: userProps[];
    pagination?: queryPaginationProps;
    wasTriggered?: boolean;
    key?: string;
}
export const useDashConnections = () =>  {
    const debounce = useDebounce();
    const getApi = useGetUsersInConnectionApi();
    const localUser = useLocalUser();
    const [states, setStates] = useState<states>({});
    const [filter, setFilter] = useState<filterProps>({});

    const handles = {
        addOrReplaceItem: (item: userProps) => {
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
        removeItem: (itemId: itemId) => {
            if(itemId){
                setStates(prev => {
                    const findProps = findItemInObjectItems({
                        items: prev.items,
                        key: ['id', itemId],
                    });
                    if(typeof findProps.index === 'number' && prev.items?.length && findProps.index in prev.items){
                        prev.items.splice(findProps.index, 1);
                    }

                    return {...prev};
                })
            }
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
                        keyword: filter.keyword,
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
        onKeywordChange: (keyword?: string) => {
            const debouncedQuery = debounce.trigger(() => {
                setFilter(prev => ({
                    ...prev,
                    keyword,
                }));
            }, 1000);
            debouncedQuery();
        },
    };
    
    useEffect(() => {
        if(localUser?.id && states.wasTriggered){
            handles.getItems(true);
        }
    }, [filter]);
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
        filter,
        loading: getApi.loading,
    };
};