import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import NodeMayBeLink from "../node/NodeMayBeLink";

type HeadingTextProps = ComponentPrimitiveProps & {
    children?: React.ReactNode;
    size?: '2xs' | 'xs' | 'sm';
    href?: string;
};

const HeadingText = (props: HeadingTextProps) => {
    
    return (
        <NodeMayBeLink href={props.href} className={`${props.className || ''}
                ${
                    props.size === '2xs' ? 'md:text-lg font-medium' :
                    props.size === 'xs' ? 'text-lg md:text-2xl font-medium' :
                    props.size === 'sm' ? `text-2xl md:text-3xl font-bold`
                    : `text-4xl md:text-5xl xl:text-6xl leading-snug md:leading-tight font-semibold`
                }
            `}
        >
            {props.children}
        </NodeMayBeLink>
    );
}

export default HeadingText;