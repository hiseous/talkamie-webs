import { __classNames } from "../../utils/constants/classNames";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import IconWrapper from "../icon/IconWrapper";

type ControlledCheckboxProps = ComponentPrimitiveProps & {
    checked?: boolean;
    size?: number;
    onClick?: () => void;
};

const ControlledCheckbox = (props: ControlledCheckboxProps) => {
    
    return (
        <IconWrapper
            className={`${props.className || ''} border-[1px] fill-white rounded-sm ${__classNames.transition}
                ${props.checked ? 'border-transparent bg-redVar1' : '[&_*]:opacity-0 border-blackVar4'}
            `}
            iconName="Check"
            iconSize={props.size ?? 17}
            onClick={props.onClick}
        />
    );
}

export default ControlledCheckbox;