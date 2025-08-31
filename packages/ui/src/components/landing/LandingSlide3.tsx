
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import LandingSlideImageTextButton from "./LandingSlideImageTextButton";

type LandingSlide3Props = ComponentPrimitiveProps & {
    
};

const LandingSlide3 = (props: LandingSlide3Props) => {
    
    return (
        <LandingSlideImageTextButton
            className={`${props.className || ''}`}
            imageName="_001CroppedPng"
            texts={[
                `Bringing you joy`,
                `one call at a time.`,
            ]}
            buttonProps={{
                children: `Schedule Your First Call`,
            }}
            reverse
        />
    );
}

export default LandingSlide3;