// 'use client';

// import { useEffect, useState } from "react";
// import { getUsersData, getUsersTriggerProps, useGetUsersApi } from "../../utils/api/users/useGetUsersApi";
// import { useDebounce } from "../../utils/funcs/debounce/useDebounce";
// import { usePaginatedGet } from "../../utils/api/usePaginatedGet";
// import { elementOf } from "../../utils/types/global.types";
// import { userProps, userType } from "../../utils/types/user";

// type filterProps = Exclude<getUsersTriggerProps['query'], undefined>;
// type useSeniorsOrVolunteersProps = {
//     type?: userType;
// };

// export const useSeniorsOrVolunteers = (props?: useSeniorsOrVolunteersProps) => {
//     const volunteers = usePaginatedGet<getUsersTriggerProps, getUsersData, elementOf<getUsersData>>({
//         useGetApi: useGetUsersApi,
//     });
//     const debounce = useDebounce();
//     const [filter, setFilter] = useState<filterProps>({});
//     const searchFor = props?.type === 'senior' ? 'senior' : 'volunteer';
    
//     const handles = {
//         onKeywordChange: (keyword?: string) => {
//             const debouncedQuery = debounce.trigger(() => {
//                 setFilter(prev => ({
//                     ...prev,
//                     keyword,
//                 }));
//             }, 1000);
//             debouncedQuery();
//         },
//         onFilterChange: (filterName: keyof Exclude<getUsersTriggerProps['query'], undefined>, filterValue?: any) => {
//             setFilter(prev => ({
//                 ...prev,
//                 [filterName]: filterValue,
//             }));
//         },
//         resetFilters: () => {
//             setFilter(prev => ({
//                 keyword: prev.keyword,
//             }));
//         },
//         getVolunteers: () => {
//             volunteers.reset();
//             volunteers.trigger({
//                 query: {
//                     type: searchFor,
//                     ...filter,
//                 }
//             });
//         },
//         updateItem: (i: number, userProps?: Partial<userProps>) => {
//             volunteers.updateItem(i, userProps);
//         },
//     };
    
//     useEffect(() => {
//         handles.getVolunteers();
//     }, [filter]);

//     return {
//         ...handles,
//         volunteers,
//         searchFor,
//     };
// }