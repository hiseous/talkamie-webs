import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import IconWrapper from "../icon/IconWrapper";

type XCloseButtonProps = ComponentPrimitiveProps & {
    onClick?: () => void;
};

const XCloseButton = (props: XCloseButtonProps) => {
    
    return (
        <IconWrapper
            onClick={props.onClick}
            iconName="X"
            className={`${props.className || ''} border-[1px] border-grayVar2 rounded-full p-2`}
            iconSize={32}
        />
    );
}

export default XCloseButton;