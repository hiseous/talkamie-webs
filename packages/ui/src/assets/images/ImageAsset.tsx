import CustomImage from "../../components/node/CustomImage";
import { __imageAssets } from "./_index";

export type imageAssetName = keyof typeof __imageAssets;
interface ImageAssetProps {
    name: imageAssetName;
    className?: string;
    size?: number;
    onClick?: () => void;
}
const ImageAsset = (props: ImageAssetProps) => {
    const imgProps = __imageAssets[props.name];
    
    return (
        <CustomImage
            width={imgProps.width}
            height={imgProps.height}
            src={imgProps.src}
            onClick={props.onClick}
            className={`${props.className || ''}`}
            alt={props.name}
            style={{
                width: props.size,
                height: props.size,
            }}
        />
    )
}

export default ImageAsset;