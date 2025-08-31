import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type states = {
    hideMobileNavsOnPage?: boolean;
}
export const useDashNavs = () => {
    const pathname = usePathname();
    const [states, setStates] = useState<states>({});

    const handles = {
        updateStates: (statesProps?: states) => {
            setStates(prev => ({
                ...prev,
                ...statesProps,
            }))
        },
    };

    useEffect(() => {
        if(states.hideMobileNavsOnPage){
            setStates(prev => ({
                ...prev,
                hideMobileNavsOnPage: false,
            }))
        }
    }, [pathname]);

    return {
        ...states,
        ...handles,
    };
};