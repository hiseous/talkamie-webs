import { connectRequestProps } from "../../utils/types/connect";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import UserCardVar2 from "../user-cards/UserCardVar2";

type PendingRequestCardProps = ComponentPrimitiveProps & {
    request: connectRequestProps;
};

const PendingRequestCard = (props: PendingRequestCardProps) => {
    
    return (
        <div
            className={`${props.className || ''}`}
        >
            <UserCardVar2
                user={props.request.user ?? {}}
                className="w-full h-full"
                viewLabel="View details"
            />
        </div>
    );
}

export default PendingRequestCard;