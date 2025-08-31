
// import { ComponentPrimitiveProps, valueOf } from "../../utils/types/global.types";
// import ScheduleInputDate from "./ScheduleInputDate";
// import ScheduleInputRecurrence from "./ScheduleInputRecurrence";
// import ScheduleInputTitle from "./ScheduleInputTitle";
// import { scheduleCallForm } from "../../utils/api/schedule/schedule-call";
// import { userProps } from "../../utils/types/user";
// import ScheduleInputTimeSlot from "./ScheduleInputTimeSlot";
// import { adjustTimestamp, binaryOpOnTimestamps, fromTimestamp } from "../../utils/funcs/time/timestamp";
// import { combineIntoUtcTimestamp } from "../../utils/funcs/time/time-combination";

// type inputName = 'startDate' | 'startTime' | 'endTime';

// type ScheduleFormProps = ComponentPrimitiveProps & {
//     user: userProps | undefined;
//     form?: scheduleCallForm;
//     viewOnly?: boolean;
//     onChange?: (name: keyof scheduleCallForm, value?: valueOf<scheduleCallForm>) => void;
// };

// const ScheduleForm = (props: ScheduleFormProps) => {
//     const handles = {
//         // onChange: (inputName: inputName, inputValue?: string) => {
//         //     // let formValue = inputValue;
//         //     // let formName: keyof scheduleCallForm | undefined;
//         //     let startDateTime = props.form?.startDateTime;
//         //     let endDateTime = props.form?.endDateTime;

//         //     if(inputName === 'startTime'){
//         //         const startDate = fromTimestamp(props.form?.startDateTime, false).date.iso;
//         //         startDateTime = combineIntoUtcTimestamp({
//         //             date: startDate,
//         //             time: inputValue,
//         //             timezoneOffset: props.form?.timezoneOffset,
//         //         }).iso;
//         //     }
//         //     else if(inputName === 'endTime'){
//         //         // const endDate = fromTimestamp(props.form?.endDateTime, false).date.iso;
//         //         // const endDateTime = combineIntoUtcTimestamp({
//         //         //     date: endDate,
//         //         const startDateTimeProps = fromTimestamp(props.form?.startDateTime, false);
//         //         endDateTime = combineIntoUtcTimestamp({
//         //             date: startDateTimeProps.date.iso,
//         //             time: inputValue,
//         //             timezoneOffset: props.form?.timezoneOffset,
//         //         }).iso;

//         //         const diffProps = binaryOpOnTimestamps(endDateTime, '-', startDateTimeProps.dateTime.iso).inSec;
//         //         if(diffProps < 0){
//         //             //add one day;
//         //             endDateTime = adjustTimestamp({
//         //                 timestamp: endDateTime,
//         //                 day: 1,
//         //                 op: 'add',
//         //             }).iso;
//         //         }
//         //     }
//         //     else if(inputName === 'startDate'){
//         //         const startTime = fromTimestamp(props.form?.startDateTime, false).time.iso;
//         //         startDateTime = combineIntoUtcTimestamp({
//         //             date: inputValue,
//         //             time: startTime,
//         //             // timezoneOffset: props.form?.timezoneOffset,
//         //         }).iso;
//         //     }

//         //     if(startDateTime && endDateTime && startDateTime > endDateTime){
//         //         endDateTime = startDateTime;
//         //         startDateTime = endDateTime;
//         //     }

//         //     if(props.onChange){
//         //         props.onChange('startDateTime', startDateTime);
//         //         props.onChange('endDateTime', endDateTime);
//         //     };
//         // },
//         onStartDateChange: (date?: string) => {
//             const startTime = (
//                 props.form?.startDateTime ? fromTimestamp(props.form.startDateTime).time.iso :
//                 undefined
//             );
//             const endTime = (
//                 props.form?.endDateTime ? fromTimestamp(props.form.endDateTime).time.iso :
//                 undefined
//             );

//             const startDateTime = combineIntoUtcTimestamp({
//                 date,
//                 time: startTime,
//             }).iso;
//             const endDateTime = combineIntoUtcTimestamp({
//                 date,
//                 time: endTime,
//             }).iso;

//             if(props.onChange){
//                 props.onChange('startDateTime', startDateTime);
//                 props.onChange('endDateTime', endDateTime);
//             }
//         },
//         onTimeslotChange: (startTime?: string, endTime?: string) => {
//             const startDate = (
//                 props.form?.startDateTime ? fromTimestamp(props.form.startDateTime).date.iso :
//                 undefined
//             );

//             const startDateTime = combineIntoUtcTimestamp({
//                 date: startDate,
//                 time: startTime,
//             }).iso;
//             let endDateTime = combineIntoUtcTimestamp({
//                 date: startDate,
//                 time: endTime,
//             }).iso;

//             //if end-date-time < start-date-time, due to choosing 11PM to 12AM, add one day;
//             const diff = binaryOpOnTimestamps(endDateTime, '-', startDateTime).inSec;
//             if(diff < 0){
//                 //add one day;
//                 endDateTime = adjustTimestamp({
//                     timestamp: endDateTime,
//                     day: 1,
//                     op: 'add',
//                 }).iso;
//             }

//             if(props.onChange){
//                 props.onChange('startDateTime', startDateTime);
//                 props.onChange('endDateTime', endDateTime);
//             }
//         },
//         getInputValue: (inputName: inputName, formValue?: string) => {
//             let inputValue = formValue;

//             if(formValue){
//                 const timeProps = fromTimestamp(formValue, true); //true, since formValues are already in UTC;
//                 if(inputName === 'startTime' || inputName === 'endTime'){
//                     //get HH:mm:ss;
//                     inputValue = timeProps.time.iso;
//                 }
//                 else if(inputName === 'startDate'){
//                     //get YYYY-MM-DD;
//                     inputValue = timeProps.date.iso;
//                 }
//             }

//             return inputValue;
//         },
//     };
    
//     return (
//         <div
//             className={`${props.className || ''}`}
//         >
//             <ScheduleInputTitle
//                 title={props.form?.title}
//                 onChange={(title) => {
//                     if(props.onChange) props.onChange('title', title);
//                 }}
//                 viewOnly={props.viewOnly}
//             />
//             <ScheduleInputDate
//                 // date={props.form?.startDate}
//                 date={handles.getInputValue('startDate', props.form?.startDateTime)}
//                 onChange={(date) => {
//                     // if(props.onChange) props.onChange('startDate', date);
//                     // handles.onChange('startDate', date);
//                     handles.onStartDateChange(date);
//                 }}
//                 className="mt-4"
//                 viewOnly={props.viewOnly}
//             />
//             {/* <ScheduleInputCallType
//                 callType={props.form?.type}
//                 onChange={(callType) => {
//                     if(props.onChange) props.onChange('type', callType);
//                 }}
//                 className="mt-4"
//                 viewOnly={props.viewOnly}
//             /> */}
//             {/* <ScheduleInputTime
//                 title="Start Time"
//                 time={props.form?.startTime}
//                 onChange={(time) => {
//                     if(props.onChange) props.onChange('startTime', time);
//                 }}
//                 className="mt-4"
//                 viewOnly={props.viewOnly}
//             />
//             <ScheduleInputTime
//                 title="End Time"
//                 time={props.form?.endTime}
//                 onChange={(time) => {
//                     if(props.onChange) props.onChange('endTime', time);
//                 }}
//                 className="mt-4"
//                 viewOnly={props.viewOnly}
//             /> */}
//             <ScheduleInputTimeSlot
//                 title="Time Slot"
//                 slot={{
//                     start: handles.getInputValue('startTime', props.form?.startDateTime),
//                     end: handles.getInputValue('endTime', props.form?.endDateTime),
//                     // start: props.form?.startTime,
//                     // end: props.form?.endTime,
//                 }}
//                 onChange={(time) => {
//                     // if(props.onChange){
//                     //     props.onChange('startTime', time.start);
//                     //     props.onChange('endTime', time.end);
//                     // }
//                     // if(props.onChange) props.onChange('startTime', time);
//                     // handles.onChange('startTime', time.start);
//                     // handles.onChange('endTime', time.end);
//                     handles.onTimeslotChange(time.start, time.end);
//                 }}
//                 className="mt-4"
//                 viewOnly={props.viewOnly}
//             />
//             <ScheduleInputRecurrence
//                 recurrence={props.form?.weeklyRecurringDay}
//                 onChange={(weeklyRecurringDay) => {
//                     if(props.onChange) props.onChange('weeklyRecurringDay', weeklyRecurringDay);
//                 }}
//                 className="mt-4"
//                 viewOnly={props.viewOnly}
//             />
//         </div>
//     );
// }

// export default ScheduleForm;