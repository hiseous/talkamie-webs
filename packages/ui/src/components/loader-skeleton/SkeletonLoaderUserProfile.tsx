import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import EmptyBar from "./EmptyBar";
import EmptyCircle from "./EmptyCircle";
import EmptyNode from "./EmptyNode";

type SkeletonLoaderUserProfileProps = ComponentPrimitiveProps & {
    
}
const SkeletonLoaderUserProfile = (props: SkeletonLoaderUserProfileProps) => {
    return (
        <div
            className={`${props.className || ''} animate-pulse`}
        >
            <EmptyNode
                className="h-[180px]"
            />
            <EmptyCircle
                className="mt-[-50px] mx-auto border-[4px] border-white"
                size="3xl"
            />
            <EmptyBar className="mx-auto mt-3 w-[60%] h-6" />
            <div className="mt-4 flex flex-col items-center">
                <EmptyBar className="mt-2 w-[70%]" />
                <EmptyBar className="mt-2 w-[80%]" />
                <EmptyBar className="mt-2 w-[60%]" />
                <EmptyBar className="mt-2 w-[50%]" />
            </div>
            <div className="mt-4 flex items-center justify-between px-4">
                <EmptyBar className="w-[calc(50%-10px)] h-10" />
                <EmptyBar className="w-[calc(50%-10px)] h-10" />
            </div>
            <EmptyBar className="mt-4 h-96" />
        </div>
    );
}

export default SkeletonLoaderUserProfile;