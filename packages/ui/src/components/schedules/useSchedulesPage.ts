// import { useEffect, useState } from "react";
// import { useGetSchedulesApi, useGetSchedulesApiRespData, useGetSchedulesApiTriggerProps } from "../../utils/api/schedules/get";
// import { useDebounce } from "../../utils/funcs/debounce/useDebounce";
// import { usePaginatedGet } from "../../utils/api/usePaginatedGet";
// import { elementOf } from "../../utils/types/global.types";
// import { apiSchedulesSubpath } from "../../utils/types/api";

// type filterProps = {
//     keyword?: string;
//     tab?: apiSchedulesSubpath;
// }
// export const useSchedulesPage = () =>  {
//     const [filter, setFilter] = useState<filterProps>({});
//     const debounce = useDebounce();
//     const schedules = usePaginatedGet<
//         useGetSchedulesApiTriggerProps,
//         useGetSchedulesApiRespData,
//         elementOf<useGetSchedulesApiRespData>
//     >({
//         useGetApi: useGetSchedulesApi,
//     });

//     const handles = {
//         getItems: () => {
//             schedules.reset();
//             schedules.trigger({
//                 subpath: filter.tab,
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
//         onTabChange: (tab?: apiSchedulesSubpath) => {
//             setFilter(prev => ({
//                 ...prev,
//                 tab,
//             }));
//         },
//     };
    
//     useEffect(() => {
//         handles.getItems();
//     }, [filter]);

//     return {
//         ...handles,
//         schedules,
//         filter,
//     };
// };