import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import EmptyUserItems from "./EmptyUserItems";

type SkeletonLoaderUserItemsProps = ComponentPrimitiveProps & {
    count?: number;
}
const SkeletonLoaderUserItems = (props: SkeletonLoaderUserItemsProps) => {
    return (
        <EmptyUserItems
            className={`${props.className || ''} animate-pulse`}
            count={props.count}
        />
    );
}

export default SkeletonLoaderUserItems;