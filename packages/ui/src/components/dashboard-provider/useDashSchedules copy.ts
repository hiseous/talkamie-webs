// import { useEffect, useState } from "react";
// import { queryPaginationProps } from "../../utils/types/global.types";
// import { scheduleProps } from "../../utils/types/schedule";
// import { useGetSchedulesApi } from "../../utils/api/schedules/get";
// import { apiSchedulesSubpath } from "../../utils/types/api";

// type filterProps = {
//     type?: apiSchedulesSubpath;
// }
// type states = {
//     initiallyLoading?: boolean;
//     items?: scheduleProps[];
//     pagination?: queryPaginationProps;
//     wasTriggered?: boolean;
// }
// export const useDashSchedules = () =>  {
//     // const debounce = useDebounce();
//     const getApi = useGetSchedulesApi();
//     const [states, setStates] = useState<states>({});
//     const [filter] = useState<filterProps>({});
//     // const filter = useRef<filterProps>({});

//     const handles = {
//         getItems: (reset?: boolean) => {
//             setStates(prev => {
//                 if(reset){
//                     prev = {};
//                 }
//                 else {
//                     prev.wasTriggered = true;
//                 }
//                 getApi.trigger({
//                     subpath: filter.type,
//                     query: {
//                         // keyword: filter.keyword,
//                         lastEvaluatedKey: prev.pagination?.lastEvaluatedKey,
//                         pageSize: 20,
//                     }
//                 });

//                 return {...prev};
//             })
//         },
//         // onKeywordChange: (keyword?: string) => {
//         //     const debouncedQuery = debounce.trigger(() => {
//         //         setFilter(prev => ({
//         //             ...prev,
//         //             keyword,
//         //         }));
//         //     }, 1000);
//         //     debouncedQuery();
//         // },
//     };
    
//     // useEffect(() => {
//     //     if(localUser?.id && states.wasTriggered){
//     //         handles.getItems(true);
//     //     }
//     // }, [filter]);
//     useEffect(() => {
//         if(getApi.loading !== undefined){
//             setStates(prev => {
//                 if(getApi.success){
//                     prev.pagination = getApi.pagination;
//                     prev.items = [
//                         ...prev.items || [],
//                         ...getApi.data || [],
//                     ];
//                 }

//                 return {
//                     ...prev,
//                     initiallyLoading: [undefined, true].includes(prev.initiallyLoading) ? getApi.loading : prev.initiallyLoading,
//                 }
//             });
//         }
//     }, [getApi.loading]);

//     return {
//         ...handles,
//         ...states,
//         filter,
//         loading: getApi.loading,
//     };
// };