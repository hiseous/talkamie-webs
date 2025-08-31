import { ComponentPrimitiveProps } from "../../utils/types/global.types";

export type InputLabelProps = ComponentPrimitiveProps & {
    children?: React.ReactNode;
};

const InputLabel = (props: InputLabelProps) => {
    
    return (
        <div
            className={`${props.className || ''} font-medium text-blackVar1`}
        >
            {props.children}
        </div>
    );
}

export default InputLabel;