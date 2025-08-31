
import { DashboardProvider } from "../dashboard-provider/DashboardProvider";
import Dashboard from "../dashboard/Dashboard";
import { LocalUserProvider } from "../local-user-provider/LocalUserProvider";
import PopUp from "../pop-up-provider/PopUp";
import { PopUpProvider } from "../pop-up-provider/PopUpProvider";
import { CustomProvider } from 'rsuite';

type RootLayoutProps = {
    children?: React.ReactNode;
}
const RootLayout = (props: RootLayoutProps) => {
    
    return (
        <>
            <LocalUserProvider>
                <DashboardProvider>
                    <CustomProvider>
                        <PopUpProvider>
                            <Dashboard>
                                {props.children}
                            </Dashboard>
                            <PopUp />
                        </PopUpProvider>
                    </CustomProvider>
                </DashboardProvider>
            </LocalUserProvider>
        </>
    );
}

export default RootLayout;