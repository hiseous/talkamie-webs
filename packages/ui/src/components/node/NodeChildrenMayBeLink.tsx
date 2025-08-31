import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import Linkify from 'react-linkify';

type NodeChildrenMayBeLinkProps = ComponentPrimitiveProps & {
    children?: React.ReactNode;
};

const NodeChildrenMayBeLink = (props: NodeChildrenMayBeLinkProps) => {
    
    return (
        <Linkify
            componentDecorator={(decoratedHref, decoratedText, key) => (
                //using <a> tag causes hydration error, since it may appear in another <a> tag;
                <span
                    // href={decoratedHref}
                    className={`${props.className || ''} underline text-blueVar2 cursor-pointer`}
                    key={key}
                    // target="_blank"
                    // rel="noopener noreferrer"
                    onClick={() => {
                        window.open(decoratedHref, '_blank', 'noopener noreferrer')
                    }}
                >
                    {decoratedText}
                </span>
            )}
        >
            {props.children}
        </Linkify>
    );
}

export default NodeChildrenMayBeLink;