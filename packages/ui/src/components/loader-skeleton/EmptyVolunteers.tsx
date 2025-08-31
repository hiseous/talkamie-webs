import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import SeniorOrVolunteerItemsWrapper from "../seniors-or-volunteers/SeniorOrVolunteerItemsWrapper";
import EmptyVolunteer from "./EmptyVolunteer";

type EmptyVolunteersProps = ComponentPrimitiveProps & {
    count?: number;
}
const EmptyVolunteers = (props: EmptyVolunteersProps) => {
    return (
        <SeniorOrVolunteerItemsWrapper className={`${props.className || ''}`}>
            {
                Array.from({length: props.count ?? 10}).map((unknown, i) => {
                    return (
                        <EmptyVolunteer
                            key={`${i}_${unknown}`}
                            // className={`py-5`}
                        />
                    )
                })
            }
        </SeniorOrVolunteerItemsWrapper>
    );
}

export default EmptyVolunteers;