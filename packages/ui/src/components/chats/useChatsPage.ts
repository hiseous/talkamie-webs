// import { useEffect, useState } from "react";
// import { useDebounce } from "../../utils/funcs/debounce/useDebounce";
// import { usePaginatedGet } from "../../utils/api/usePaginatedGet";
// import { elementOf } from "../../utils/types/global.types";
// import { useGetChatsApi, useGetChatsApiRespData, useGetChatsApiTriggerProps } from "../../utils/api/chats/get";

// type filterProps = {
//     keyword?: string;
//     tab?: 'favourite' | 'unread';
// }
// export const useChatsPage = () =>  {
//     const [filter, setFilter] = useState<filterProps>({});
//     const debounce = useDebounce();
//     const chats = usePaginatedGet<
//         useGetChatsApiTriggerProps,
//         useGetChatsApiRespData,
//         elementOf<useGetChatsApiRespData>
//     >({
//         useGetApi: useGetChatsApi,
//     });

//     const handles = {
//         getItems: () => {
//             chats.reset();
//             chats.trigger({
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
//         onTabChange: (tab?: filterProps['tab']) => {
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
//         chats,
//         filter,
//     };
// };