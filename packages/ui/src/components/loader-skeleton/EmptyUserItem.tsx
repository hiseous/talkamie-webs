import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import EmptyBar from "./EmptyBar";
import EmptyCircle from "./EmptyCircle";

export type EmptyUserItemProps = ComponentPrimitiveProps & {
    // renderAs?: 'full-post';
}
const EmptyUserItem = (props: EmptyUserItemProps) => {
    return (
        <div className={`${props.className || ''} flex items-center`}>
            <EmptyCircle size="md" />
            <div className="flex-1 pl-4">
                <EmptyBar className="h-5 !rounded-sm" />
                <EmptyBar className="mt-2 !rounded-sm max-w-[40%]" />
            </div>
        </div>
    );
}

export default EmptyUserItem;