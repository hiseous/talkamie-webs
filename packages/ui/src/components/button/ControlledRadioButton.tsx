import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import IconWrapper from "../icon/IconWrapper";
import NodeMayBeLink from "../node/NodeMayBeLink";

type ControlledRadioButtonProps = ComponentPrimitiveProps & {
    children?: React.ReactNode;
    checked?: boolean;
    href?: string;
    onClick?: () => void;
};

const ControlledRadioButton = (props: ControlledRadioButtonProps) => {
    
    return (
        <NodeMayBeLink
            onClick={props.onClick}
            href={props.href}
            className={`${props.className || ''} flex items-center cursor-pointer`}
        >
            <IconWrapper
                iconName="CircleFill"
                iconSize={14}
                className={`p-[3px] border-[1px] rounded-full ${props.checked ? 'fill-redVar1 border-redVar1' : 'fill-transparent border-grayVar1'}`}
            />
            {
                props.children ?
                <div className={`pl-2 ${props.checked ? 'text-blackVar5 font-medium' : 'text-grayVar9'}`}>{props.children}</div> : undefined
            }
        </NodeMayBeLink>
    );
}

export default ControlledRadioButton;