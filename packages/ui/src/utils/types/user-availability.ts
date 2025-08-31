import { isoDate, timeRangeProps, weekDayAbbr } from "./time";

export type userAvailabilityItemsType = 'custom' | 'weekly';
export type userAvailabilityWeeklyItems = {
    [key in weekDayAbbr]?: timeRangeProps[];
}
export type userAvailabilityCustomItems = {
    [key in isoDate]?: timeRangeProps[];
}
