import { useEffect, useState } from "react";
import { useDebounce } from "../../utils/funcs/debounce/useDebounce";
import { queryPaginationProps } from "../../utils/types/global.types";
import { userProps, userType } from "../../utils/types/user";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import { getUsersTriggerProps, useGetUsersApi } from "../../utils/api/users/useGetUsersApi";
import { getNewKey } from "../../utils/funcs/string/string";

type filterProps = Exclude<getUsersTriggerProps['query'], undefined>;
type states = {
    initiallyLoading?: boolean;
    items?: userProps[];
    pagination?: queryPaginationProps;
    wasTriggered?: boolean;
    filter?: filterProps;
    key?: string;
}
type getItemsProps = {
    filter?: filterProps;
    reset?: boolean;
}
type useDashUsersProps = {
    type?: userType;
}

export const useDashUsers = (props?: useDashUsersProps) =>  {
    const keywordDebounce = useDebounce();
    const filterDebounce = useDebounce();
    const getApi = useGetUsersApi();
    const localUser = useLocalUser();
    const [states, setStates] = useState<states>({});

    const handles = {
        getItems: (thisProps?: getItemsProps) => {
            setStates(prev => {
                if(thisProps?.reset){
                    prev = {key: getNewKey()};
                }
                // else {
                //     prev.wasTriggered = true;
                // }
                // prev.wasTriggered = true;

                if(thisProps?.filter) prev.filter = thisProps.filter;
                
                getApi.trigger({
                    query: {
                        ...prev.filter,
                        type: props?.type,
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
            const debouncedQuery = keywordDebounce.trigger(() => {
                setStates(prev => ({
                    ...prev,
                    filter: {
                        ...prev.filter,
                        keyword,
                    },
                }));
                // setFilter(prev => ({
                //     ...prev,
                //     keyword,
                // }));
            }, 1000);
            debouncedQuery();
        },
        onFilterChange: (filterName: keyof Exclude<filterProps, undefined>, filterValue?: any) => {
            // console.log('---not debouced', filterName, filterValue);
            const debouncedQuery = filterDebounce.trigger(() => {
                // console.log('---debouced', filterName, filterValue);
                setStates(prev => ({
                    ...prev,
                    filter: {
                        ...prev.filter,
                        [filterName]: filterValue,
                    },
                }));
            }, 1000);
            debouncedQuery();
        },
        resetFilters: () => {
            setStates(prev => ({
                ...prev,
                filter: {
                    keyword: prev.filter?.keyword,
                },
                key: getNewKey(),
            }));
            // setFilter(prev => ({
            //     keyword: prev.keyword,
            // }));
        },
    };
    
    useEffect(() => {
        if(localUser?.id && states.wasTriggered){
            handles.getItems({reset: true, filter: states.filter});
        }
    }, [states.filter]);
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
                    wasTriggered: true,
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