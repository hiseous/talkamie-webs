// import { ComponentPrimitiveProps } from "../../utils/types/global.types";
// import ConnectInputModal from "./ConnectInputModal";
// import IconWrapper from "../icon/IconWrapper";
// import { scheduleCallForm } from "../../utils/api/schedule/schedule-call";

// type recurrence = scheduleCallForm['weeklyRecurringDay'];
// type ConnectInputRecurrenceProps = ComponentPrimitiveProps & {
//     recurrence?: recurrence;
//     viewOnly?: boolean;
//     onChange?: (recurrence?: recurrence) => void;
// };

// const ConnectInputRecurrence = (props: ConnectInputRecurrenceProps) => {
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

//             return {
//                 label,
//             };
//         },
//     };
//     const recurrences: recurrence[] = [
//         'all', 'monday', 'tuesday', 'wednesday',
//         'thursday', 'friday', 'saturday','sunday',
//     ];
    
//     return (
//         <ConnectInputModal
//             className={`${props.className || ''}`}
//             svgAssetName="CalendarEmptyAlt"
//             title="Repeat"
//             subTitle={handles.getLabel(props.recurrence).label}
//         >
//             {
//                 !props.viewOnly ?
//                 <div className="mt-6">
//                     {
//                         recurrences.map((recurrence, i) => {
//                             return (
//                                 <div
//                                     key={i}
//                                     onClick={() => {
//                                         if(props.onChange) props.onChange(recurrence);
//                                     }}
//                                     className="flex items-center justify-between px-2 py-4 cursor-pointer fill-redVar1">
//                                     <div>{handles.getLabel(recurrence).label}</div>
//                                     {
//                                         recurrence === props.recurrence ?
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
//         </ConnectInputModal>
//     );
// }

// export default ConnectInputRecurrence;