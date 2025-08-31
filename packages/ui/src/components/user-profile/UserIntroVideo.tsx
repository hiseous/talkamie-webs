import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { userProps } from "../../utils/types/user";

type UserIntroVideoProps = ComponentPrimitiveProps & {
    user: userProps | undefined;
};

const UserIntroVideo = (props: UserIntroVideoProps) => {
    
    return (
        <>
            {
                props.user?.video?.org?.url ?
                <video
                    src={props.user.video?.org?.url}
                    controls
                    className={`${props.className || ''} rounded-md w-full h-auto`}
                /> : <></>
            }
        </>
    );
}

export default UserIntroVideo;