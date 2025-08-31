'use client';

import { useEffect, useRef, useState } from "react";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { __classNames } from "../../utils/constants/classNames";
import { useCheckClickByElement } from "../../utils/funcs/hooks/useCheckClickByElement";
import { elementIsCloseToScreenPart } from "../../utils/funcs/viewport";

type handleProps = ComponentPrimitiveProps & {
    children?: React.ReactNode;
    onClick?: () => void;
}
export type menuPosition = {
    x?: 'left' | 'right' | 'center' | 'left sm:right' | 'auto';
    y?: 'bottom' | 'top' | 'center' | 'auto';
};
export type blandDropdownMenuProps = handleProps & {
    classNameOnOpen?: string;
    keepOpenAfterClick?: boolean;
    position?: menuPosition;
};
type renderProps = {
    open?: boolean;
    closeMenu?: () => void;
}

export type BlandDropdownProps = ComponentPrimitiveProps & {
    disableClick?: boolean;
    handle?: handleProps;
    // defaultOpen?: boolean;
    onOpenChange?: (opened: boolean) => void;
    renderMenu?: (renderProps: renderProps) => blandDropdownMenuProps;
}
const BlandDropdown = (props: BlandDropdownProps) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const handleRef = useRef<HTMLDivElement>(null);
    const checkClick = useCheckClickByElement({
        elementRef,
    });
    const [states, setStates] = useState({
        open: false,
    });
    const menu = (
        props.renderMenu ?
        props.renderMenu({
            open: states.open,
            closeMenu: () => {
                setStates(prev => ({
                    ...prev,
                    open: false,
                }));
            },
        }) :
        undefined
    );
    const [menuPositionX, setMenuPositionX] = useState(menu?.position?.x);
    const [menuPositionY, setMenuPositionY] = useState(menu?.position?.y);
    
    const handles = {
        // closeMenu: () => {
        //     if(states.open){
        //         setStates(prev => ({
        //             ...prev,
        //             open: false,
        //         }));
        //     };
        // },
        getMenuPositionX: (element: Element) => {
            const closeToX = elementIsCloseToScreenPart(element).closeTo.x;
            const menuPositionX = (
                menu?.position?.x === 'auto' ? (
                    closeToX === 'right' ? 'left' :
                    'right'
                ) :
                menu?.position?.x ?? 'left'
            );
            return menuPositionX;
        },
        getMenuPositionY: (element: Element) => {
            const closeToY = elementIsCloseToScreenPart(element).closeTo.y;
            const menuPositionY = (
                menu?.position?.y === 'auto' ? (
                    closeToY === 'bottom' ? 'top' :
                    'bottom'
                ) :
                menu?.position?.y
            );
            return menuPositionY;
        },
        getNSetMenuPositionX: (element: Element) => {
            const x = handles.getMenuPositionX(element);
            setMenuPositionX(x);
        },
        getNSetMenuPositionY: (element: Element) => {
            const y = handles.getMenuPositionY(element);
            setMenuPositionY(y);
        },
    };
    
    useEffect(() => {
        if(handleRef.current){
            handles.getNSetMenuPositionX(handleRef.current);
            handles.getNSetMenuPositionY(handleRef.current);
        }
    }, [handleRef.current]);
    // useEffect(() => {
    //     if(props.defaultOpen !== states.open){
    //         setStates(prev => ({
    //             ...prev,
    //             open: props.defaultOpen ?? false,
    //         }));
    //     }
    // }, [props.defaultOpen]);
    useEffect(() => {
        checkClick.setCanCheck(states.open);
        if(props.onOpenChange) props.onOpenChange(states.open);
    }, [states.open]);
    useEffect(() => {
        if(checkClick.onElement === false){
            setStates({
                ...states,
                open: false,
            });
        }
    }, [checkClick.key]);

    return (
        <div
            ref={elementRef}
            className={`${props.className || ''} relative`}
        >
            <div
                ref={handleRef}
                onClick={(e) => {
                    if(!props.disableClick){
                        const newOpen = !states.open;
                        handles.getNSetMenuPositionY(e.currentTarget);
                        setStates({
                            ...states,
                            open: newOpen,
                        });
                        if(props.handle?.onClick) props.handle.onClick();
                    }
                }}
                className={`${props.handle?.className || ''} cursor-pointer`}
            >
                {props.handle?.children}
            </div>
            <div
                onClick={menu?.onClick}
                className={`${menu?.className || ''} absolute bg-white dark:bg-gray800 text-gray800 dark:text-gray200 font-medium w-[max-content] rounded-md border-[1px]
                    ${__classNames.transition} border-transparent dark:border-gray700 shadow-2xl shadow-gray900/[.2]
                    ${
                        menuPositionX === 'right' ? `right-0` :
                        menuPositionX === 'left' ? `left-0` :
                        menuPositionX === 'left sm:right' ? `left-0 sm:left-[unset] sm:right-0` :
                        `${__classNames.posCenterX}`
                    }
                    ${
                        menuPositionY === 'top' ? `bottom-[calc(100%+8px)]` :
                        menuPositionY === 'center' ? `${__classNames.posCenterY}` :
                        `top-[calc(100%+8px)]`
                    }
                    ${
                        states.open ? `z-[2] ${menu?.classNameOnOpen || ''}` :
                        `opacity-0 h-0 overflow-y-hidden`
                    }
                `}
            >
                {menu?.children}
            </div>
        </div>
    );
}

export default BlandDropdown;