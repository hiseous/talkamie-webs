
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import XCloseButton from "../button/XCloseButton";

type ModalWrapperProps = ComponentPrimitiveProps & {
    children?: React.ReactNode;
    onClose?: () => void;
}
const ModalWrapper = (props: ModalWrapperProps) => {
    return (
        <div
            className={`${props.className || ''}
                bg-white rounded-lg rounded-b-none md:rounded-b-lg absolute p-4 md:p-6 pr-2 md:pr-3 w-full max-w-[780px]
                bottom-0 md:bottom-[unset]
                left-[50%] translate-x-[-50%] md:top-[50%] md:translate-y-[-50%]
                overscroll-contain mx-auto
            `}
        >
            <div className="relative max-h-[calc(100dvh-100px)] max-h-[calc(100vh-100px)] overflow-y-auto customScrollbar pr-2 md:pr-3">
                <XCloseButton
                    onClick={props.onClose}
                    className="absolute right-2 top-0"
                />
                {props.children}
            </div>
        </div>
    )
}

export default ModalWrapper;