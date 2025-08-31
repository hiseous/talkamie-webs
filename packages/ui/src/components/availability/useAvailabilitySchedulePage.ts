
'use client';

import { useState } from "react";
import { userAvailabilityItemsType } from "../../utils/types/user-availability";
import { useSearchParams } from "next/navigation";
import { apiAvailabilitySubpath } from "../../utils/types/api";

type tab = {
    type: userAvailabilityItemsType;
    label: string;
}
// type tabStates = {
//     items: tab[];
//     currentIndex: number;
// }

export const useAvailabilitySchedulePage = () => {
    const searchParams = useSearchParams();
    const tabParam = searchParams.get('tab') as apiAvailabilitySubpath | undefined;
    const tab: apiAvailabilitySubpath | undefined= (['custom', 'weekly'] as (apiAvailabilitySubpath | undefined)[]).includes(tabParam) ? tabParam : undefined;

    const [tabs] = useState<tab[]>([
        {type: 'weekly', label: `General Availability`},
        {type: 'custom', label: `Custom`},
    ]);
    // const [tabs, setTabs] = useState<tabStates>({
    //     items: [
    //         {type: 'weekly', label: `General Availability`},
    //         {type: 'custom', label: `Custom`},
    //     ],
    //     currentIndex: 0,
    // });

    // const handles = {
    //     onTabSelect: (i: number) => {
    //         setTabs(prev => ({
    //             ...prev,
    //             currentIndex: i,
    //         }))
    //     },
    // };

    return {
        // ...handles,
        tabs: {
            items: tabs,
            currentType: tab || 'weekly',
            // currentType: tabs.items[tabs.currentIndex].type,
        },
    };
};