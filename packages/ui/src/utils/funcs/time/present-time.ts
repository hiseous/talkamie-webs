import { isoDate } from "../../types/time";
import { roundNumber } from "../digit/round-number";

export const getCurrentYear = () => {
    return new Date().getFullYear();
}

export const getPresentTime = () => {
    const dateTime = new Date();
    const unixMili = Date.now();
    const unix = roundNumber(unixMili / 1000); //in seconds;
    const dateTimeIso = dateTime.toISOString();

    return {
        Date: dateTime,
        date: {
            iso: dateTimeIso.split('T')[0] as isoDate,
        },
        dateTime: {
            iso: dateTimeIso,
        },
        timezone: {
            offset: dateTime.getTimezoneOffset(),
        },
        unix: {
            sec: unix,
            milisec: unixMili,
        },
    };
}