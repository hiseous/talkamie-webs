import { useEffect, useState } from "react";
import { queryPaginationProps } from "../../utils/types/global.types";
import { getNewKey } from "../funcs/string/string";
import { responsePagination } from "./useFetchApi";

type states<itemType> = {
    items?: itemType[];
    pagination?: queryPaginationProps;
    initiallyLoading?: boolean;
    loading?: boolean;
    resetKey?: string;
}
type useGetApiProps = Parameters<any>;
type useGetApiReturnType<apiTriggerProps, apiDataType> = {
    trigger: (triggerProps: apiTriggerProps) => void;
    data?: apiDataType;
    loading?: boolean | undefined;
    success?: boolean | undefined;
    error?: string | undefined;
    pagination?: responsePagination;
};
type usePaginatedGetProps<apiTriggerProps, apiDataType> = {
    useGetApi: (useGetApiProps?: useGetApiProps) => useGetApiReturnType<apiTriggerProps, apiDataType>;
    useGetApiProps?: useGetApiProps;
}

export const usePaginatedGet = <apiTriggerProps = unknown, apiDataType = unknown, itemType = unknown>(props: usePaginatedGetProps<apiTriggerProps, apiDataType>) => {
    const getApi = props.useGetApi(props.useGetApiProps);
    const [states, setStates] = useState<states<itemType>>({});

    const handles = {
        reset: () => {
            setStates({
                resetKey: getNewKey(),
            });
        },
        trigger: getApi.trigger,
        addItem: (newItem: itemType) => {
            setStates((prev) => ({
                ...prev,
                items: [
                    ...prev.items || [],
                    newItem,
                ],
            }));
        },
        updateItem: (i: number, itemProps?: Partial<itemType> | any) => {
            if(states.items?.length && i in states.items){
                const newItems = [
                    ...states.items,
                ]
                newItems[i] = {
                    ...newItems[i],
                    ...itemProps,
                }
                setStates(prev => ({
                    ...prev,
                    items: newItems,
                }));
            }
        },
    };

    useEffect(() => {
        const newStates = {...states};
        if((newStates.initiallyLoading === undefined || newStates.initiallyLoading === true) && getApi?.loading !== undefined){
            newStates.initiallyLoading = getApi?.loading;
        }

        if(getApi?.loading === false && getApi?.success){
            newStates.pagination = getApi?.pagination;
            if(getApi.data && Array.isArray(getApi.data)){
                newStates.items = [
                    ...(
                        Array.isArray(newStates.items) ? newStates.items :
                        []
                    ),
                    ...(getApi?.data || []),
                ];
            }
            else if(getApi.data && typeof getApi.data === 'object' && 'items' in getApi.data){
                if(Array.isArray(getApi?.data?.items)){
                    newStates.items = [
                        ...(
                            Array.isArray(newStates.items) ? newStates.items :
                            []
                        ),
                        ...(getApi?.data?.items || []),
                    ];
                }
                else {
                    newStates.items = {
                        ...(newStates.items || []),
                        ...(getApi?.data?.items || []),
                    };
                }
            }
        }
        setStates({...newStates});
    }, [getApi?.loading]);

    return {
        ...handles,
        ...states,
        loading: getApi?.loading,
    }
}