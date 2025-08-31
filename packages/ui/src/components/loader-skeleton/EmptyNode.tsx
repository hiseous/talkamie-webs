import { ComponentPrimitiveProps } from "../../utils/types/global.types";

type EmptyNodeProps = ComponentPrimitiveProps
const EmptyNode = (props: EmptyNodeProps) => {
    return (
        <div className={`${props.className || ''} bg-grayVar2`}
        ></div>
    );
}

export default EmptyNode;