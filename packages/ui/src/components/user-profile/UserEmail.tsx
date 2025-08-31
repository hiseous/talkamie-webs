import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { userProps } from "../../utils/types/user";
import WrapperVar1 from "../wrapper/WrapperVar1";

type UserEmailProps = ComponentPrimitiveProps & {
    user: userProps | undefined;
};

const UserEmail = (props: UserEmailProps) => {
    
    return (
        <>
            {
                props.user?.email ?
                <WrapperVar1 className={`${props.className || ''} p-4`}>
                    <div className="font-medium text-lg">Email Address</div>
                    <div className="mt-2">
                        {props.user.email}
                    </div>
                </WrapperVar1> : <></>
            }
        </>
    );
}

export default UserEmail;