import { ComponentPrimitiveProps } from "../../utils/types/global.types";

type WrapperVar1Props = ComponentPrimitiveProps & {
    children?: React.ReactNode;
};

const WrapperVar1 = (props: WrapperVar1Props) => {
    
    return (
        <div className={`${props.className || ''} bg-whiteVar5 border-[1px] border-whiteVar2 rounded-md`}>
            {props.children}
        </div>
    );
}

export default WrapperVar1;