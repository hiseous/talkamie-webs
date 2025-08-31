
import { useUserProfile } from "../user-profile-provider/useUserProfile";
import UserProfileCard from "./UserProfileCard";

type UserProfilePageProps = {
    context: ReturnType<typeof useUserProfile> | undefined;
}
const UserProfilePage = (props: UserProfilePageProps) => {
    
    return (
        <>
            {
                props.context?.data ?
                <UserProfileCard
                    user={props.context.data}
                    updateUser={props.context.updateUser}
                /> :
                <></>
            }
        </>
    );
}

export default UserProfilePage;