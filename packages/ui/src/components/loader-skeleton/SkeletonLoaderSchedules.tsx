import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import EmptySchedules from "./EmptySchedules";

type SkeletonLoaderSchedulesProps = ComponentPrimitiveProps & {
    count?: number;
}
const SkeletonLoaderSchedules = (props: SkeletonLoaderSchedulesProps) => {
    return (
        <EmptySchedules
            className={`${props.className || ''} animate-pulse`}
            count={props.count}
        />
    );
}

export default SkeletonLoaderSchedules;