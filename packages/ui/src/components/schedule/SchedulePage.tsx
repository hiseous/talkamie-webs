
import { scheduleProps } from "../../utils/types/schedule";
import Button from "../button/Button";
import HeadingAndBackButton from "../heading/HeadingAndBackButton";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import ScheduleForm from "../schedule-user/ScheduleForm";
import UserThumbLabelNode from "../user-cards/UserThumbLabelNode";
import DocWrapperVar1 from "../wrapper/DocWrapperVar1";
import { useSchedulePage } from "./useSchedulePage";

export type SchedulePageProps = {
    data: scheduleProps;
};

const SchedulePage = (props: SchedulePageProps) => {
    const hook = useSchedulePage(props);
    const localUser = useLocalUser();
    
    return (
        <>
            <HeadingAndBackButton>
                Schedule Details
            </HeadingAndBackButton>
            <DocWrapperVar1 className="mt-8">
                <UserThumbLabelNode
                    user={props.data.attendee}
                    showRating
                    leadingNode={
                        props.data.status === 'upcoming' && localUser?.type === 'senior' ?
                        <Button
                            theme={hook.mode === 'edit' ? 'red' : 'pink-var-1'}
                            className="shrink-0 block w-full max-w-[200px] rounded-full text-center font-semibold"
                            onClick={hook.onButtonClick}
                            loading={hook.loading}
                        >
                            {
                                hook.mode === 'edit' ? 'Save' :
                                'Edit'
                            }
                        </Button>
                        : <></>
                    }
                />
                <ScheduleForm
                    user={props.data.attendee}
                    form={hook.form}
                    viewOnly={hook.mode !== 'edit'}
                    className="mt-8"
                    onChange={hook.onChange}
                />
            </DocWrapperVar1>
        </>
    );
}

export default SchedulePage;