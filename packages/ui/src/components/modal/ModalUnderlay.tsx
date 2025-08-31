import { ComponentPrimitiveProps } from "../../utils/types/global.types";

export type ModalUnderlayProps = ComponentPrimitiveProps & {
    children?: React.ReactNode;
}
const ModalUnderlay = (props: ModalUnderlayProps) => {
    return (
        <div
            className={`${props.className || ''} fixed left-0 top-0 bottom-0 right-0 bg-black/[.6] overflow-y-auto customScrollbar`}
        >
            {props.children}
        </div>
    )
}

export default ModalUnderlay;