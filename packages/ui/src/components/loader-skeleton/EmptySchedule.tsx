import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import EmptyNode from "./EmptyNode";

export type EmptyScheduleProps = ComponentPrimitiveProps & {
    // renderAs?: 'full-post';
}
const EmptySchedule = (props: EmptyScheduleProps) => {
    return (
        <EmptyNode className={`${props.className || ''} w-full h-[400px] rounded-xl`} />
    );
}

export default EmptySchedule;