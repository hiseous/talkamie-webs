import { weekDayAbbr } from "../types/time";

export const __months = [
    { short: 'jan', long: 'january' },
    { short: 'feb', long: 'february' },
    { short: 'mar', long: 'march' },
    { short: 'apr', long: 'april' },
    { short: 'may', long: 'may' },
    { short: 'jun', long: 'june' },
    { short: 'jul', long: 'july' },
    { short: 'aug', long: 'august' },
    { short: 'sep', long: 'september' },
    { short: 'oct', long: 'october' },
    { short: 'nov', long: 'november' },
    { short: 'dec', long: 'december' },
];

type __weekDay = {
    short: weekDayAbbr;
    long: string;
}
export const __weekDays: __weekDay[] = [
    { short: 'sun', long: 'sunday' },
    { short: 'mon', long: 'monday' },
    { short: 'tue', long: 'tuesday' },
    { short: 'wed', long: 'wednesday' },
    { short: 'thur', long: 'thursday' },
    { short: 'fri', long: 'friday' },
    { short: 'sat', long: 'saturday' },
]

type __weekDayMap = {
    [key in weekDayAbbr]: {
        index: number;
    }
}
export const __weekDayMap: __weekDayMap = {
    sun: {
        index: 0,
    },
    mon: {
        index: 1,
    },
    tue: {
        index: 2,
    },
    wed: {
        index: 3,
    },
    thur: {
        index: 4,
    },
    fri: {
        index: 5,
    },
    sat: {
        index: 6,
    },
};