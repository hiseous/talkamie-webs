import { ComponentPrimitiveProps } from "../../utils/types/global.types";

const RedDot = (props: ComponentPrimitiveProps) => {
    return (
        <div
            className={`${props.className || ''} w-0 h-0 box-content p-1 bg-redVar1 rounded-full`}
        ></div>
    );
}

export default RedDot;