import { useState } from "react";
import { useDebounce } from "../../utils/funcs/debounce/useDebounce";

type filter = {
    keyword?: string;
    changed?: boolean;
}
export const useDashSchedulesUtils = () => {
    const debounce = useDebounce();
    const [filter, setFilter] = useState<filter>({});
    const handles = {
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