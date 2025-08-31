import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import ScheduleInputModal from "./ScheduleInputModal";
import IconWrapper from "../icon/IconWrapper";
import { scheduleCallForm } from "../../utils/api/schedule/schedule-call";
import { useState } from "react";
import { getNewKey } from "../../utils/funcs/string/string";

type recurrence = scheduleCallForm['recurrence'];
type ScheduleInputRecurrenceProps = ComponentPrimitiveProps & {
    recurrence?: recurrence;
    viewOnly?: boolean;
    availableForRecurring?: boolean;
    onChange?: (recurrence?: recurrence) => void;
};

const ScheduleInputRecurrence = (props: ScheduleInputRecurrenceProps) => {
    const [closeKey, setCloseKey] = useState<string | undefined>(undefined);
    const handles = {
        getLabel: (recurrence?: recurrence) => {
            let label: string | undefined;
            
            if(recurrence === 'daily'){
                label = `Daily`;
            }
            else if(recurrence === 'weekly'){
                label = `Weekly`;
            }
            else if(recurrence === 'none'){
                label = 'None';
            }

            return {
                label,
            };
        },
    };
    const recurrences: recurrence[] = [
        'none', 'daily', 'weekly',
    ];
    
    return (
        <ScheduleInputModal
            className={`${props.className || ''}`}
            svgAssetName="CalendarEmptyAlt"
            closeKey={closeKey}
            title="Repeat"
            subTitle={
                props.availableForRecurring ? handles.getLabel(props.recurrence).label :
                props.availableForRecurring === false ? <div className="italic text-black">
                    user is not available for recurrence at that time
                </div> : undefined
            }
        >
            {
                !props.viewOnly && props.availableForRecurring ?
                <div className="mt-6">
                    {
                        props.availableForRecurring ?
                        <div>
                            {
                                recurrences.map((recurrence, i) => {
                                    const checked = recurrence === props.recurrence;
                                    return (
                                        <div
                                            key={i}
                                            onClick={() => {
                                                if(props.onChange) props.onChange(recurrence);
                                                setCloseKey(getNewKey());
                                            }}
                                            className={`flex items-center justify-between px-2 py-4 cursor-pointer fill-redVar1
                                                ${checked ? 'text-redVar1' : ''}
                                            `}
                                        >
                                            <div>{handles.getLabel(recurrence).label}</div>
                                            {
                                                checked ?
                                                <IconWrapper
                                                    iconName="Check2"
                                                /> : <></>
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div> :
                        <div className="text-center italic">
                            user is not available for recurrence at that time
                        </div>
                    }
                </div> : undefined
            }
        </ScheduleInputModal>
    );
}

export default ScheduleInputRecurrence;