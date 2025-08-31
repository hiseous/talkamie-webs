
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import Loader from "./Loader";

type LoadingTextProps = ComponentPrimitiveProps & {
    text?: string;
}
const LoadingText = (props: LoadingTextProps) => {
    return (
        <div className={`${props.className || ''} flex items-center w-[fit-content] mx-auto italic`}>
            <Loader text="" />
            <span className="pl-2">{props.text || `loading...`}</span>
        </div>
    )
}

export default LoadingText;