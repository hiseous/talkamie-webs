import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import EmptyUserItem from "./EmptyUserItem";

type EmptyUserItemsProps = ComponentPrimitiveProps & {
    count?: number;
}
const EmptyUserItems = (props: EmptyUserItemsProps) => {
    return (
        <div className={`${props.className || ''} grid grid-cols-1 gap-4`}>
            {
                Array.from({length: props.count ?? 10}).map((unknown, i) => {
                    return (
                        <EmptyUserItem
                            key={`${i}_${unknown}`}
                            // className={`py-5`}
                        />
                    )
                })
            }
        </div>
    );
}

export default EmptyUserItems;