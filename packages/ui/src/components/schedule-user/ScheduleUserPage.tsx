
import { useUserProfile } from "../user-profile-provider/useUserProfile";
import ScheduleUser from "./ScheduleUser";

type ScheduleUserPageProps = {
    context: ReturnType<typeof useUserProfile> | undefined;
}
const ScheduleUserPage = (props: ScheduleUserPageProps) => {
    
    return (
        <>
            {
                props.context?.data ?
                <ScheduleUser
                    user={props.context.data}
                /> :
                undefined
            }
        </>
    );
}

export default ScheduleUserPage;