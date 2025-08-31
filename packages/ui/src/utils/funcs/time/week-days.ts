import { __weekDayMap, __weekDays } from "../../constants/time";
import { isoDateTime, weekDayAbbr } from "../../types/time";

export const generateWeekDays = (startNumber: number, endNumber: number, startDayOfWeekIndex: number) => {
    const result = [];
    let currentDayIndex = startDayOfWeekIndex; // Start from the provided start day of the week

    // Loop through the numbers from startNumber to endNumber
    for (let i = startNumber; i <= endNumber; i++) {
        // Push an object with the number and the corresponding day of the week
        result.push({
            ...__weekDays[currentDayIndex],
            number: i,
        });

        // Move to the next day, cycling through the days of the week (0-6)
        currentDayIndex = (currentDayIndex + 1) % 7;
    }

    return result;
};


//adjusts an iso date-time to a timestamp corresponding to the day of the week;
export const adjustDateTimeToWeekDay = (isoDateTime: isoDateTime, weekDayAbbr: weekDayAbbr, asLocalTime = true) => {
    const originalDate = new Date(isoDateTime);
    const currentDay = asLocalTime ? originalDate.getDay() : originalDate.getUTCDay();
    const targetDay = __weekDayMap[weekDayAbbr].index;

    const dayDiff = targetDay - currentDay;

    // For movement: keep the direction (negative = back, positive = forward)
    const adjustedDate = new Date(originalDate);
    if(asLocalTime){
        adjustedDate.setDate(originalDate.getDate() + dayDiff);
    }
    else {
        adjustedDate.setUTCDate(originalDate.getUTCDate() + dayDiff);
    }

    return {
        iso: adjustedDate.toISOString(),
    };
}
