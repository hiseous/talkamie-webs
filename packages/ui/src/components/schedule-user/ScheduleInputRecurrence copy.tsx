// import { ComponentPrimitiveProps } from "../../utils/types/global.types";
// import ScheduleInputModal from "./ScheduleInputModal";
// import IconWrapper from "../icon/IconWrapper";
// import { scheduleCallForm } from "../../utils/api/schedule/schedule-call";
// import { useState } from "react";
// import { getNewKey } from "../../utils/funcs/string/string";

// type recurrence = scheduleCallForm['weeklyRecurringDay'];
// type ScheduleInputRecurrenceProps = ComponentPrimitiveProps & {
//     recurrence?: recurrence;
//     viewOnly?: boolean;
//     onChange?: (recurrence?: recurrence) => void;
// };

// const ScheduleInputRecurrence = (props: ScheduleInputRecurrenceProps) => {
//     const [closeKey, setCloseKey] = useState<string | undefined>(undefined);
//     const handles = {
//         getLabel: (recurrence?: recurrence) => {
//             let label: string | undefined;
            
//             if(recurrence === 'all'){
//                 label = `Every day of the week`;
//             }
//             else if(recurrence === 'monday'){
//                 label = `Every Monday`;
//             }
//             else if(recurrence === 'tuesday'){
//                 label = `Every Tuesday`;
//             }
//             else if(recurrence === 'wednesday'){
//                 label = `Every Wednesday`;
//             }
//             else if(recurrence === 'thursday'){
//                 label = `Every Thursday`;
//             }
//             else if(recurrence === 'friday'){
//                 label = `Every Friday`;
//             }
//             else if(recurrence === 'saturday'){
//                 label = `Every Saturday`;
//             }
//             else if(recurrence === 'sunday'){
//                 label = `Every Sunday`;
//             }
//             else if(recurrence === 'none'){
//                 label = 'None';
//             }

//             return {
//                 label,
//             };
//         },
//     };
//     const recurrences: recurrence[] = [
//         'none', 'monday', 'tuesday', 'wednesday',
//         'thursday', 'friday', 'saturday','sunday',
//         'all',
//     ];
    
//     return (
//         <ScheduleInputModal
//             className={`${props.className || ''}`}
//             svgAssetName="CalendarEmptyAlt"
//             closeKey={closeKey}
//             title="Repeat"
//             subTitle={handles.getLabel(props.recurrence).label}
//         >
//             {
//                 !props.viewOnly ?
//                 <div className="mt-6">
//                     {
//                         recurrences.map((recurrence, i) => {
//                             const checked = recurrence === props.recurrence;
//                             return (
//                                 <div
//                                     key={i}
//                                     onClick={() => {
//                                         if(props.onChange) props.onChange(recurrence);
//                                         setCloseKey(getNewKey());
//                                     }}
//                                     className={`flex items-center justify-between px-2 py-4 cursor-pointer fill-redVar1
//                                         ${checked ? 'text-redVar1' : ''}
//                                     `}
//                                 >
//                                     <div>{handles.getLabel(recurrence).label}</div>
//                                     {
//                                         checked ?
//                                         <IconWrapper
//                                             iconName="Check2"
//                                         /> : <></>
//                                     }
//                                 </div>
//                             )
//                         })
//                     }
//                 </div> : undefined
//             }
//         </ScheduleInputModal>
//     );
// }

// export default ScheduleInputRecurrence;