import { useContext } from "react";
import { ScheduleLayoutContext } from "./ScheduleLayoutProvider";

export const useScheduleLayout = () => {
    return useContext(ScheduleLayoutContext)
}
