'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import Button from "../button/Button";
import HeadingAndBackButton from "../heading/HeadingAndBackButton";
import { useScheduleUser } from "./useScheduleUser";
import { userProps } from "../../utils/types/user";
import UserThumbLabelNode from "../user-cards/UserThumbLabelNode";
import ScheduleForm from "./ScheduleForm";

type ScheduleUserProps = ComponentPrimitiveProps & {
    user: userProps;
    viewOnly?: boolean;
};

const ScheduleUser = (props: ScheduleUserProps) => {
    const hook = useScheduleUser(props);
    
    return (
        <div
            className={`${props.className || ''}`}
        >
            <HeadingAndBackButton>
                Schedule a Call
            </HeadingAndBackButton>
            <UserThumbLabelNode
                user={props.user}
                className="mt-8"
                // leadingNode={<>
                //     <Button
                //         theme="white"
                //         className="px-8 !border-redVar1"
                //         href={props.user.id ? routes.user(props.user.id) : undefined}
                //     >
                //         View Profile
                //     </Button>
                // </>}
            />
            <div className="mt-8">
                <ScheduleForm
                    user={props.user}
                    form={hook.form}
                    onChange={hook.onChange}
                    viewOnly={props.viewOnly}
                />
                {/* <ScheduleInputTitle
                    title={hook.form.title}
                    onChange={(title) => hook.onChange('title', title)}
                    viewOnly={props.viewOnly}
                />
                <ScheduleInputDate
                    date={hook.form.startDate}
                    onChange={(date) => hook.onChange('startDate', date)}
                    className="mt-4"
                    viewOnly={props.viewOnly}
                />
                <ScheduleInputCallType
                    callType={hook.form.type}
                    onChange={(callType) => hook.onChange('type', callType)}
                    className="mt-4"
                    viewOnly={props.viewOnly}
                />
                <ScheduleInputTime
                    title="Start Time"
                    time={hook.form.startTime}
                    onChange={(time) => hook.onChange('startTime', time)}
                    className="mt-4"
                    viewOnly={props.viewOnly}
                />
                <ScheduleInputTime
                    title="End Time"
                    time={hook.form.endTime}
                    onChange={(time) => hook.onChange('endTime', time)}
                    className="mt-4"
                    viewOnly={props.viewOnly}
                />
                <ScheduleInputRecurrence
                    recurrence={hook.form.weeklyRecurringDay}
                    onChange={(weeklyRecurringDay) => hook.onChange('weeklyRecurringDay', weeklyRecurringDay)}
                    className="mt-4"
                    viewOnly={props.viewOnly}
                /> */}
                {
                    !props.viewOnly ?
                    <>
                        <Button
                            theme="red"
                            className="mt-8 w-full"
                            loading={hook.loading}
                            disabled={!hook.validateForm(hook.form)}
                            onClick={hook.submit}
                        >
                            Schedule
                        </Button>
                        <div className="text-center text-grayVar8 mt-2">
                            Attendee will be notified of this
                        </div>
                    </> : undefined
                }
            </div>
        </div>
    );
}

export default ScheduleUser;