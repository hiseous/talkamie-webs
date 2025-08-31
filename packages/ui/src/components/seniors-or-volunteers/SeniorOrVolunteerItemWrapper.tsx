import { ComponentPrimitiveProps } from "../../utils/types/global.types";

type SeniorOrVolunteerItemWrapperProps = ComponentPrimitiveProps & {
    children?: React.ReactNode;
};

const SeniorOrVolunteerItemWrapper = (props: SeniorOrVolunteerItemWrapperProps) => {
    
    return (
        <div
            className={`${props.className || ''} h-[440px] md:h-[560px] rounded-xl`}
        >
            {props.children}
        </div>
    );
}

export default SeniorOrVolunteerItemWrapper;