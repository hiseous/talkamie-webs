import { faqProps } from "../../utils/types/faq";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";

type FaqItemProps = ComponentPrimitiveProps & {
    item: faqProps
}

const FaqItem = (props: FaqItemProps) => {
    
    return (
        <div className={`${props.className || ''}`}>
            <div className="flex items-center">
                {/* <div
                    className="w-0 h-0 box-content rounded-full p-1 bg-gradient-to-r
                        from-blue500/[.4] dark:from-blue50 to-redVar4/[.4] dark:to-red300/[.5]
                    "
                ></div> */}
                <div className="pl-2 font-semibold text-base">
                    {props.item?.question}
                </div>
            </div>
            <div className="mt-2">
                {props.item?.answer}
            </div>
        </div>
    )
}

export default FaqItem;