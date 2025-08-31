'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { useAppSocket } from "../app-socket-provider/useAppSocket";
import CallScreen from "../call/CallScreen";
import IncommingCallModal from "../call/IncomingCallModal";
import { useDashboard } from "../dashboard-provider/useDashboard";
import ModalUnderlay from "../modal/ModalUnderlay";

type DashBodyLayoutProps = ComponentPrimitiveProps & {
    children?: React.ReactNode;
};

const DashBodyLayout = (props: DashBodyLayoutProps) => {
    const dashboard = useDashboard();
    const appSocket = useAppSocket();
    const modalUnderlayClassName = `z-[2] fixed w-full h-full left-0 top-0 md:p-8 !bg-black/[.24] backdrop-blur-sm flex items-center justify-center`;
    
    return (
        <div className={`${props.className || ''} flex-1 h-full overflow-hidden`}>
            <div
                className="overflow-y-auto customScrollbar h-full"
                onScroll={dashboard?.body.onScroll}
            >
                {props.children}
            </div>
            {
                appSocket?.peer?.onCall ?
                <ModalUnderlay className={`${modalUnderlayClassName}`}>
                    <div className="w-full h-full md:max-w-[900px] md:max-h-[84vh] md:rounded-2xl overflow-hidden md:p-3 bg-white shadow-2xl shadow-black/[.3]">
                        <CallScreen
                            className="w-full h-full md:rounded-xl overflow-hidden"
                        />
                    </div>
                </ModalUnderlay> :
                appSocket?.peer?.call?.status === 'ringing' && appSocket?.peer?.call?.direction === 'incoming' ?
                <ModalUnderlay className={`${modalUnderlayClassName}`}>
                    <IncommingCallModal
                        className="w-full md:max-w-[600px]"
                    />
                </ModalUnderlay> :
                <></>
            }
        </div>
    );
}

export default DashBodyLayout;