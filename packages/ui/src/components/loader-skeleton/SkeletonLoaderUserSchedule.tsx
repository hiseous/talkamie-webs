import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import EmptyBar from "./EmptyBar";
import EmptyCircle from "./EmptyCircle";

type SkeletonLoaderUserScheduleProps = ComponentPrimitiveProps & {
    
}
const SkeletonLoaderUserSchedule = (props: SkeletonLoaderUserScheduleProps) => {
    return (
        <div
            className={`${props.className || ''} animate-pulse`}
        >
            <div className="flex items-center justify-between">
                <div className="flex-1 flex items-center">
                    <EmptyCircle />
                    <EmptyBar className="ml-2 flex-1 max-w-[50%] h-6" />
                </div>
                <EmptyCircle />
            </div>
            <EmptyBar className="mt-4 h-[800px]" />
        </div>
    );
}

export default SkeletonLoaderUserSchedule;