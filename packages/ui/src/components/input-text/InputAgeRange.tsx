
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import BlandDropdown, { BlandDropdownProps, menuPosition } from "../dropdown/BlandDropdown";
import Icon from "../icon/Icon";
import InputText from "./InputText";

// type changeProps = {
//     min?: number | string;
//     max?: number | string;
// }
type InputAgeRangeProps = ComponentPrimitiveProps & {
    handle?: BlandDropdownProps['handle'];
    menuPosition?: menuPosition;
    defaultValues?: {
        min?: string;
        max?: string;
    };
    // onChange?: (changeProps: changeProps) => void;
    onMinChange?: (value?: number | string) => void;
    onMaxChange?: (value?: number | string) => void;
}
const InputAgeRange = (props: InputAgeRangeProps) => {

    const handles = {
        onChange: (name: 'min' | 'max', value?: string) => {
            if(props.onMinChange && name === 'min') props.onMinChange(value);
            if(props.onMaxChange && name === 'max') props.onMaxChange(value);
            // if(props.onChange) props.onChange({
            //     [name]: value,
            // });
        },
    };

    return (
        <BlandDropdown
            className={`${props.className || ''}`}
            handle={{
                ...props.handle,
                className: `${props.handle?.className || ''} flex items-center justify-between`,
                children: props.handle?.children ?? <>
                    <span className="text-black">Age</span>
                    <Icon
                        iconName="ChevronDown"
                        className="stroke-[1px] stroke-black ml-2"
                        size={18}
                    />
                </>,
            }}
            // defaultOpen={states.open}
            renderMenu={(renderProps) => {
                return {
                    position: props.menuPosition,
                    children: <>
                        <div className={`${renderProps.open ? 'p-4' : ''}`}>
                            <div>
                                Input age range
                            </div>
                            <InputText
                                className="mt-4 border-[1px] border-black rounded-md px-2 py-2"
                                autoFocus
                                placeholder="min age"
                                defaultValue={props.defaultValues?.min}
                                type="number"
                                onChange={(value) => {
                                    handles.onChange('min', value);
                                }}
                            />
                            <InputText
                                className="mt-2 border-[1px] border-black rounded-md px-2 py-2"
                                placeholder="max age"
                                defaultValue={props.defaultValues?.max}
                                type="number"
                                onChange={(value) => {
                                    handles.onChange('max', value);
                                }}
                            />
                        </div>
                    </>
                };
            }}
        />
    );
}

export default InputAgeRange;