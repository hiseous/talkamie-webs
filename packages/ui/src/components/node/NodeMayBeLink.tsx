
import { HTMLAttributeAnchorTarget, ReactNode } from "react";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import Link from "next/link";

interface tsProps extends ComponentPrimitiveProps {
    style?: React.CSSProperties;
    href?: string;
    children?: ReactNode;
    target?: HTMLAttributeAnchorTarget;
    disabled?: boolean;
    onClick?: () => void;
}
const NodeMayBeLink = (props: tsProps) => {
    const nodeClassName = `${props.className || ''}`;
    return (
        <>
            {
                props.href ? (
                    (props.href.startsWith('#') || props.href.startsWith('/#')) ?
                    <a style={props.style} href={props.href} aria-disabled={props.disabled} target={props.target} className={nodeClassName} onClick={props.onClick}>
                        {props.children}
                    </a> :
                    <Link style={props.style} href={props.href} target={props.target} aria-disabled={props.disabled} className={nodeClassName} onClick={props.onClick}>
                        {props.children}
                    </Link>
                )
                :
                <div style={props.style} className={nodeClassName} onClick={props.onClick} aria-disabled={props.disabled}>
                    {props.children}
                </div>
            }
        </>
    )
}

export default NodeMayBeLink;