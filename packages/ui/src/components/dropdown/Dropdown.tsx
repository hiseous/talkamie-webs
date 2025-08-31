'use client';

import { useEffect, useState } from "react";
import BlandDropdown, { blandDropdownMenuProps, BlandDropdownProps } from "./BlandDropdown";
import DropdownMenuItems from "./DropdownMenuItems";

export type menuItem = {
    label: React.ReactNode;
    checkedLabel?: React.ReactNode;
    href?: string;
    defaultChecked?: boolean;
    keepMenuOpenAfterClick?: boolean
    loading?: boolean;
    value?: string | number;
    className?: string;
    onClick?: () => void;
}
type changeProps = {
    index: number;
    menuItem: menuItem;
}

export type DropdownProps = BlandDropdownProps & {
    menu?: blandDropdownMenuProps & {
        items?: menuItem[];
        useDefaultIndex?: boolean;
    };
    useFilterInput?: boolean;
    filterPlaceholder?: string;
    renderHandle: (changeProps?: changeProps) => BlandDropdownProps['handle'];
    onChange?: (changeProps: changeProps) => void;
    onOpenChange?: (opened: boolean) => void;
}
const Dropdown = (props: DropdownProps) => {
    const [states, setStates] = useState({
        // open: false,
        menuItem: undefined as menuItem | undefined,
        handle: props.renderHandle() as BlandDropdownProps['handle'],
        filterSearchValue: undefined as string | undefined,
    });
    
    const handles = {
        selectItem: (menuItemIndex: number, initially?: boolean) => {
            const menuItem = props.menu?.items?.length ? props.menu.items[menuItemIndex] : undefined;
            if(menuItem){
                const changeProps = {
                    index: menuItemIndex,
                    menuItem,
                };
                // const open = (
                //     initially ? false :
                //     menuItem.keepMenuOpenAfterClick ?? props.menu?.keepOpenAfterClick ?? false
                // );

                setStates({
                    ...states,
                    // open,
                    menuItem,
                    handle: props.renderHandle(changeProps),
                });
                if(menuItem.onClick && !initially) menuItem.onClick();
                if(props.onChange) props.onChange(changeProps);
            }
        },
    };
    
    useEffect(() => {
        let index: number | undefined = undefined;
        if(props.menu?.useDefaultIndex !== false){
            index = 0;
        }

        if(props.menu?.items?.length){
            for(let i = 0; i < props.menu.items.length; i++){
                const menuItem = props.menu.items[i];
                if(menuItem.defaultChecked){
                    index = i;
                    break;
                }
            }
        }
        
        if(typeof index === 'number'){
            handles.selectItem(index, true);
        }
    }, []);

    return (
        <BlandDropdown
            className={`${props.className || ''}`}
            handle={states.handle}
            // defaultOpen={states.open}
            renderMenu={(renderProps) => {
                return {
                    ...props.menu,
                    children: <>
                        <DropdownMenuItems
                            key={renderProps.open ? '1' : '0'}
                            menuItems={props.menu?.items || []}
                            useFilterInput={props.useFilterInput}
                            filterPlaceholder={props.filterPlaceholder}
                            autoFilterSearchFocus={renderProps.open}
                            onSelectItem={(itemIndex) => {
                                if(renderProps.closeMenu) renderProps.closeMenu();
                                handles.selectItem(itemIndex);
                            }}
                            className={`${renderProps.open ? 'px-4 pb-4' : ''} overflow-y-auto customScrollbar`}
                        />
                    </>
                };
            }}
        />
    );
}

export default Dropdown;