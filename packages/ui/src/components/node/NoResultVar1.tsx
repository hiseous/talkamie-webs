import { ComponentPrimitiveProps } from "../../utils/types/global.types";

type NoResultVar1Props = ComponentPrimitiveProps & {
    children?: React.ReactNode;
};

const NoResultVar1 = (props: NoResultVar1Props) => {
    
    return (
        <div className={`${props.className || ''} text-grayVar1 text-center py-12`}>
            {props.children}
        </div>
    );
}

export default NoResultVar1;