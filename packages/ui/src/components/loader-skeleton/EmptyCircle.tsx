import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import EmptyNode from "./EmptyNode";

type EmptyCircleProps = ComponentPrimitiveProps & {
    size?: 'xsm' | 'sm' | 'md' | 'lg' | '3xl';
}
const EmptyCircle = (props: EmptyCircleProps) => {
    return (
        <EmptyNode className={`${props.className || ''} rounded-full
                ${
                    props.size === 'xsm' ? 'w-6 h-6' :
                    props.size === 'sm' ? 'w-7 h-7' :
                    props.size === 'md' ? 'w-10 h-10 md:w-12 md:h-12' :
                    props.size === 'lg' ? 'w-12 h-12 md:w-28 md:h-28' :
                    props.size === '3xl' ? `w-[100px] h-[100px]` :
                    'w-8 h-8'
                }
            `}
        />
    );
}

export default EmptyCircle;