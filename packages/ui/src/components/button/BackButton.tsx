import { svgAssetName } from "../../assets/svg/SvgAsset";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import IconWrapper, { IconWrapperProps } from "../icon/IconWrapper";
import { useRouter } from "next/navigation";

type BackButtonProps = ComponentPrimitiveProps & Pick<IconWrapperProps, 'theme'> & {
    preventDefaultClick?: boolean;
    svgAssetName?: svgAssetName;
    onClick?: () => void;
};

const BackButton = (props: BackButtonProps) => {
    const navigate = useRouter();
    
    return (
        <IconWrapper
            onClick={() => {
                if(!props.preventDefaultClick) navigate.back();
                if(props.onClick) props.onClick();
            }}
            theme={props.theme}
            className={`${props.className || ''} p-2 md:p-3 box-content rounded-full cursor-pointer text-3xl`}
            svgAssetName={props.svgAssetName || "ArrowLeft"}
            // iconName="ArrowLeftShort"
        />
    );
}

export default BackButton;