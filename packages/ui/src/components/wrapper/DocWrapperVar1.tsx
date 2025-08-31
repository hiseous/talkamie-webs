import { ComponentPrimitiveProps } from "../../utils/types/global.types";

type DocWrapperVar1Props = ComponentPrimitiveProps & {
    children?: React.ReactNode;
    style?: React.CSSProperties;
};

const DocWrapperVar1 = (props: DocWrapperVar1Props) => {
    
    return (
        <div
            style={props.style}
            className={`${props.className || ''} p-3`}>
            {props.children}
        </div>
    );
}

export default DocWrapperVar1;