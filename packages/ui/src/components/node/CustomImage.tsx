import Image from "next/image";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";

type CustomImageProps = ComponentPrimitiveProps & {
    width?: number;
    height?: number;
    src?: string;
    alt?: string;
    placeholder?: PlaceholderValue;
    blurDataURL?: string;
    loading?: "lazy";
    style?: React.CSSProperties;
    onClick?: () => void;
}
const CustomImage = (props: CustomImageProps) => {
    return (
        <Image
            style={props.style}
            alt={props.alt ?? ''}
            width={props.width ?? 0}
            height={props.height ?? 0}
            src={props.src?.trim() ?? ''}
            unoptimized
            className={`${props.className || ''}`}
            onClick={props.onClick}
            placeholder={props.blurDataURL ? props.placeholder : undefined}
            blurDataURL={props.blurDataURL ? props.blurDataURL : undefined}
            loading={props.blurDataURL ? props.loading : undefined}
        />
    );
};

export default CustomImage;