
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { menuPosition } from "../dropdown/BlandDropdown";
import Dropdown, { menuItem } from "../dropdown/Dropdown";
import Icon from "../icon/Icon";
import InputSelectOptionsModal from "./InputSelectOptionsModal";


export type inputSelectOption = {
    label?: React.ReactNode;
    checkedLabel?: React.ReactNode;
    defaultChecked?: boolean;
    value: string | undefined;
}
type inputSelectedOption = Omit<inputSelectOption, 'defaultChecked'>;
type changeProps = {
    value: string | undefined;
    selectedOption: inputSelectedOption | undefined;
    selectedIndex: number;
}

type InputSelectProps = ComponentPrimitiveProps & {
    displayOptionsAs?: 'dropdown' | 'pop-up';
    options: inputSelectOption[];
    placeholder?: React.ReactNode;
    menuPosition?: menuPosition;
    filterPlaceholder?: string;
    // optionsBoxClassName?: string;
    handleClassName?: string;
    useFilterInput?: boolean;
    menuClassName?: string;
    onChange?: (changeProps: changeProps) => void;
}

const InputSelect = (props: InputSelectProps) => {
    const menuItems = [
        ...(
            props.options.map((option) => {
                return {
                    label: option.label ?? option.value,
                    checkedLabel: option.checkedLabel,
                    defaultChecked: option.defaultChecked,
                    value: option.value,
                    className: `hover:bg-gray50 dark:hover:bg-gray700 px-2 py-4`,
                } as menuItem
            })
        )
    ];

    return (
        <>
            {
                props.displayOptionsAs === 'pop-up' ?
                <InputSelectOptionsModal
                    className={`${props.className || ''} cursor-pointer`}
                    menuItems={menuItems}
                    filterPlaceholder={props.filterPlaceholder}
                    placeholder={props.placeholder}
                    handleClassName={props.handleClassName}
                    onChange={(changeProps) => {
                        if(props.onChange) props.onChange({
                            value: changeProps.menuItem.value?.toString(),
                            selectedOption: {
                                value: changeProps.menuItem.value?.toString(),
                                label: changeProps.menuItem.label,
                            },
                            selectedIndex: changeProps.index,
                        });
                    }}
                /> :
                <Dropdown
                    className={`${props.className || ''} cursor-pointer`}
                    menu={{
                        className: `${props.menuClassName || ''} [&>*]:max-h-[280px] [&>*>*]:!mt-0`,
                        items: menuItems,
                        position: props.menuPosition,
                        useDefaultIndex: false,
                    }}
                    useFilterInput={props.useFilterInput}
                    filterPlaceholder={props.filterPlaceholder}
                    onChange={(changeProps) => {
                        if(props.onChange) props.onChange({
                            value: changeProps.menuItem.value?.toString(),
                            selectedOption: {
                                value: changeProps.menuItem.value?.toString(),
                                label: changeProps.menuItem.label,
                            },
                            selectedIndex: changeProps.index,
                        });
                    }}
                    renderHandle={(changeProps) => {
                        return {
                            className: `${props.handleClassName} flex items-center`,
                            children: <>
                                <div className={`flex-1 pr-2`}>
                                    {
                                        changeProps?.menuItem.checkedLabel
                                        || changeProps?.menuItem.label
                                        || <div className="text-grayVar3">{props.placeholder}</div>
                                    }
                                </div>
                                <Icon
                                    iconName="ChevronDown"
                                    className="stroke-[1px] stroke-black"
                                    size={18}
                                />
                                {/* <SvgAsset name="AngleDownSmall" /> */}
                            </>,
                        }
                    }}
                />
            }
        </>
    );
}

export default InputSelect;