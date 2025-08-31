import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import EmptyBar from "./EmptyBar";

type SkeletonLoaderChatMessagesProps = ComponentPrimitiveProps & {
    count?: number;
}
const SkeletonLoaderChatMessages = (props: SkeletonLoaderChatMessagesProps) => {
    return (
        <div className={`${props.className || ''} animate-pulse grid grid-cols-1 gap-4`}>
            {
                Array.from({length: props.count ?? 10}).map((unknown, i) => {
                    return (
                        <div
                            key={`${i}_${unknown}`}
                            className={``}
                        >
                            <EmptyBar className="h-5 !rounded-sm" />
                            <EmptyBar className="mt-2 !rounded-sm max-w-[40%]" />
                        </div>
                    )
                })
            }
        </div>
    );
}

export default SkeletonLoaderChatMessages;