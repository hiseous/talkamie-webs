
import { __classNames } from "../../utils/constants/classNames";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";

interface ControlledToggleButtonProps extends ComponentPrimitiveProps {
    checked?: boolean;
    disabled?: boolean;
    onClick?: () => void;
}
const ControlledToggleButton = (props: ControlledToggleButtonProps) => {

    return (
        <div
            onClick={() => {
                if(!props.disabled && props.onClick) props.onClick();
            }}
            className={`${props.className || ''} relative w-[36px] md:w-[44px] h-[fit-content] box-content rounded-full p-[2px] ${__classNames.transition}
                ${props.checked ? 'bg-redVar1' : 'bg-grayVar5'}
                ${props.disabled ? 'cursor-not-allowed opacity-[.3]' : 'cursor-pointer'}
            `}
        >
            <div
                className={`
                    w-[18px] h-[18px] md:w-[22px] md:h-[22px] box-content rounded-full bg-white ${__classNames.transition}
                    ${props.checked ? 'translate-x-full' : 'translate-x-0'}
                `}
            ></div>
        </div>
    )
}
export default ControlledToggleButton;