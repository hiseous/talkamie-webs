import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import SeniorOrVolunteerItemWrapper from "../seniors-or-volunteers/SeniorOrVolunteerItemWrapper";
import EmptyNode from "./EmptyNode";

export type EmptyVolunteerProps = ComponentPrimitiveProps & {
    // renderAs?: 'full-post';
}
const EmptyVolunteer = (props: EmptyVolunteerProps) => {
    return (
        <SeniorOrVolunteerItemWrapper>
            <EmptyNode className={`${props.className || ''} w-full h-full`} />
        </SeniorOrVolunteerItemWrapper>
    );
}

export default EmptyVolunteer;