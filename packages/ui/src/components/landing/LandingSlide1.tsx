
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import LandingSlideImageTextButton from "./LandingSlideImageTextButton";

type LandingSlide1Props = ComponentPrimitiveProps & {
    
};

const LandingSlide1 = (props: LandingSlide1Props) => {
    
    return (
        <LandingSlideImageTextButton
            className={`${props.className || ''}`}
            imageName="positiveMatureManPng"
            texts={[
                `Feel heard, cared for,`,
                `and never alone!`,
            ]}
            buttonProps={{
                children: `Find a Friend`,
            }}
        />
    );
}

export default LandingSlide1;