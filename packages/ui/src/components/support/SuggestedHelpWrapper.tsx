
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import Icon, { iconName } from "../icon/Icon";
import NodeMayBeLink from "../node/NodeMayBeLink";

type SuggestedHelpWrapperProps = ComponentPrimitiveProps & {
    children?: React.ReactNode;
    nodeBeforeEnd?: React.ReactNode;
    iconName?: iconName;
    handleClassName?: string;
    iconClassName?: string;
    href?: string;
    onHandleClick?: () => void;
}

const SuggestedHelpWrapper = (props: SuggestedHelpWrapperProps) => {
    
    return (
        <NodeMayBeLink
            href={props.href}
            className={`${props.className || ''}
                shadow-md shadow-black/[.05] rounded-md block
            `}
        >
            <div onClick={props.onHandleClick} className={`${props.handleClassName || ''} flex items-center cursor-pointer`}>
                <div className="flex-1 pr-2 line-clamp-2">
                    {props.children}
                </div>
                <Icon
                    iconName={props.iconName ?? 'ChevronDown'}
                    className={`${props.iconClassName || ''}`}
                />
            </div>
            {props.nodeBeforeEnd}
        </NodeMayBeLink>
    )
}

export default SuggestedHelpWrapper;