
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import NodeMayBeLink from "./NodeMayBeLink";

type ThumbTitleSubtitleNodeProps = ComponentPrimitiveProps & {
    thumbNode?: React.ReactNode;
    titleNode?: React.ReactNode;
    subtitleNode?: React.ReactNode;
    traillingNode?: React.ReactNode;
    href?: string;
};

const ThumbTitleSubtitleNode = (props: ThumbTitleSubtitleNodeProps) => {
    
    return (
        <NodeMayBeLink href={props.href} className={`${props.className || ''} flex justify-between items-center flex-wrap`}>
            <div
                className="flex-1 flex items-center [&>*:nth-child(1)]:shrink-0"
            >
                {props.thumbNode}
                <div className={`${props.thumbNode ? 'pl-3' : ''}`}>
                    {props.titleNode}
                    {props.subtitleNode}
                </div>
            </div>
            {props.traillingNode}
        </NodeMayBeLink>
    );
}

export default ThumbTitleSubtitleNode;