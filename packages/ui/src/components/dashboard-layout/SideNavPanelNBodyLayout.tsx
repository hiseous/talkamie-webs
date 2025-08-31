'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { __classNames } from "../../utils/constants/classNames";
import DesktopNavPanel from "../navs/DesktopNavPanel";
import MobileNavPanel from "../navs/MobileNavPanel";
import { AppSocketProvider } from "../app-socket-provider/AppSocketProvider";
import DashBodyLayout from "./DashBodyLayout";
import { useDashboard } from "../dashboard-provider/useDashboard";

type SideNavPanelNBodyLayoutProps = ComponentPrimitiveProps & {
    children?: React.ReactNode;
};

const SideNavPanelNBodyLayout = (props: SideNavPanelNBodyLayoutProps) => {
    const dashboard = useDashboard();
    
    return (
        <AppSocketProvider>
            <div className={`${props.className || ''} flex flex-col md:flex-row ${__classNames.screenH}`}>
                <DesktopNavPanel className="hidden md:flex overflow-y-auto customScrollbar p-4 w-[160px]" />
                <DashBodyLayout>
                    {props.children}
                </DashBodyLayout>
                {
                    !dashboard?.navs.hideMobileNavsOnPage ?
                    <MobileNavPanel
                        className="bg-white px-4 py-3 md:hidden"
                    /> : <></>
                }
            </div>
        </AppSocketProvider>
    );
}

export default SideNavPanelNBodyLayout;