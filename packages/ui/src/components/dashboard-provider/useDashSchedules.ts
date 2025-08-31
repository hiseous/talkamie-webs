import { useEffect, useState } from "react";
import { queryPaginationProps } from "../../utils/types/global.types";
import { useDebounce } from "../../utils/funcs/debounce/useDebounce";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import { apiSchedulesSubpath } from "../../utils/types/api";
import { scheduleProps } from "../../utils/types/schedule";
import { useGetSchedulesApi } from "../../utils/api/schedules/get";
import { getNewKey } from "../../utils/funcs/string/string";
import { findItemInObjectItems } from "../../utils/funcs/array/find";

type filterProps = {
    keyword?: string;
    // tab?: 'favourite' | 'unread';
}

type states = {
    initiallyLoading?: boolean;
    items?: scheduleProps[];
    pagination?: queryPaginationProps;
    wasTriggered?: boolean;
    key?: string;
}

type useDashSchedulesProps = {
    subpath?: apiSchedulesSubpath;
}

export const useDashSchedules = (props?: useDashSchedulesProps) => {
    const [filter, setFilter] = useState<filterProps>({});
    const debounce = useDebounce();
    const getApi = useGetSchedulesApi();
    const localUser = useLocalUser();
    const [states, setStates] = useState<states>({});

    const handles = {
        addItem: (item: scheduleProps) => {
            setStates(prev => {
                prev.items = [
                    item,
                    ...prev.items || [],
                ];

                return {...prev};
            })
        },
        updateItem: (item: scheduleProps) => {
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

                    return {...prev};
                })
            }
        },
        addOrReplaceItem: (item: scheduleProps) => {
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
        getItems: (reset?: boolean) => {
            setStates(prev => {
                if(reset){
                    prev = {key: getNewKey()};
                }
                else {
                    prev.wasTriggered = true;
                }
                getApi.trigger({
                    subpath: props?.subpath,
                    query: {
                        keyword: filter.keyword,
                        lastEvaluatedKey: prev.pagination?.lastEvaluatedKey,
                        pageSize: 25,
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
        // onTabChange: (tab?: filterProps['tab']) => {
        //     setFilter(prev => ({
        //         ...prev,
        //         tab,
        //     }));
        // },
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