import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import HeadingAndTrailingIcon from "./HeadingAndTrailingIcon";

type HeadingVar1Props = ComponentPrimitiveProps & {
    children?: React.ReactNode;
};

const HeadingVar1 = (props: HeadingVar1Props) => {
    
    return (
        <HeadingAndTrailingIcon
            svgAssetName="AngleRight"
            className={`${props.className || ''}`}
        >
            {props.children}
        </HeadingAndTrailingIcon>

    );
}

export default HeadingVar1;