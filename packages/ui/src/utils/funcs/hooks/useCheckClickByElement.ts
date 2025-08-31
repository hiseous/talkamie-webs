'use client';

import { RefObject, useCallback, useEffect, useState } from "react";

interface useCheckClickByElementProps {
    elementRef?: RefObject<HTMLElement | null>;
}

export const useCheckClickByElement = (props?: useCheckClickByElementProps) => {
    const [canCheck, setCanCheck] = useState<boolean | undefined>(undefined);
    const [states, setStates] = useState({
        onElement: undefined as boolean | undefined,
        key: '',
    });

    const checkClick = useCallback((e: MouseEvent) => {
        const newStates = {...states};

        const element = props?.elementRef?.current;

        const arbitraryNode = e.target as Node | null;
        if(element){
            //since parent exist;
            if(!element.contains(arbitraryNode)){
                newStates.onElement = false;
                // console.log('outta box');
            }
            else {
                newStates.onElement = true;
                // console.log('uh, in box?')
            }
        }
        else {
            newStates.onElement = undefined;
            // console.log(`can't decide`)
        }

        newStates.key = `${Date.now()}`;
        setStates(newStates);
    }, []);
    
    useEffect(() => {
        if(canCheck){
            document.addEventListener('click', checkClick);
        }
        else {
            document.removeEventListener('click', checkClick);
        }
    }, [canCheck]);

    return {
        key: states.key,
        onElement: states.onElement,
        setCanCheck,
    }
}