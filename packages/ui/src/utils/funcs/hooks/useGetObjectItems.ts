'use client';

import { useEffect, useState } from "react";
import { response } from "../../api/useFetchApi";
import { findItemInObjectItems } from "../array/find";
import { itemId } from "../../types/global.types";
import { useDebounce } from "../debounce/useDebounce";
import { getNewKey } from "../string/string";

type getApi<triggerProps, responseDataItemType> = () => (
    response<responseDataItemType[]>
        & {
        trigger: (triggerProps: triggerProps) => void;
    }
)
// type getApi = <TArgs, TResult>(args: TArgs) => TResult


type states<itemType> = {
    items?: itemType[];
    pagination?: any;
    initiallyLoading?: boolean;
    loading?: boolean;
    wasTriggered?: boolean;
    keyword?: string;
    key?: string;
}
type handleGetProps<triggerProps> = {
    reset?: boolean;
    triggerProps?: triggerProps;
}

export type useGetObjectItemsProps<triggerProps, responseDataItemType> = {
    getApi?: getApi<triggerProps, responseDataItemType>;
}
export const useGetObjectItems = <
        triggerProps,
        itemType extends Record<itemId, any> = Record<itemId, any>
    >
(props: useGetObjectItemsProps<triggerProps, itemType>) => {
    const debounce = useDebounce();
    
    const getApi = props?.getApi ? props.getApi() : undefined;
    const [states, setStates] = useState<states<itemType>>({});

    const handles = {
        addOrReplaceItem: (item: itemType) => {
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
        get: (getProps?: handleGetProps<triggerProps>) => {
            setStates(prev => {
                if(getProps?.reset){
                    prev = {key: getNewKey()};
                }
                else {
                    prev.wasTriggered = true;
                }

                getApi?.trigger({
                    ...getProps?.triggerProps,
                    query: {
                        pageSize: 40,
                        lastEvaluatedKey: states.pagination?.lastEvaluatedKey,
                        ...((getProps?.triggerProps as any)?.query),
                    },
                } as any);

                return {...prev};
            })
        },
        onKeywordChange: (keyword?: string) => {
            const debouncedQuery = debounce.trigger(() => {
                setStates(prev => {
                    prev = {
                        keyword,
                    };

                    return {...prev};
                });
            }, 500);
            debouncedQuery();
        },
        reset: () => {
            setStates({key: getNewKey()});
        },
    };
    
    useEffect(() => {
        if(getApi?.loading !== undefined){
            setStates(prev => {
                prev.loading = getApi.loading;
                if(getApi?.success){
                    prev.pagination = getApi?.pagination;
                    prev.items = [
                        ...prev.items || [],
                        ...getApi?.data || [],
                    ];
                }

                return {
                    ...prev,
                    initiallyLoading: [undefined, true].includes(prev.initiallyLoading) ? getApi?.loading : prev.initiallyLoading,
                }
            });
        }
    }, [getApi?.loading]);

    return {
        ...handles,
        ...states,
    };
};