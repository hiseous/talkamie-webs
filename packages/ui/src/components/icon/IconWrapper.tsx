import ImageAsset, { imageAssetName } from "../../assets/images/ImageAsset";
import SvgAsset, { svgAssetName } from "../../assets/svg/SvgAsset";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import Icon, { iconName } from "../icon/Icon";
import NodeMayBeLink from "../node/NodeMayBeLink";

export type IconWrapperProps = ComponentPrimitiveProps & {
    style?: React.CSSProperties;
    iconName?: iconName;
    iconSize?: number;
    svgAssetName?: svgAssetName;
    imageAssetName?: imageAssetName;
    disabled?: boolean;
    theme?: 'red' | 'blackVar1' | 'pink';
    href?: string;
    nodeBeforeEnd?: React.ReactNode;
    onClick?: () => void;
};

const IconWrapper = (props: IconWrapperProps) => {
    
    return (
        <NodeMayBeLink
            onClick={() => {
                if(!props.disabled && props.onClick) props.onClick();
            }}
            style={props.style}
            href={props.href}
            className={`${props.className || ''} w-[fit-content] h-[fit-content] ${props.disabled ? 'opacity-[.5] cursor-not-allowed' : 'cursor-pointer'}
                ${
                    props.theme === 'red' ? `bg-pinkVar1 fill-redVar1` :
                    props.theme === 'blackVar1' ? `bg-blackVar5/[.5] fill-white` :
                    props.theme === 'pink' ? `bg-pinkVar2 text-redVar1 fill-redVar1` :
                    ``
                }
            `}
        >
            {
                props.iconName ?
                <Icon
                    iconName={props.iconName}
                    size={props.iconSize}
                /> :
                props.svgAssetName ?
                <SvgAsset
                    name={props.svgAssetName}
                    size={props.iconSize}
                /> :
                props.imageAssetName ?
                <ImageAsset
                    name={props.imageAssetName}
                    size={props.iconSize}
                /> :
                <></>
            }
            {props.nodeBeforeEnd}
        </NodeMayBeLink>
    );
}

export default IconWrapper;