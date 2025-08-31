import { ComponentPrimitiveProps } from "../../utils/types/global.types";

type ZoomFitWrapperProps = ComponentPrimitiveProps & {
    children: React.ReactNode;
    style?: React.CSSProperties;
    id?: string;
    ref?: React.RefObject<HTMLDivElement>
}
const ZoomFitWrapper = (props: ZoomFitWrapperProps) => {

    return (
        <div
            ref={props.ref}
            id={props.id}
            style={props.style}
            className={`${props.className || ''} mx-auto sm:max-w-[500px] md:max-w-[1880px]`}
        >
            {props.children}
        </div>
    );
}

export default ZoomFitWrapper;