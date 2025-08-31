import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import InputLabel from "../input-label/InputLabel";
import NodeMayBeLink from "../node/NodeMayBeLink";
import Thumb, { ThumbProps } from "./Thumb";

interface ThumbNLabelProps extends ComponentPrimitiveProps {
    thumb?: ThumbProps;
    label?: React.ReactNode;
    labelClassName?: string;
    href?: string;
}
const ThumbNLabel = (props: ThumbNLabelProps) => {
    return (
        <NodeMayBeLink
            href={props.href}
            className={`${props.className || ''} flex items-center`}
        >
            <Thumb
                {...props.thumb}
            />
            {
                (props.label) &&
                <InputLabel
                    className={`${props.labelClassName || ''} pl-2`}
                >{props.label}</InputLabel>
            }
        </NodeMayBeLink>
    )
}

export default ThumbNLabel;