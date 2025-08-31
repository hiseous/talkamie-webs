import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { __classNames } from "../../utils/constants/classNames";
import Loader from "../loader/Loader";
import NodeMayBeLink from "../node/NodeMayBeLink";

export type ButtonProps = ComponentPrimitiveProps & {
    children?: React.ReactNode;
    theme?: 'pink' | 'pink-var-1' | 'red' | 'none' | 'white' | 'green' | 'red-gradient';
    href?: string;
    target?: React.HTMLAttributeAnchorTarget;
    disabled?: boolean;
    loading?: boolean;
    loadingNode?: React.ReactNode;
    onClick?: () => void;
}
const Button = ({loading = false, loadingNode = undefined, ...props}: ButtonProps) => {
    const disabled = props.disabled || loading;
    const commonProps = {
        ...props,
        onClick: !disabled ? props.onClick : undefined,
        disabled,
        className: `${props.className || ''}
            ${
                disabled ?
                `cursor-not-allowed opacity-[.5]` :
                ``
            }
            ${
                props.theme !== 'none' ?
                `
                    ${__classNames.transition} rounded-3xl py-3
                ` :
                ``
            }
            ${
                props.theme === 'red' ? `bg-redVar1 text-white fill-white border-[1px] border-redVar1 hover:bg-white hover:text-redVar1 hover:fill-redVar1` :
                props.theme === 'pink' ? `bg-pinkVar2 text-redVar1 fill-redVar1 hover:bg-redVar1 hover:text-white hover:fill-white` :
                props.theme === 'pink-var-1' ? `bg-pinkVar1 text-redVar1 fill-redVar1 border-[1px] border-pinkVar1 hover:bg-white hover:border-redVar1` :
                props.theme === 'white' ? `bg-white text-redVar1 fill-redVar1 border-[1px] border-pinkVar2 hover:bg-redVar1 hover:text-white hover:border-redVar1` :
                props.theme === 'green' ? `bg-greenVar3 text-white fill-white border-[1px] border-greenVar3 hover:bg-white hover:text-greenVar3 hover:fill-greenVar3` :
                props.theme === 'red-gradient' ? `fill-white text-white bg-gradient-to-r from-redVar1 to-blackVar6 border-[1px] border-transparent hover:bg-none hover:bg-white hover:border-redVar1 hover:text-redVar1` :
                ``
            }
        `,
        children: <>
            {
                loading ?
                loadingNode || <Loader /> :
                props.children
            }
        </>,
    };

    return (
        <>
            {
                props.href ?
                <NodeMayBeLink
                    {...commonProps}
                /> :
                <button
                    {...commonProps}
                ></button>
            }
        </>
    );
}

export default Button;