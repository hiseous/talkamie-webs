'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { iconName } from "../icon/Icon";
import { useCheckbox } from "./useCheckbox";
import ControlledCheckbox from "./ControlledCheckbox";

export type CheckboxProps = ComponentPrimitiveProps & {
    iconName?: iconName;
    defaultChecked?: boolean;
    size?: number;
    onChange?: (checked?: boolean) => void;
}

const Checkbox = (props: CheckboxProps) => {
    const hook = useCheckbox(props);
    
    return (
        <ControlledCheckbox
            checked={hook.checked}
            onClick={hook.onClick}
            size={props.size}
        />
    )
}

export default Checkbox;