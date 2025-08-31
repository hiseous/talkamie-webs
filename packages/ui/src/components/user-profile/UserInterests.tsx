import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import BlandTag from "../label/BlandTag";
import { userProps } from "../../utils/types/user";
import WrapperVar1 from "../wrapper/WrapperVar1";

type UserInterestsProps = ComponentPrimitiveProps & {
    user: userProps | undefined;
};

const UserInterests = (props: UserInterestsProps) => {
    
    return (
        <>
            {
                props.user?.interests?.length ?
                <WrapperVar1 className={`${props.className || ''} p-4`}>
                    <div className="font-medium text-lg">Interests</div>
                    <div className="mt-3 flex items-center flex-wrap">
                        {
                            props.user?.interests?.map((interest, i) => {
                                return (
                                    <BlandTag
                                        key={`${i}`}
                                        className={`${(i < (props.user?.interests?.length ?? 0) - 1) ? 'mr-2' : ''} my-2 bg-white`}
                                        // iconSrc={interest.iconSrc}
                                        label={interest.name}
                                        emoji={interest.emoji}
                                    />
                                )
                            })
                        }
                    </div>
                </WrapperVar1> : <></>
            }
        </>
    );
}

export default UserInterests;