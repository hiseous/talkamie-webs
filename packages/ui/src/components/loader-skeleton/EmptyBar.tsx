import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import EmptyNode from "./EmptyNode";

type EmptyBarProps = ComponentPrimitiveProps
const EmptyBar = (props: EmptyBarProps) => {
    return (
        <EmptyNode className={`${props.className || ''} h-4 rounded-xl`} />
    );
}

export default EmptyBar;