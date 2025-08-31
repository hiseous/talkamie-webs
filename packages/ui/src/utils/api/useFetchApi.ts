'use client';

import { useEffect, useState } from "react";
import { objectToFormData } from "../funcs/object/object-as-params";
import { getLocalUserStorage } from "../../components/local-user-provider/local-user-storage";
import { useToastMessage } from "../funcs/hooks/useToastMessage";
import axios from "axios";

type triggerProps = {
    url: string;
    method?: 'get' | 'post' | 'put' | 'delete';
    contentType?: 'json' | 'form-data';
    body?: Record<string, any>;
    headers?: Parameters<typeof axios.request>[0]['headers'];
}
type lastEvaluatedKey = Record<string, any>;
export type responsePagination = {
    lastEvaluatedKey?: lastEvaluatedKey;
    totalItems?: number;
};
export type response<dataType = unknown> = {
    loading?: boolean;
    // initiallyLoading?: boolean;
    success?: boolean;
    statusCode?: number;
    error?: string;
    message?: string;
    data?: dataType;
    pagination?: responsePagination;
}
export type useFetchApiProps = {
    key?: string;
    useToastError?: boolean; //default is true;
    useToastSuccess?: boolean;
    fallBackToastError?: string;
    toastSuccessMessage?: boolean;
    doNotToastErrorOnStatusCodes?: number[];
}

export const useFetchApi = <respDataType = unknown>(props?: useFetchApiProps) => {
    const [response, setResponse] = useState<Partial<response<respDataType>>>({});
    const toastMessage = useToastMessage();
    const handles = {
        trigger: async (thisProps: triggerProps) => {
            setResponse({
                loading: true,
                // initiallyLoading: (
                //     response.initiallyLoading === undefined ? true : false
                // ),
            });

            const method = thisProps.method || 'get';
            let url = thisProps.url;
            // + (
            //     method === 'get' && thisProps.body ? `?${objectToQueryParams(thisProps.body)}` :
            //     ``
            // );
            if(method === 'get'){
                if(thisProps.body){
                    let queryParams = '';
                    Object.entries(thisProps.body).map(([name, value]) => {
                        let valueStr = (
                            (value === undefined || typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') ? value :
                            encodeURIComponent(JSON.stringify(value))
                        )
                        
                        queryParams += `${queryParams ? '&' : ''}${name}=${valueStr ?? ''}`;
                    })
                    if(queryParams){
                        url += `?${queryParams}`;
                    }
                };
            }
            const contentType = (
                thisProps.contentType === 'form-data' ? undefined :
                // thisProps.contentType === 'form-data' ? 'multipart/form-data' :
                // thisProps.contentType === 'urlencoded' ? 'application/x-www-form-urlencoded' :
                'application/json'
            );
            
            axios.request({
                url,
                withCredentials: true,
                method,
                data: (
                    thisProps.body && method !== 'get' ? (
                        thisProps.contentType === 'form-data' ? objectToFormData(thisProps.body) :
                        JSON.stringify(thisProps.body)
                    ) :
                    undefined
                ),
                headers: {
                    ...(
                        contentType ? {
                            'Content-Type': contentType,
                            'Accept': contentType,
                        } : {}
                    ),
                    'Authorization': `Bearer ${getLocalUserStorage()?.accessToken}`,
                    'x-user-timezone-offset': new Date().getTimezoneOffset(),
                    ...thisProps.headers,
                },
            }).then (resp => {
                const newResponse = {...response};
                newResponse.loading = false;
                const apiResponse = resp.data;
                newResponse.data = apiResponse?.data;
    
                console.log(apiResponse, url, method)
    
                newResponse.pagination = apiResponse?.pagination;
                newResponse.success = apiResponse?.success || false;
                if(newResponse.success){
                    newResponse.message = apiResponse?.message;
                }
                else {
                    newResponse.error = apiResponse?.error || apiResponse?.message;
                }

                setResponse({...newResponse});

            }).catch(err => {
                console.log(err, err.response?.data, err.stack, thisProps);
                // console.log(err.response?.data);
    
                let errorMsg = err.response?.data?.error || err.response?.data?.message || err.message;
    
                if(err.code?.toLowerCase() === 'err_network'){
                    errorMsg = `please check your internet connection`;
                }
                
                setResponse({
                    loading: false,
                    // initiallyLoading: false,
                    success: false,
                    error: errorMsg,
                });
            });
        },
        toastError: toastMessage.error,
        toastSuccess: toastMessage.success,
        updateResponse: (newResponse: Partial<response<respDataType>>) => {
            setResponse(prev => ({
                ...prev,
                ...newResponse,
            }));
        },
    };

    useEffect(() => {
        if(props?.key){
            setResponse({});
        }
    }, [props?.key]);
    useEffect(() => {
        if(response.loading === false){
            if(!response.success && props?.useToastError !== false && !(response.statusCode && props?.doNotToastErrorOnStatusCodes?.includes(response.statusCode))){
                const error = response.error ?? props?.fallBackToastError ?? 'something went wrong';
                if(error){
                    handles.toastError(error);
                }
            }
            else if(response.success && props?.toastSuccessMessage && response.message){
                handles.toastSuccess(response.message);
            }
        }
    }, [response.loading]);

    return {
        ...handles,
        ...response,
        data: response.data as respDataType | undefined,
    };
};