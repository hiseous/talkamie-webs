import SvgAsset, { svgAssetName } from "../../assets/svg/SvgAsset";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import Button, { ButtonProps } from "../button/Button";
import Icon, { iconName } from "../icon/Icon";

type IconLabelButtonProps = ComponentPrimitiveProps & {
    svgAssetName?: svgAssetName;
    iconName?: iconName;
    label?: string;
    loading?: boolean;
    href?: string;
    theme?: ButtonProps['theme'];
    labelClassName?: string;
    onClick?: () => void;
};

const IconLabelButton = (props: IconLabelButtonProps) => {
    
    return (
        <Button
            theme={props.theme ?? "pink-var-1"}
            className={`${props.className || ''} flex items-center px-8 rounded-full`}
            href={props.href}
            loading={props.loading}
            onClick={props.onClick}
        >
            {
                props.svgAssetName ?
                <SvgAsset name={props.svgAssetName} size={32} /> :
                props.iconName ?
                <Icon iconName={props.iconName} size={32} /> :
                <></>
            }
            {
                props.label ?
                <span className={`${props.labelClassName || ''} ${(props.svgAssetName || props.iconName) ? 'pl-2' : ''}`}>
                    {props.label}
                </span> : <></>
            }
        </Button>
    );
}

export default IconLabelButton;