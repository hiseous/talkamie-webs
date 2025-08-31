// import { useEffect, useState } from "react";
// import { useDebounce } from "../../utils/funcs/debounce/useDebounce";
// import { usePaginatedGet } from "../../utils/api/usePaginatedGet";
// import { elementOf } from "../../utils/types/global.types";
// import { useGetUsersInConnectionApi, useGetUsersInConnectionApiRespData, useGetUsersInConnectionApiTriggerProps } from "../../utils/api/connections/get";

// type filterProps = {
//     keyword?: string;
// }
// export const useDashConnections = () =>  {
//     const [filter, setFilter] = useState<filterProps>({});
//     const debounce = useDebounce();
//     const connections = usePaginatedGet<
//         useGetUsersInConnectionApiTriggerProps,
//         useGetUsersInConnectionApiRespData,
//         elementOf<useGetUsersInConnectionApiRespData>
//     >({
//         useGetApi: useGetUsersInConnectionApi,
//     });

//     const handles = {
//         getItems: () => {
//             connections.reset();
//             connections.trigger({
//                 query: {
//                     keyword: filter.keyword,
//                 }
//             });
//         },
//         onKeywordChange: (keyword?: string) => {
//             const debouncedQuery = debounce.trigger(() => {
//                 setFilter(prev => ({
//                     ...prev,
//                     keyword,
//                 }));
//             }, 1000);
//             debouncedQuery();
//         },
//     };
    
//     useEffect(() => {
//         handles.getItems();
//     }, [filter]);

//     return {
//         ...handles,
//         ...connections,
//         filter,
//     };
// };