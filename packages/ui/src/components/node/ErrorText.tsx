
import { ComponentPrimitiveProps } from "../../utils/types/global.types";

type ErrorTextProps = ComponentPrimitiveProps & {
    children?: React.ReactNode;
}

const ErrorText = (props: ErrorTextProps) => {

    return (
        <div className={`${props.className || ''} text-redVar1`}>
            {props.children}
        </div>
    );
}

export default ErrorText;