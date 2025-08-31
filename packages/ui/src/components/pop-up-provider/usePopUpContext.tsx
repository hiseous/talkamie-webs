'use client';

import { useContext, useState } from "react";
import { PopUpContext } from "./PopUpProvider";
import { ModalUnderlayProps } from "../modal/ModalUnderlay";

type states = {
    nodes?: React.ReactNode[];
    underlay?: ModalUnderlayProps & {
        href?: string;
        onClick?: () => void;
    };
}

export const usePopUp = () => {
    return useContext(PopUpContext)
}
export const usePopUpContext = () => {
    const [states, setStates] = useState<states>({});

    const consts = {
        nodes: states.nodes,
        underlay: {
            props: states.underlay,
            setProps: (underlayProps?: ModalUnderlayProps) => {
                setStates(prev => ({
                    ...prev,
                    underlay: underlayProps,
                }))
            },
            reset: () => {
                consts.underlay.setProps(undefined);
            },
        },
        set: (newStates: states) => {
            setStates(newStates);
        },
        setNode: (node?: React.ReactNode) => {
            setStates(prev => ({
                ...prev,
                nodes: node ? [node] : undefined,
            }))
        },
        shiftNode: (node?: React.ReactNode) => {
            setStates(prev => ({
                ...prev,
                nodes: [
                    ...prev.nodes || [],
                    ...(node ? [node] : []),
                ],
            }))
        },
        popNode: () => {
            const newNodes: states['nodes'] = [...states.nodes || []];
            newNodes.splice(-1, 1);
            setStates(prev => ({
                ...prev,
                nodes: newNodes,
            }))
        },
        reset: () => {
            setStates({});
        },
    };
    
    return {
        ...consts,
    };
}