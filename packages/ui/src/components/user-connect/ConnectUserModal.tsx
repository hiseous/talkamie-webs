// import { ComponentPrimitiveProps, valueOf } from "../../utils/types/global.types";
// import { userProps } from "../../utils/api/user/useGetUserApi";
// import ModalWrapper from "../modal/ModalWrapper";
// import Thumb from "../thumb/Thumb";
// import { usePopUp } from "../pop-up-provider/usePopUpContext";
// import UserNameAgeBadge from "../user-cards/UserNameAgeBadge";
// import XCloseButton from "../button/XCloseButton";
// import { useEffect, useState } from "react";
// import ConnectInputTitle from "./ConnectInputTitle";
// import ConnectInputDate from "./ConnectInputDate";
// import ConnectInputCallType from "./ConnectInputCallType";
// import ConnectInputTime from "./ConnectInputTime";
// import ConnectInputRecurrence from "./ConnectInputRecurrence";
// import Button from "../button/Button";
// import { scheduleCallForm, useScheduleCallApi } from "../../utils/api/user-call/useScheduleCallApi";
// import { useLocalUser } from "../local-user-provider/useLocalUser";
// import { fromTimestamp } from "../../utils/funcs/time/timestamp";

// type ConnectUserModalProps = ComponentPrimitiveProps & {
//     user: userProps | undefined;
//     viewOnly?: boolean;
//     updateUser?: (userProps?: Partial<userProps>) => void;
// };

// const ConnectUserModal = (props: ConnectUserModalProps) => {
//     const localUser = useLocalUser();
//     const popUp = usePopUp();
//     const scheduleApi = useScheduleCallApi();

//     const defaultSchedule = props.user?.viewer?.schedule;
//     const startProps = defaultSchedule?.timeslot?.from ? fromTimestamp(defaultSchedule?.timeslot?.from) : undefined;
//     const endProps = defaultSchedule?.timeslot?.to ? fromTimestamp(defaultSchedule?.timeslot?.to) : undefined;

//     const [form, setForm] = useState<scheduleCallForm>({
//         ...(
//             defaultSchedule?.status !== 'past' ? {
//                 title: defaultSchedule?.title,
//                 startDate: startProps?.date.iso,
//                 startTime: startProps?.time.iso,
//                 endTime: endProps?.time.iso,
//                 type: defaultSchedule?.type,
//                 weeklyRecurringDay: defaultSchedule?.weeklyRecurringDay,
//             } : {}
//         ),
//         timezoneOffset: new Date().getTimezoneOffset(),
//     });
    
//     const handles = {
//         onChange: (name: keyof scheduleCallForm, value?: valueOf<scheduleCallForm>) => {
//             setForm(prev => ({
//                 ...prev,
//                 [name]: value,
//             }));
//         },
//         submit: () => {
//             if(localUser?.id && props.user?.id){
//                 scheduleApi.trigger({
//                     attendeeId: props.user.id,
//                     body: form,
//                 });
//             }
//         },
//     };

//     useEffect(() => {
//         if(scheduleApi.loading === false && scheduleApi.success){
//             const newSchedule = scheduleApi.data;
//             if(newSchedule?.id){
//                 if(props.updateUser) props.updateUser({
//                     viewer: {
//                         ...props.user?.viewer,
//                         schedule: {
//                             ...props.user?.viewer?.schedule,
//                             ...newSchedule,
//                         },
//                     },
//                 });
//                 popUp?.popNode();
//             }
//         }
//     }, [scheduleApi.loading]);
    
//     return (
//         <ModalWrapper>
//             <div className="flex justify-between">
//                 <div className="flex items-center">
//                     <Thumb
//                         imageSrc={props.user?.pictureSrc}
//                         size="md"
//                     />
//                     <UserNameAgeBadge
//                         user={props.user}
//                         className="pl-2"
//                     />
//                 </div>
//                 <XCloseButton
//                     onClick={popUp?.popNode}
//                 />
//             </div>
//             <div className="mt-8">
//                 <ConnectInputTitle
//                     title={form.title}
//                     onChange={(title) => handles.onChange('title', title)}
//                     viewOnly={props.viewOnly}
//                 />
//                 <ConnectInputDate
//                     date={form.startDate}
//                     onChange={(date) => handles.onChange('startDate', date)}
//                     className="mt-4"
//                     viewOnly={props.viewOnly}
//                 />
//                 <ConnectInputCallType
//                     callType={form.type}
//                     onChange={(callType) => handles.onChange('type', callType)}
//                     className="mt-4"
//                     viewOnly={props.viewOnly}
//                 />
//                 <ConnectInputTime
//                     title="Start Time"
//                     time={form.startTime}
//                     onChange={(time) => handles.onChange('startTime', time)}
//                     className="mt-4"
//                     viewOnly={props.viewOnly}
//                 />
//                 <ConnectInputTime
//                     title="End Time"
//                     time={form.endTime}
//                     onChange={(time) => handles.onChange('endTime', time)}
//                     className="mt-4"
//                     viewOnly={props.viewOnly}
//                 />
//                 <ConnectInputRecurrence
//                     recurrence={form.weeklyRecurringDay}
//                     onChange={(weeklyRecurringDay) => handles.onChange('weeklyRecurringDay', weeklyRecurringDay)}
//                     className="mt-4"
//                     viewOnly={props.viewOnly}
//                 />
//                 {
//                     !props.viewOnly ?
//                     <>
//                         <Button
//                             theme="red"
//                             className="mt-8 w-full"
//                             loading={scheduleApi.loading}
//                             onClick={handles.submit}
//                         >
//                             Save Changes
//                         </Button>
//                         <div className="text-center text-grayVar8 mt-2">
//                             Attendee will be notified of any changes
//                         </div>
//                     </> : undefined
//                 }
//             </div>
//         </ModalWrapper>
//     );
// }

// export default ConnectUserModal;