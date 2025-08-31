import { ComponentPrimitiveProps } from "../../utils/types/global.types";

type ModalWrapperVar1Props = ComponentPrimitiveProps & {
    children?: React.ReactNode;
};

const ModalWrapperVar1 = (props: ModalWrapperVar1Props) => {
    
    return (
        <div
            className={`${props.className || ''} border-[1px] border-redVar1/[.1] rounded-lg shadow-black/[.05] shadow-sm`}
        >
            {props.children}
        </div>
    );
}

export default ModalWrapperVar1;