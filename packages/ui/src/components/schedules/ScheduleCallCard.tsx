'use client';

import ImageAsset from "../../assets/images/ImageAsset";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import Button from "../button/Button";
import ModalWrapperVar1 from "../modal/ModalWrapperVar1";
import { usePopUp } from "../pop-up-provider/usePopUpContext";
import UserConnectionsModal from "../user-connections/UserConnectionsModal";

type ScheduleCallCardProps = ComponentPrimitiveProps & {
    
};

const ScheduleCallCard = (props: ScheduleCallCardProps) => {
    const popUp = usePopUp();
    
    return (
        <ModalWrapperVar1
            className={`${props.className || ''} p-4 flex flex-col justify-between text-center`}
        >
            <div className="font-medium">
                Talk to an Amie
            </div>
            <Button
                theme="pink"
                className="mt-4 w-12 h-12 p-2 rounded-full flex items-center justify-center mx-auto hover:!bg-white hover:!border-redVar1 hover:!border-[1px]"
            >
                <ImageAsset
                    name="personPlusPng"
                    className="w-auto h-5"
                />
            </Button>
            <Button
                theme="pink"
                className="mt-4 block text-center rounded-md w-full"
                onClick={() => {
                    popUp?.set({
                        nodes: [
                            <UserConnectionsModal title="Schedule a Call" itemLink="schedule" />,
                        ],
                    });
                }}
            >
                Schedule a Call
            </Button>
        </ModalWrapperVar1>
    );
}

export default ScheduleCallCard;