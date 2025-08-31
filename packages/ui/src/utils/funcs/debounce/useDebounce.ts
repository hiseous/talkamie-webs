import { useRef } from "react";

export const useDebounce = () => {
    // let timeoutId: number | undefined;
    const timeoutId = useRef<NodeJS.Timeout | undefined>(undefined);

    const handles = {
        trigger: (func: Function, delay: number) => {
        
            return (...args: Parameters<any>) => {
                if(timeoutId.current) clearTimeout(timeoutId.current);
        
                timeoutId.current = setTimeout(() => {
                    func(...args);
                }, delay);
            };
        },
        clear: () => {
            if(timeoutId.current) clearTimeout(timeoutId.current);
        },
    };

    return {
        ...handles,
    };
};