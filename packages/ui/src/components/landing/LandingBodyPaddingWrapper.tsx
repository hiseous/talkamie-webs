
import { ComponentPrimitiveProps } from "../../utils/types/global.types";

type LandingBodyPaddingWrapperProps = ComponentPrimitiveProps & {
    children?: React.ReactNode;
};

const LandingBodyPaddingWrapper = (props: LandingBodyPaddingWrapperProps) => {
    
    return (
        <div
            className={`${props.className || ''} md:px-14 xl:px-24 xxl:px-36`}
        >
            {props.children}
        </div>
    );
}

export default LandingBodyPaddingWrapper;