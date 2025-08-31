'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { __classNames } from "../../utils/constants/classNames";
import { faqProps } from "../../utils/types/faq";
import SuggestedHelpWrapper from "./SuggestedHelpWrapper";

type SuggestedHelpItemProps = ComponentPrimitiveProps & {
    item: faqProps;
    defaultOpen?: boolean;
    onClick?: () => void;
};

const SuggestedHelpItem = (props: SuggestedHelpItemProps) => {
    // const [open, setOpen] = useState(props.defaultOpen)
    const open = props.defaultOpen;
    
    return (
        <SuggestedHelpWrapper
            onHandleClick={props.onClick}
            className={`${props.className || ''} ${open ? 'opacity-[.7]' : ''} ${__classNames.transition}`}
            handleClassName={`px-4 py-6 ${open ? 'pb-0' : ''}`}
            iconClassName={`${open ? 'rotate-[180deg]' : ''} ${__classNames.transition} duration-500`}
            nodeBeforeEnd={
                <div
                    className={`px-4 ${open ? 'pt-4 pb-6' : 'opacity-0 h-0'} overflow-hidden ${__classNames.transition} duration-500`}
                >
                    {props.item.answer}
                </div>
            }
        >
            <div>
                {props.item.question}
            </div>
        </SuggestedHelpWrapper>
    );
}

export default SuggestedHelpItem;