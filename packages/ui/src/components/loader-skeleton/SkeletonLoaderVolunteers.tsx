import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import EmptyVolunteers from "./EmptyVolunteers";

type SkeletonLoaderVolunteersProps = ComponentPrimitiveProps & {
    count?: number;
}
const SkeletonLoaderVolunteers = (props: SkeletonLoaderVolunteersProps) => {
    return (
        <EmptyVolunteers
            className={`${props.className || ''} animate-pulse`}
            count={props.count}
        />
    );
}

export default SkeletonLoaderVolunteers;