'use client';

import { usePathname } from "next/navigation";
import SideNavPanelNBodyLayout from "../dashboard-layout/SideNavPanelNBodyLayout";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import Navigate from "../node/Navigate";
import SplashScreen from "../splash-screen/SplashScreen";

type DashboardProps = {
    children?: React.ReactNode;
}
const Dashboard = (props: DashboardProps) => {
    const localUser = useLocalUser();
    const pathname = usePathname();

    return (
        <>
            {
                localUser?.loading === true ?
                <SplashScreen /> :
                localUser?.loading === false ?
                <>
                    {
                        localUser.id && !(
                            pathname.includes(`/auth`)
                            || pathname.includes(`/become-amie`)
                        ) ?
                        <SideNavPanelNBodyLayout>
                            {props.children}
                        </SideNavPanelNBodyLayout> :
                        !localUser.id && !(
                            pathname === '/'
                            || pathname.includes(`/auth`)
                            || pathname.includes(`/become-amie`)
                        ) ?
                        <Navigate to="/" /> :
                        props.children
                    }
                </> :
                <></>
            }
        </>
    );
}

export default Dashboard;