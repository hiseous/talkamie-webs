'use client';

import LandingPage from "../landing/LandingPage";
import { useLocalUser } from "../local-user-provider/useLocalUser";
import DashboardHome from "./DashboardHome";

const Home = () => {
    const localUser = useLocalUser();
    
    return (
        <div className="h-full flex flex-col">
            {
                localUser?.id ?
                <DashboardHome /> :
                <LandingPage />
            }
        </div>
    );
}

export default Home;