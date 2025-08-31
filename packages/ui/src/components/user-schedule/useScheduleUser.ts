// import { useEffect, useState } from "react";
// import { adjustTimestamp, fromTimestamp } from "../../utils/funcs/time/timestamp";
// import { inputSelectOption } from "../input-select/InputSelect";
// import { generateWeekDays } from "../../utils/funcs/time/week-days";
// import { scrollElementIntoView } from "../../utils/funcs/dom/scroll";
// import { getNewKey } from "../../utils/funcs/string/string";
// import { scheduleCallForm, useScheduleCallApi } from "../../utils/api/user-call/useScheduleCallApi";
// import { useEditScheduledCallApi } from "../../utils/api/user-call/useEditScheduledCallApi";
// import { useOutletContext } from "react-router-dom";
// import { userProfileLayoutContext } from "../user-profile/useUserProfileLayout";
// import { useGetScheduledCallWithUserApi } from "../../utils/api/user-call/useGetScheduledCallWithUserApi";

// type calendar = {
//     utc?: string;
//     // selectedDay?: number;
//     timeStart?: string;
//     timeEnd?: string;
//     key?: string;
// }
// type form = scheduleCallForm & {
//     key?: string;
// }
// // type useScheduleUserProps = {
// //     callId?: string;
// //     recipientId?: string;
// // }

// export const useScheduleUser = () => {
//     // const localUser = useLocalUser();
//     const context = useOutletContext() as userProfileLayoutContext | undefined;

//     const getCall = useGetScheduledCallWithUserApi();
//     // const getUser = useGetUserApi();
//     const scheduleCall = useScheduleCallApi();
//     const editCall = useEditScheduledCallApi();
    
//     const [calendar, setCalendar] = useState<calendar>({});
//     const [form, setForm] = useState<form>({});
//     // const [attendee, setRecipient] = useState(context?.user);
//     const attendee = context?.user;
//     const callId = getCall.data?.item?.id;

//     const handles = {
//         onCalendarChange: (utc?: string) => {
//             //change utc to base date, no time, just date;
//             const replaceProps = adjustTimestamp({
//                 timestamp: utc,
//                 timeClock: "00:00",
//                 op: 'replace',
//             });
//             setCalendar((prev) => ({
//                 ...prev,
//                 utc: replaceProps.isoTimezoned,
//             }));
//         },
//         onTimeChange: (name: 'timeStart' | 'timeEnd', HHmm?: string) => {
//             setCalendar((prev) => ({
//                 ...prev,
//                 [name]: HHmm,
//             }));
//         },
//         selectDay: (day: number) => {
//             const replaceProps = adjustTimestamp({
//                 timestamp: calendar.utc,
//                 day,
//                 op: 'replace',
//             });
//             // console.log(calendar.utc, day, replaceProps)
//             setCalendar((prev) => ({
//                 ...prev,
//                 utc: replaceProps.isoTimezoned,
//                 key: getNewKey(),
//             }));
//         },
//         getScheduledTime: () => {
//             const startProps = adjustTimestamp({
//                 timestamp: calendar.utc,
//                 timeClock: calendar.timeStart,
//             });
//             const endProps = adjustTimestamp({
//                 timestamp: calendar.utc,
//                 timeClock: calendar.timeEnd,
//             });

//             return {
//                 start: startProps.iso,
//                 end: endProps.iso,
//             };
//         },
//         updateForm: (inputName: keyof scheduleCallForm, value?: string | boolean) => {
//             setForm((prev) => ({
//                 ...prev,
//                 [inputName]: value,
//             }));
//         },
//         submit: () => {
//             if(attendee?.id){
//                 const startProps = adjustTimestamp({
//                     timestamp: calendar.utc,
//                     timeClock: calendar.timeStart,
//                     op: 'replace',
//                 });
//                 const endProps = adjustTimestamp({
//                     timestamp: calendar.utc,
//                     timeClock: calendar.timeEnd,
//                     op: 'replace',
//                 });

//                 form.scheduledStartDate = startProps.iso;
//                 form.scheduledEndDate = endProps.iso;

//                 console.log(form);

//                 if(callId){
//                     //edit;
//                     form.callId = callId;
//                     editCall.trigger({
//                         attendeeId: attendee.id,
//                         form,
//                     });
//                 }
//                 else {
//                     //new schedule;
//                     scheduleCall.trigger({
//                         attendeeId: attendee.id,
//                         form,
//                     });
//                 }
//             }
//         },
//     };
    
//     const selectedDay = fromTimestamp(calendar.utc);
//     const consts = {
//         modalClassName: `flex items-center justify-between bg-whiteVar3 border-[1px] border-whiteVar4 px-4 py-3 rounded-md`,
//         selectedValueClassName: `bg-white px-3 py-2 rounded-sm`,
//         callTypeOptions: [
//             {
//                 value: 'audio',
//                 label: 'Voice Call',
//                 defaultChecked: form.type ? form.type === 'audio' : true,
//             },
//             {
//                 value: 'video',
//                 label: 'Video Call',
//                 defaultChecked: form.type === 'video',
//             },
//         ] as inputSelectOption[],
//         selectedDay,
//         presentDay: fromTimestamp(),
//         weekDays: generateWeekDays(1, selectedDay.month.totalDays, selectedDay.month.firstDay.weekDayIndex),
//         calendar,
//         attendee,
//         form,
//         getCallLoading: getCall.loading,
//     };

//     useEffect(() => {
//         if(attendee?.id){
//             getCall.trigger({
//                 attendeeId: attendee.id,
//             });
//         }
//     }, []);
//     useEffect(() => {
//         if(getCall.loading === false && getCall.success){
//             const call = getCall.data?.item;
            
//             setForm((prev) => ({
//                 ...prev,
//                 type: call?.type,
//                 name: call?.name,
//                 description: call?.description,
//                 recurring: call?.recurring,
//                 scheduledStartDate: call?.schedule?.startDate,
//                 scheduledEndDate: call?.schedule?.endDate,
//                 key: getNewKey(),
//             }));
//             handles.onCalendarChange(call?.schedule?.startDate);
//         }
//     }, [getCall.loading]);
//     useEffect(() => {
//         const classSelector = `.--selected-day-${selectedDay.day.number}`;
//         scrollElementIntoView({
//             querySelector: classSelector,
//             delay: 0.5,
//             position: 'end',
//         });

//     }, [calendar.utc]);
    
//     return {
//         ...handles,
//         ...consts,
//     };
// };