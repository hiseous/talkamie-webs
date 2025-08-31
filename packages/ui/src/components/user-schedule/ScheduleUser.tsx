
// import { ComponentPrimitiveProps } from "../../utils/types/global.types";
// import { __classNames } from "../../utils/constants/classNames";
// import BackButton from "../button/BackButton";
// import Button from "../button/Button";
// import Checkbox from "../checkbox/Checkbox";
// import InputSelect from "../input-select/InputSelect";
// import InputSelectDate from "../input-select/InputSelectDate";
// import InputSelectTime from "../input-select/InputSelectTime";
// import InputText from "../input-text/InputText";
// import SkeletonLoaderUserSchedule from "../loader-skeleton/SkeletonLoaderUserSchedule";
// import ThumbNLabel from "../thumb/ThumbNLabel";
// import DocWrapperVar1 from "../wrapper/DocWrapperVar1";
// import { useScheduleUser } from "./useScheduleUser";

// type ScheduleUserProps = ComponentPrimitiveProps & {
    
// };

// const ScheduleUser = (props: ScheduleUserProps) => {
//     const hook = useScheduleUser();
    
//     return (
//         <DocWrapperVar1
//             className={`${props.className || ''} h-full`}
//         >
//             <div className="relative text-blackVar4 font-semibold text-base">
//                 <BackButton
//                     theme="red"
//                     className=""
//                 />
//                 <div className={`absolute ${__classNames.posCenter}`}>Schedule</div>
//             </div>
//             <div className="mt-6">
//                 {
//                     hook.getCallLoading === false ?
//                     <div>
//                         <div className="flex items-center justify-between">
//                             <ThumbNLabel
//                                 label={hook.attendee?.name}
//                                 thumb={{
//                                     imageSrc: hook.attendee?.pictureSrc,
//                                     name: hook.attendee?.name,
//                                 }}
//                             />
//                             <InputSelectDate
//                                 key={`${hook.calendar.key}_${hook.form.key}`}
//                                 className={`cursor-pointer`}
//                                 disablePast
//                                 defaultUTC={hook.calendar.utc}
//                                 onChange={hook.onCalendarChange}
//                             />
//                         </div>
//                         <div className="mt-5">
//                             <div className="capitalize font-medium">
//                                 {hook.selectedDay.month.long}, {hook.selectedDay.year}
//                             </div>
//                             <div className="mt-4 flex items-center overflow-x-auto scrollbar-hidden md:!scrollbar-visible">
//                                 {
//                                     hook.weekDays.map((weekDay, i) => {
//                                         const disabled = (
//                                             hook.selectedDay.year === hook.presentDay.year
//                                             && hook.selectedDay.month.index === hook.presentDay.month.index
//                                             && weekDay.number < hook.presentDay.day.number ?
//                                             true : false
//                                         );
//                                         return (
//                                             <div
//                                                 key={`${i}_${weekDay.short}`}
//                                                 onClick={() => {
//                                                     if(!disabled) hook.selectDay(weekDay.number);
//                                                 }}
//                                                 className={`flex flex-col items-center capitalize
//                                                     ${i > 0 ? 'ml-5' : ''} ${disabled ? '' : 'cursor-pointer'}
//                                                 `}
//                                             >
//                                                 <div
//                                                     className={`
//                                                         w-[44px] h-[44px] flex items-center justify-center rounded-full text-base font-bold
//                                                         border-[1px]
//                                                         ${
//                                                             // (
//                                                             //     hook.calendar.selectedDay ? weekDay.number === hook.calendar.selectedDay :
//                                                             //     weekDay.number === hook.selectedDay.day.number
//                                                             // ) ?
//                                                             disabled ?
//                                                             `bg-whiteVar1 border-transparent text-grayVar3/[.6]` :
//                                                             weekDay.number === hook.selectedDay.day.number ?
//                                                             `--selected-day-${weekDay.number} bg-redVar1 text-white border-transparent` : 'border-whiteVar2'
//                                                         }
//                                                     `}
//                                                 >{weekDay.number}</div>
//                                                 <div className={`mt-2 text-xxsm ${disabled ? 'text-grayVar3' : ''}`}>{weekDay.short}</div>
//                                             </div>
//                                         )
//                                     })
//                                 }
//                             </div>
//                         </div>
//                         <div key={hook.form.key} className="mt-6">
//                             <InputText
//                                 placeholder="Event name"
//                                 className="bg-whiteVar3 border-[1px] border-whiteVar2 rounded-t-md [&_*]:placeholder:text-blackVar5 [&_*]:placeholder:font-medium font-medium"
//                                 defaultValue={hook.form.name}
//                                 onChange={(value) => {
//                                     console.log(value, hook.form.name)
//                                     hook.updateForm('name', value);
//                                 }}
//                             />
//                             <InputText
//                                 placeholder="Description (optional)"
//                                 type="textarea"
//                                 className="bg-whiteVar3 border-[1px] border-whiteVar1 h-[100px] rounded-b-md text-xsm"
//                                 defaultValue={hook.form.description}
//                                 onChange={(value) => {
//                                     console.log(value, hook.form.description)
//                                     hook.updateForm('description', value);
//                                 }}
//                             />
//                         </div>
//                         <div className={`mt-5 ${hook.modalClassName}`}>
//                             <div>Call Type</div>
//                             <InputSelect
//                                 options={hook.callTypeOptions}
//                                 dropdownMenuPostionX="right"
//                                 dropdownMenuPostionY="auto"
//                                 className={`${hook.selectedValueClassName}`}
//                                 onChange={(changeProps) => {
//                                     hook.updateForm('type', changeProps.value);
//                                 }}
//                             />
//                         </div>
//                         <div className={`mt-5 ${hook.modalClassName}`}>
//                             <div>Start Time</div>
//                             <InputSelectTime
//                                 key={hook.form.key}
//                                 className={`${hook.selectedValueClassName} cursor-pointer [&_*]:font-medium`}
//                                 defaultUtc={hook.form.scheduledStartDate}
//                                 // defaultHHmm="07:40"
//                                 // defaultUtc="2025-01-09T18:00:00+01:00"
//                                 onChange={(HHmm) => {
//                                     hook.onTimeChange('timeStart', HHmm);
//                                 }}
//                             />
//                         </div>
//                         <div className={`mt-5 ${hook.modalClassName}`}>
//                             <div>End Time</div>
//                             <InputSelectTime
//                                 key={hook.form.key}
//                                 className={`${hook.selectedValueClassName} cursor-pointer [&_*]:font-medium`}
//                                 defaultUtc={hook.form.scheduledEndDate}
//                                 onChange={(HHmm) => {
//                                     hook.onTimeChange('timeEnd', HHmm);
//                                 }}
//                             />
//                         </div>
//                         <div className={`mt-3 flex items-center text-xsm`}>
//                             <Checkbox
//                                 defaultChecked={hook.form.recurring}
//                                 onChange={(checked) => {
//                                     hook.updateForm('recurring', checked);
//                                 }}
//                             />
//                             <div className="pl-2">Please confirm that you would like to make his a recurring call</div>
//                         </div>
//                         <Button
//                             theme="red"
//                             className="mt-5 w-full rounded-md"
//                             onClick={hook.submit}
//                         >
//                             Save Changes
//                         </Button>
//                         <div className="mt-2 text-blackVar4 text-center text-xsm">Attendee will be notified of any changes</div>
//                     </div> :
//                     hook.getCallLoading ?
//                     <SkeletonLoaderUserSchedule /> :
//                     <></>
//                 }
//             </div>
//         </DocWrapperVar1>
//     );
// }

// export default ScheduleUser;