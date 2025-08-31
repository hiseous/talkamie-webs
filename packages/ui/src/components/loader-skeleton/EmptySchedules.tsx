import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import ScheduleItemsWrapper from "../schedules/ScheduleItemsWrapper";
import EmptySchedule from "./EmptySchedule";

type EmptySchedulesProps = ComponentPrimitiveProps & {
    count?: number;
}
const EmptySchedules = (props: EmptySchedulesProps) => {
    return (
        <ScheduleItemsWrapper className={`${props.className || ''}`}>
            {
                Array.from({length: props.count ?? 10}).map((unknown, i) => {
                    return (
                        <EmptySchedule
                            key={`${i}_${unknown}`}
                            // className={`py-5`}
                        />
                    )
                })
            }
        </ScheduleItemsWrapper>
    );
}

export default EmptySchedules;