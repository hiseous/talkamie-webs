'use client';

import { ComponentProps, useState } from "react";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { __classNames } from "../../utils/constants/classNames";
import Dropdown, { menuItem } from "../dropdown/Dropdown";
import DropdownMenuItems from "../dropdown/DropdownMenuItems";
import { usePopUp } from "../pop-up-provider/usePopUpContext";
import ModalWrapper from "../modal/ModalWrapper";
import Icon from "../icon/Icon";

type InputSelectOptionsModalProps = ComponentPrimitiveProps & {
    menuItems: menuItem[];
    filterPlaceholder?: string;
    placeholder?: React.ReactNode;
    handleClassName?: string;
    onChange?: ComponentProps<typeof Dropdown>['onChange'];
}
const InputSelectOptionsModal = (props: InputSelectOptionsModalProps) => {
    const popUp = usePopUp();
    const [states, setStates] = useState({
        open: false,
        menuItem: undefined as menuItem | undefined,
        // handle: props.renderHandle() as handleProps,
        filterSearchValue: undefined as string | undefined,
    });

    const selectItem = (menuItemIndex: number, initially?: boolean) => {
        const menuItem = props.menuItems[menuItemIndex];
        if(menuItem){
            const changeProps = {
                index: menuItemIndex,
                menuItem,
            };
            const open = (
                initially ? false :
                menuItem.keepMenuOpenAfterClick ?? false
            );

            setStates({
                ...states,
                open,
                menuItem,
                // handle: props.renderHandle(changeProps),
            });
            if(menuItem.onClick && !initially) menuItem.onClick();
            if(props.onChange) props.onChange(changeProps);
        }

        popUp?.reset();
    }

    return (
        <div
            className={`${props.className || ''}`}
            onClick={() => {
                popUp?.set({
                    nodes: [
                        <>
                            <ModalWrapper
                                className={`${__classNames.maxWidthA} !px-0`}
                            >
                                <DropdownMenuItems
                                    menuItems={props.menuItems}
                                    useFilterInput
                                    autoFilterSearchFocus
                                    filterPlaceholder={props.filterPlaceholder}
                                    className="max-h-[280px] px-4 [&>*]:!mt-0 overflow-y-auto customScrollbar"
                                    onSelectItem={selectItem}
                                />
                            </ModalWrapper>
                        </>
                    ],
                });
            }}
        >
            <div className={`${props.handleClassName || ''} flex items-center fill-grayVar3`}>
                <div className={`flex-1 pr-2`}>{states.menuItem?.checkedLabel || states.menuItem?.label || props.placeholder}</div>
                <Icon
                    iconName="ChevronDown"
                    size={14}
                />
            </div>
        </div>
    );
}

export default InputSelectOptionsModal;