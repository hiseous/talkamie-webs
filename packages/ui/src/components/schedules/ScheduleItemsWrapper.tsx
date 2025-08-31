'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";

type ScheduleItemsWrapperProps = ComponentPrimitiveProps & {
    children?: React.ReactNode;
}
const ScheduleItemsWrapper = (props: ScheduleItemsWrapperProps) => {

    return (
        <div className={`${props.className || ''} grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8`}>
            {props.children}
        </div>
    );
}

export default ScheduleItemsWrapper;