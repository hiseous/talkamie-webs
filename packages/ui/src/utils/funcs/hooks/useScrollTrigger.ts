import { useState } from "react";
import { useDebounce } from "../debounce/useDebounce";
import { getContainerScrollDistance, getContainerScrollDistanceReturnProps } from "../dom/scroll";
import { getNewKey } from "../string/string";

type fromProps = getContainerScrollDistanceReturnProps['from'];
type states = {
    node?: Element; //scrollable node;
    scrollEventOnPage?: boolean;
    scrollDistanceFrom?: fromProps;
    scrollChangeKey?: string;
}
type scrollProps = Pick<states, 'node'>;

export const useScrollTriggerOnNode = () => {
    const [states, setStates] = useState<states>({});
    const debounce = useDebounce();
    
    const handles = {
        changeFromPropsDebouncely: (node?: Element, fromProps?: fromProps) => {
            const debouncedQuery = debounce.trigger(() => {

                setStates(prev => {
                    prev.node = node;

                    if(prev.scrollEventOnPage){
                        prev.scrollDistanceFrom = fromProps;
                        prev.scrollChangeKey = getNewKey();
                    }
                    
                    return {...prev};
                })
            }, 500);
            debouncedQuery();
        },
        onScroll: (scrollProps?: scrollProps) => {
            const fromProps = getContainerScrollDistance(scrollProps?.node).from;
            handles.changeFromPropsDebouncely(scrollProps?.node, fromProps)
        },
        switchScrollEvent: (on = true) => {
            setStates(prev => {
                if(prev.scrollEventOnPage !== on) prev.scrollEventOnPage = on;
                // if(!on)
                prev.scrollDistanceFrom = undefined;
                return {...prev};
            })
        },
        addScrollEvent: () => handles.switchScrollEvent(true),
        removeScrollEvent: () => handles.switchScrollEvent(false),
    };

    return {
        ...states,
        ...handles,
    };
};