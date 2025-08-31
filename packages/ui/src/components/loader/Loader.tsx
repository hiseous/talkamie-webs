
import { __classNames } from "../../utils/constants/classNames";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import Icon from "../icon/Icon";

type LoaderProps = ComponentPrimitiveProps & {
    size?: number;
    text?: string;
}
const Loader = (props: LoaderProps) => {
    return (
        <div className={`${props.className || ''} flex items-center justify-center`}>
            <Icon
                size={props.size ?? 32}
                iconName="ArrowRepeat"
                className={`${__classNames.transition} animate-spin`}
            />
            <span className="pl-2">{props.text ?? `loading...`}</span>
        </div>
    )
}

export default Loader;