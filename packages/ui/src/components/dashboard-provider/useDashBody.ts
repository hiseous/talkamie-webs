import { useState } from "react";
import { getContainerScrollDistance, getContainerScrollDistanceReturnProps } from "../../utils/funcs/dom/scroll";
import { useDebounce } from "../../utils/funcs/debounce/useDebounce";

type fromProps = getContainerScrollDistanceReturnProps['from'];
type states = {
    scrollEventOnPage?: boolean;
    scrollDistanceFrom?: fromProps;
}

export const useDashBody = () => {
    // const pathname = usePathname();
    const [states, setStates] = useState<states>({});
    const debounce = useDebounce();
    
    const handles = {
        changeFromPropsDebouncely: (fromProps?: fromProps) => {
            const debouncedQuery = debounce.trigger(() => {
                setStates(prev => {
                    if(prev.scrollEventOnPage){
                        prev.scrollDistanceFrom = fromProps;
                    }

                    return {...prev};
                })
            }, 500);
            debouncedQuery();
        },
        onScroll: (e:  React.UIEvent<HTMLDivElement, UIEvent>) => {
            const fromProps = getContainerScrollDistance(e.currentTarget).from;
            handles.changeFromPropsDebouncely(fromProps)
        },
        switchScrollEvent: (on = true) => {
            setStates(prev => {
                if(prev.scrollEventOnPage !== on) prev.scrollEventOnPage = on;
                if(!on) prev.scrollDistanceFrom = undefined;
                return {...prev};
            })
        },
        addScrollEvent: () => handles.switchScrollEvent(true),
        removeScrollEvent: () => handles.switchScrollEvent(false),
    };
    
    // useEffect(() => {
    //     setStates(prev => {
    //         if(prev.scrollEventOnPage){
    //             prev.scrollEventOnPage = false;
    //             prev.scrollDistanceFrom = undefined;
    //         }
    //         return {...prev};
    //     })
    // }, [pathname]);

    return {
        ...states,
        ...handles,
    };
};