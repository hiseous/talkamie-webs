
import { useEffect, useRef } from "react";
import SvgAsset from "../../assets/svg/SvgAsset";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import NodeMayBeLink from "../node/NodeMayBeLink";

type keyChangeProps = {
    isEnterKey?: boolean;
    searchValue?: string;
}
type SearchBoxProps = ComponentPrimitiveProps & {
    placeholder?: string;
    nodeAfterBegin?: React.ReactNode;
    nodeBeforeEnd?: React.ReactNode;
    leadingIconClassName?: string;
    defaultValue?: string;
    autoFocus?: boolean;
    hideLeadingIcon?: boolean;
    href?: string;
    onChange?: (searchValue?: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    onKeyDown?: (keyChangeProps: keyChangeProps) => void;
}
const SearchBox = (props: SearchBoxProps) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if(props.autoFocus && inputRef.current){
            inputRef.current.focus();
        }
    }, [inputRef.current]);

    return (
        <NodeMayBeLink
            href={props.href}
            className={`${props.className || ''} flex items-center px-5 rounded-md border-[1px] border-grayVar6 bg-whiteVar5`}
        >
            {props.nodeAfterBegin}
            <label className="flex-1 flex items-center">
                {
                    !props.hideLeadingIcon ?
                    <SvgAsset
                        name="Search"
                        className={`${props.leadingIconClassName || ''} fill-blackVar5`}
                    /> : <></>
                }
                <input
                    ref={inputRef}
                    placeholder={props.placeholder}
                    autoFocus={props.autoFocus}
                    onFocus={props.onFocus}
                    onBlur={props.onBlur}
                    defaultValue={props.defaultValue}
                    onChange={(e) => {
                        if(props.onChange) props.onChange(e.currentTarget.value);
                    }}
                    onKeyDown={(e) => {
                        if(props.onKeyDown){
                            props.onKeyDown({
                                isEnterKey: e.key === 'Enter',
                                searchValue: e.currentTarget.value,
                            });
                        }
                    }}
                    className={`${props.hideLeadingIcon ? '' : 'pl-4'} py-[14px] flex-1 border-0 outline-0 flex-1 w-full h-full placeholder:text-gray500 dark:placeholder:text-gray400
                        bg-transparent placeholder:text-gray500 cursor-pointer
                    `}
                />
            </label>
            {props.nodeBeforeEnd}
        </NodeMayBeLink>
    );
}

export default SearchBox;