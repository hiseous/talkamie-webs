import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import PendingRequestCard from "./PendingRequestCard";
import { connectRequestProps } from "../../utils/types/connect";

type PendingRequestCardsProps = ComponentPrimitiveProps & {
    items: connectRequestProps[];
};

const PendingRequestCards = (props: PendingRequestCardsProps) => {
    
    return (
        <div
            className={`${props.className || ''} grid grid-cols-1 md:grid-cols-3 gap-4`}
        >
            {
                props.items?.map((item, i) => {
                    return (
                        <PendingRequestCard
                            key={`${i}_${item.id}`}
                            request={item}
                            className={`${i > 0 ? '' : ''} h-[560px]`}
                        />
                    )
                })
            }
        </div>
    );
}

export default PendingRequestCards;