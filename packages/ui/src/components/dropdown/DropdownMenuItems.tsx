'use client';

import { useState } from "react";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import Loader from "../loader/Loader";
import NodeMayBeLink from "../node/NodeMayBeLink";
import { menuItem } from "./Dropdown";
import SearchBox from "../search/SearchBox";

type filterChangeProps = {
    searchValue?: string;
}
export interface DropdownMenuItemsProps extends ComponentPrimitiveProps {
    menuItems: menuItem[];
    useFilterInput?: boolean;
    filterPlaceholder?: string;
    defaultFilterSearchValue?: string;
    autoFilterSearchFocus?: boolean;
    onSelectItem?: (menuItemIndex: number, initially?: boolean) => void;
    onFilterChange?: (filterChangeProps: filterChangeProps) => void;
}
const DropdownMenuItems = (props: DropdownMenuItemsProps) => {
    const [states, setStates] = useState({
        filterSearchValue: props.defaultFilterSearchValue,
    });

    return (
        <div
            className={`${props.className || ''}`}
        >
            {
                props.useFilterInput ?
                <SearchBox
                    autoFocus={props.autoFilterSearchFocus}
                    placeholder={props.filterPlaceholder}
                    onChange={(searchValue) => {
                        if(props.onFilterChange) props.onFilterChange({
                            searchValue,
                        });
                        setStates({
                            ...states,
                            filterSearchValue: searchValue,
                        });
                    }}
                    className="mb-4 sticky top-0 !rounded-sm"
                /> :
                <></>
            }
            {
                props.menuItems.map((menuItem, i) => {
                    const filtered = (
                        !states.filterSearchValue ||
                        (
                            states.filterSearchValue
                            && (
                                menuItem.value?.toString().toLowerCase().includes((states.filterSearchValue.toLowerCase()))
                                || menuItem.label?.toString().toLowerCase().includes((states.filterSearchValue.toLowerCase()))
                            )
                        )
                    ) ? true : false;

                    if(filtered) return (
                        <NodeMayBeLink
                            key={i}
                            href={menuItem.href}
                            disabled={menuItem.loading}
                            onClick={() => {
                                if(props.onSelectItem) props.onSelectItem(i);
                            }}
                            className={`${menuItem.className || ''} ${i > 0 ? 'mt-5' : ''} flex items-center cursor-pointer
                                ${menuItem.loading ? 'italic opacity-[.6]' : ''}
                            `}
                        >
                            <div className="flex-1">{menuItem.label ?? menuItem.value}</div>
                            {
                                menuItem.loading === true &&
                                <Loader size={14} className="ml-2" />
                            }
                        </NodeMayBeLink>
                    )
                })
            }
            {
                (
                    props.useFilterInput && states.filterSearchValue &&
                    props.menuItems.filter((menuItem) => {
                        return (
                            menuItem.value?.toString().toLowerCase().includes(((states.filterSearchValue || '').toLowerCase()))
                            || menuItem.label?.toString().toLowerCase().includes(((states.filterSearchValue || '').toLowerCase()))
                        )
                    }).length === 0
                ) ?
                <div className="italic text-center text-gray400">no result</div> :
                <></>
            }
        </div>
    );
}

export default DropdownMenuItems;