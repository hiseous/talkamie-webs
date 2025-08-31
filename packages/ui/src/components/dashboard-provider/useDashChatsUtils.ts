import { useState } from "react";
import { useDebounce } from "../../utils/funcs/debounce/useDebounce";

type filter = {
    keyword?: string;
    changed?: boolean;
}
export const useDashChatsUtils = () => {
    const debounce = useDebounce();
    const [filter, setFilter] = useState<filter>({});
    const handles = {
        // updateFilter: (filterProps?: filter) => {
        //     setFilter(prev => ({
        //         ...prev,
        //         ...filterProps,
        //     }))
        // },
        onKeywordChange: (keyword?: string) => {
            const debouncedQuery = debounce.trigger(() => {
                setFilter(prev => ({
                    ...prev,
                    keyword,
                    changed: true,
                }));
            }, 1000);
            debouncedQuery();
        },
    };

    return {
        ...handles,
        filter,
    };
};