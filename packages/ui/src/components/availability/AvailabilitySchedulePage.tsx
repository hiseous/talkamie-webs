'use client';

import { useAppRoutes } from "../../utils/funcs/app-routes/useAppRoutes";
import ControlledRadioButton from "../button/ControlledRadioButton";
import HeadingAndBackButtonVar1 from "../heading/HeadingAndBackButtonVar1";
import CustomAvailabilitySettings from "./CustomAvailabilitySettings";
import { useAvailabilitySchedulePage } from "./useAvailabilitySchedulePage";
import { useCustomAvailabilitySettings } from "./useCustomAvailabilitySettings";
import { useWeeklyAvailabilitySettings } from "./useWeeklyAvailabilitySettings";
import WeeklyAvailabilitySettings from "./WeeklyAvailabilitySettings";

const AvailabilitySchedulePage = () => {
    const hook = useAvailabilitySchedulePage();
    const routes = useAppRoutes();
    const customHook = useCustomAvailabilitySettings();
    const weeklyHook = useWeeklyAvailabilitySettings();
    
    return (
        <>
            <HeadingAndBackButtonVar1>
                Availability Management
            </HeadingAndBackButtonVar1>
            <div className="max-w-[800px]">
                <div className="flex items-center">
                    {
                        hook.tabs.items.map((tab, i) => (
                            <ControlledRadioButton
                                key={i}
                                className={`${i > 0 ? 'ml-6' : ''}`}
                                checked={tab.type === hook.tabs.currentType}
                                href={routes.settings(['availability', 'schedule'], {tab: tab.type})}
                                // checked={i === hook.tabs.currentIndex}
                                // onClick={() => hook.onTabSelect(i)}
                            >{tab.label}</ControlledRadioButton>
                        ))
                    }
                </div>
                <div className="mt-6">
                    <WeeklyAvailabilitySettings
                        className={`${hook.tabs.currentType === 'weekly' ? '' : 'hidden'}`}
                        customHook={customHook}
                        weeklyHook={weeklyHook}
                    />
                    <CustomAvailabilitySettings
                        className={`${hook.tabs.currentType === 'custom' ? '' : 'hidden'}`}
                        customHook={customHook}
                        weeklyHook={weeklyHook}
                    />
                </div>
            </div>
        </>
    );
}

export default AvailabilitySchedulePage;