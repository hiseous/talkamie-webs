import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import NodeMayBeLink from "../node/NodeMayBeLink";

type GradientWrapperProps = ComponentPrimitiveProps & {
    children?: React.ReactNode;
    href?: string;
};

const GradientWrapper = (props: GradientWrapperProps) => {
    
    return (
        <NodeMayBeLink href={props.href} className={`${props.className || ''} fill-white text-white bg-gradient-to-r from-redVar3 to-blackVar6 font-semibold`}
        >
            {props.children}
        </NodeMayBeLink>
    );
}

export default GradientWrapper;