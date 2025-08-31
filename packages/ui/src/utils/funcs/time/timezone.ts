import { isoDateTime } from "../../types/time";
import { getPresentTime } from "./present-time";
import { adjustDateTimeByMilliseconds } from "./timestamp";

export const fromTimeZoneOffset = (offset = 0) => {
    //offset in minutes;
    let isoUtc = 'Z';

    if(offset !== 0){
        const sign = offset > 0 ? '-' : '+';
        const absOffset = Math.abs(offset);
        const hours = String(Math.floor(absOffset / 60)).padStart(2, '0');
        const minutes = String(absOffset % 60).padStart(2, '0');

        isoUtc = `${sign}${hours}:${minutes}`;
    }

    return {
        iso: isoUtc,
    };
}

export const adjustIsoDateTimeByTimezone = (isoDateTime: isoDateTime) => {
    const timezoneOffset = getPresentTime().timezone.offset;
    return adjustDateTimeByMilliseconds(isoDateTime, -1 * timezoneOffset * 60 * 1000).iso;
};