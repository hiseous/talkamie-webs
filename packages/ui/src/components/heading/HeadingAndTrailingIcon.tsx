import SvgAsset, { svgAssetName } from "../../assets/svg/SvgAsset";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import Icon, { iconName } from "../icon/Icon";

type HeadingAndTrailingIconProps = ComponentPrimitiveProps & {
    svgAssetName?: svgAssetName;
    iconName?: iconName;
    children?: React.ReactNode;
};

const HeadingAndTrailingIcon = (props: HeadingAndTrailingIconProps) => {
    
    return (
        <div
            className={`${props.className || ''} flex items-center text-blackVar5 font-medium`}
        >
            {
                props.children ?
                <span className={`${(props.svgAssetName || props.iconName) ? 'pr-2' : ''}`}>
                    {props.children}
                </span> : <></>
            }
            {
                props.svgAssetName ?
                <SvgAsset name={props.svgAssetName}  /> :
                props.iconName ?
                <Icon iconName={props.iconName} /> :
                <></>
            }
        </div>
    );
}

export default HeadingAndTrailingIcon;