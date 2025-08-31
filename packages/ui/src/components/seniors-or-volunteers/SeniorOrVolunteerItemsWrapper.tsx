import { ComponentPrimitiveProps } from "../../utils/types/global.types";

type SeniorOrVolunteerItemsWrapperProps = ComponentPrimitiveProps & {
    children?: React.ReactNode;
};

const SeniorOrVolunteerItemsWrapper = (props: SeniorOrVolunteerItemsWrapperProps) => {
    
    return (
        <div
            className={`${props.className || ''} grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6`}
        >
            {props.children}
        </div>
    );
}

export default SeniorOrVolunteerItemsWrapper;