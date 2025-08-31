import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { userProps } from "../../utils/types/user";

type UserBioProps = ComponentPrimitiveProps & {
    user: userProps | undefined;
};

const UserBio = (props: UserBioProps) => {
    
    return (
        <>
            {
                props.user?.bio ?
                <div className={`${props.className || ''} line-clamp-4`}>
                    {props.user?.bio}
                </div> : <></>
            }
        </>
    );
}

export default UserBio;