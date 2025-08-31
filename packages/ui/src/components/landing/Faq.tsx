'use client';

import SvgAsset from "../../assets/svg/SvgAsset";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { __classNames } from "../../utils/constants/classNames";
import { faqProps } from "../../utils/types/faq";

type FaqProps = ComponentPrimitiveProps & {
    item: faqProps;
    defaultOpen?: boolean;
    onClick?: () => void;
};

const Faq = (props: FaqProps) => {
    // const [open, setOpen] = useState(props.defaultOpen)
    const open = props.defaultOpen;
    
    return (
        <div
            className={`${props.className || ''}`}
        >
            <div
                // onClick={() => setOpen(!open)}
                onClick={props.onClick}
                className="flex cursor-pointer items-center"
            >
                <SvgAsset
                    name="Plus"
                    className={`${open ? 'rotate-[135deg]' : ''} ${__classNames.transition} duration-500`}
                />
                <div className={`pl-5 font-medium text-lg xl:text-2xl ${open ? 'opacity-[.7]' : ''} ${__classNames.transition}`}>{props.item.question}</div>
            </div>
            <div className={`${open ? 'pt-4' : 'opacity-0 h-0'} overflow-hidden pl-9 md:pl-10 xl:pr-4 text-white md:text-lg xl:text-xl ${__classNames.transition} duration-500`}
            >{props.item.answer}</div>
        </div>
    );
}

export default Faq;