
'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { supportTicketProps } from "../../utils/types/support";

type SupportTicketStatusTagProps = ComponentPrimitiveProps & {
    status?: supportTicketProps['status'];
};

const SupportTicketStatusTag = (props: SupportTicketStatusTagProps) => {
    
    return (
        <div
            className={`${props.className || ''}
                text-xs border-[2px] px-1 rounded-md font-medium w-[fit-content] mx-auto p-1
                ${
                    props.status === 'closed' ? 'text-yellowVar2 border-yellowVar3' :
                    'text-greenVar4 border-greenVar5 bg-greenVar6'
                }
            `}
        >
            {`Case ${props.status === 'closed' ? 'Closed' : 'Opened'}`}
        </div>
    );
}

export default SupportTicketStatusTag;