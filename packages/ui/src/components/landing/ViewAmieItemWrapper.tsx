'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";


type ViewAmieItemWrapperProps = ComponentPrimitiveProps & {
    children?: React.ReactNode;
}
const ViewAmieItemWrapper = (props: ViewAmieItemWrapperProps) => {
    
    return (
        <div className={`${props.className || ''} border-[1.5px] border-redVar1 rounded-2xl p-3 flex flex-col justify-between`}>
            {props.children}
        </div>
    );
}

export default ViewAmieItemWrapper;