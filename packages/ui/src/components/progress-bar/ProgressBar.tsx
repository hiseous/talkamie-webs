import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { __classNames } from "../../utils/constants/classNames";

type ProgressBarProps = ComponentPrimitiveProps & {
    currentIndex: number;
    totalLength: number;
}
const ProgressBar = (props: ProgressBarProps) => {
    
    return (
        <div
            style={{
                width: `calc((${props.currentIndex + 1} / ${props.totalLength}) * 100%)`,
            }}
            className={`${props.className || ''} ${__classNames.transition} h-[2px] bg-redVar1`}
        ></div>
    );
}

export default ProgressBar;