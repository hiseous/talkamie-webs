import { __months, __weekDays } from "../../constants/time";
import { iso24HrTime, isoDate, isoDateTime, isoTime, meridiem } from "../../types/time";
import { parseAndValidateNumber, toInteger, toTwoDigits } from "../digit";
import { normalizeIso24Time } from "./format";


type binaryOperationType = '+' | '-';
export const binaryOpOnTimestamps = (
    timestamp1: string = new Date().toUTCString(),
    binaryOp: binaryOperationType,
    timestamp2: string = new Date().toUTCString()
) => {
    const date1 = new Date(timestamp1);
    const date2 = new Date(timestamp2);

    const inMiliSec = date1.getTime() + (date2.getTime() * (binaryOp === '+' ? 1 : -1));
    const inIso = new Date(inMiliSec).toISOString() as isoDateTime;

    const inSec = inMiliSec / 1000;
    const inMin = inSec / 60;
    const inHr = inMin / 60;
    const inDay = inHr / 24;

    const onlyAtDay = date1.getDate() + (date2.getDate() * (binaryOp === '+' ? 1 : -1));

    return {
        inMiliSec,
        inSec,
        inMin,
        inHr,
        inDay,
        inIso,

        onlyAtDay,
    };
}
export const subtractPresentDateFrom = (timestamp: string = new Date().toUTCString()) => {
    const date = new Date(timestamp);
    const binOp = binaryOpOnTimestamps(timestamp, '-');
    const formatter = new Intl.DateTimeFormat("en-US", { timeStyle: "short" });

    let on = ``;
    let at = formatter.format(date);

    if(toInteger(binOp.inSec) > 0 && toInteger(binOp.inMin) <= 1){
        at = 'now';
    }

    if(binOp.onlyAtDay === 0){
        on = 'today';
    }
    else if(binOp.onlyAtDay > 0 && binOp.onlyAtDay <= 1){
        on = 'tomorrow';
    }
    else if(binOp.onlyAtDay < 0 && binOp.onlyAtDay >= -1){
        on = 'yesterday';
    }
    else if(binOp.onlyAtDay > 1 && binOp.onlyAtDay <= 7){
        on = date.toLocaleDateString("en-US", { weekday: "long" });
    }
    else {
        on = date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
    }

    return {
        ...binOp,
        text: `${on} at ${at}`,
        on,
        at,
    };
};

export const convertToUserTimezone = (utcDateString: string) => {
    // Parse the UTC date string into a Date object
    const utcDate = new Date(utcDateString);

    // Get the user's local timezone offset in minutes (can be negative or positive)
    const offsetMinutes = utcDate.getTimezoneOffset(); 

    // Create a new Date object in the user's local timezone by applying the offset
    const localDate = new Date(utcDate.getTime() - offsetMinutes * 60000);

    // Format the local date in ISO format, and append the timezone offset
    const localDateString = localDate.toISOString();
    const offsetHours = -Math.floor(offsetMinutes / 60);
    const offsetMinutesAbs = Math.abs(offsetMinutes % 60);
    const formattedOffset = `${offsetHours >= 0 ? '+' : '-'}${String(Math.abs(offsetHours)).padStart(2, '0')}:${String(offsetMinutesAbs).padStart(2, '0')}`;

    // Return the local date string with the timezone offset (local timezone)
    return localDateString.replace('Z', formattedOffset);
};

export const fromIsoDateTimeToIsoDate = (isoDateTime: isoDateTime) => {
    return isoDateTime.split('T')[0] as isoDate;
};
export const fromTimestamp = (isoTimestamp: string | number = Date.now(), useLocalTime: boolean = true) => {
    let date: Date;
    const nowDate = new Date();

    if(typeof isoTimestamp === 'string') {
        // Parse the string as a date
        date = new Date(isoTimestamp);
    }
    else {
        // If it's a number (milliseconds), we create the Date object directly
        date = new Date(isoTimestamp);
    }

    // If using local time, we need to adjust the time using the local timezone
    const year = useLocalTime ? date.getFullYear() : date.getUTCFullYear(); // Year (local or UTC)
    const dayOfMonth = useLocalTime ? date.getDate() : date.getUTCDate(); // Day of the month (local or UTC)
    const monthIndex = useLocalTime ? date.getMonth() : date.getUTCMonth(); // Month (local or UTC)
    const HH = useLocalTime ? date.getHours() : date.getUTCHours(); // Hours (local or UTC)
    const mm = useLocalTime ? date.getMinutes() : date.getUTCMinutes(); // Minutes (local or UTC)
    const ss = useLocalTime ? date.getSeconds() : date.getUTCSeconds();
    const dayOfWeekIndex = useLocalTime ? date.getDay() : date.getUTCDay(); // Day of the week (local or UTC)

    const month = __months[monthIndex];
    const weekDay = __weekDays[dayOfWeekIndex];

    // 24-hour format time
    const formattedTime24: iso24HrTime = `${
        toTwoDigits(HH)
    }:${
        toTwoDigits(mm)
    }:${
        toTwoDigits(ss)
    }`;

    // 12-hour format time
    const hh = HH % 12 || 12; // Convert 24hr to 12hr format
    const meridiem: meridiem = HH >= 12 ? 'pm' : 'am';
    const formattedTime12 = `${
        toTwoDigits(hh)
    }:${
        toTwoDigits(mm)
    } ${meridiem}`;

    // Get the total number of days in the current month (local or UTC)
    const totalDaysInMonth = useLocalTime ? new Date(year, monthIndex + 1, 0).getDate() : new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();

    // Calculate the current week number (local or UTC)
    const startOfYear = useLocalTime ? new Date(year, 0, 1) : new Date(Date.UTC(year, 0, 1)); // January 1st of the current year
    const diffInTime = date.getTime() - startOfYear.getTime(); // Get the difference in time (milliseconds)
    const weekNumber = Math.ceil((diffInTime / 86400000 + startOfYear.getDay() + 1) / 7);

    // Calculate the first day of the month
    const firstDayDate = (
        useLocalTime ? new Date(year, monthIndex, 1) :
        new Date(Date.UTC(year, monthIndex, 1))
    );
    const firstDayWeekDayIndex = useLocalTime ? firstDayDate.getDay() : firstDayDate.getUTCDay();
    const firstDay = __weekDays[firstDayWeekDayIndex];

    const isoDate = date.toISOString().split('T')[0] as isoDate;
    
    const sameDay = (
        date.getDate() === nowDate.getDate() &&
        date.getMonth() === nowDate.getMonth() &&
        date.getFullYear() === nowDate.getFullYear()
    );

    const yesterday = new Date(nowDate);
    yesterday.setDate(nowDate.getDate() - 1);
    const isYesterday = (
        date.getDate() === yesterday.getDate() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getFullYear() === yesterday.getFullYear()
    );

    return {
        year,
        month: {
            ...month,
            totalDays: totalDaysInMonth,
            index: monthIndex,
            firstDay: {
                ...firstDay,
                weekDayIndex: firstDayWeekDayIndex,
            },
        },
        week: {
            number: weekNumber,
        },
        day: {
            ...weekDay,
            dayOfWeekIndex,
            number: dayOfMonth,
        },
        time: {
            in24Hr: formattedTime24,
            in12Hr: formattedTime12,
            iso: normalizeIso24Time(formattedTime24).normalized,
            HH,
            hh,
            mm,
            ss,
            meridiem,
        },
        date: {
            iso: (useLocalTime ? `${year}-${toTwoDigits(monthIndex + 1)}-${toTwoDigits(dayOfMonth)}` : isoDate) as isoDate,
        },
        dateTime: {
            iso: date.toISOString(),
        },
        human: {
            text: `${
                sameDay ? `today`
                : isYesterday ? `yesterday`
                : isoDate.replaceAll('-', '/')
            }`,
            chatFriendly: `${
                sameDay ? `today`
                : isYesterday ? `yesterday`
                : `${toTwoDigits(dayOfMonth)} ${month?.short} ${year}`
            }`,
        },
        // isoTimezoned: convertToUserTimezone(date.toISOString()),
    };
};

export const getTimezoneOffset = (timestamp: string) => {
    // Initialize an object to store timezone attributes
    const offset = {
        sign: 1,
        hh: 0,   // Default hour offset
        mm: 0, // Default minute offset
        ss: 0,  // Default second offset (if needed, though usually it's 0)
        hasOffset: false,
        isUtc: false,
    };

    // Check if the date string contains a 'Z' (UTC indicator)
    if (timestamp.includes('Z')) {
        return offset;  // UTC, no timezone offset
    }

    // Otherwise, check if the date string contains a timezone offset (e.g., +01:00 or -08:00)
    const offsetMatch = timestamp.match(/([+-])(\d{2}):(\d{2})(?::(\d{2}))?$/);

    if(offsetMatch) {
        // Extract the offset components
        const sign = offsetMatch[1]; // '+' or '-'
        const hh = parseInt((offsetMatch?.[2] || '').toString(), 10);
        const mm = parseInt((offsetMatch?.[3] || '').toString(), 10);
        const ss = offsetMatch[4] ? parseInt(offsetMatch[4], 10) : 0;

        // Adjust the hour based on the sign of the timezone offset
        offset.sign = sign === '+' ? 1 : -1;
        // offset.hh = sign === '+' ? hh : -hh;
        offset.hh = hh;
        offset.mm = mm;
        offset.ss = ss;
    }

    return {
        ...offset,
        hasOffset: (offset.hh || offset.mm || offset.ss) ? true : false,
        isUtc: timestamp.toString().endsWith("Z"),
    };
};

type analyzeTimestampReturnType = {
    year: number;
    month: number;
    day: number;
    hh: number;
    mm: number;
    ss: number;
    ms?: number;
    timezoneOffset?: {
        sign?: number; //-1 | 1;
        hh?: number;
        mm?: number;
    };
    isUtc?: boolean;
};
export const analyzeTimestamp = (timestamp: string = new Date().toISOString()): analyzeTimestampReturnType => {
    // Parse the input timestamp
    const date = new Date(timestamp);

    const timezoneOffsetProps = getTimezoneOffset(timestamp);
    const result: analyzeTimestampReturnType = {
        timezoneOffset: timezoneOffsetProps,

        ...(
            timezoneOffsetProps.hasOffset ? {
                year: date.getFullYear(),
                month: date.getMonth() + 1, // Months are 0-indexed, so add ,
                day: date.getDate(),
                hh: date.getHours(),
                mm: date.getMinutes(),
                ss: date.getSeconds(),
                ms: date.getMilliseconds(),
            } : {
                year: date.getUTCFullYear(),
                month: date.getUTCMonth() + 1, // Months are 0-indexed, so add ,
                day: date.getUTCDate(),
                hh: date.getUTCHours(),
                mm: date.getUTCMinutes(),
                ss: date.getUTCSeconds(),
                ms: date.getUTCMilliseconds(),
            }
        ),
    }

    // console.log(timestamp, result)

    return {
        ...result,
        isUtc: timestamp.toString().endsWith("Z"),
    };
};

type constructTimestampProps = analyzeTimestampReturnType;
export const constructTimestamp = (props: constructTimestampProps) => {
    // Create a new Date object in UTC
    const date = new Date(Date.UTC(props.year, props.month - 1, props.day, props.hh, props.mm, props.ss, props.ms));

    // Apply the timezone offset
    if (props.timezoneOffset && props.timezoneOffset.sign !== undefined) {
        const totalOffsetMinutes =
            props.timezoneOffset.sign * (((props.timezoneOffset.hh ?? 0) * 60) + (props.timezoneOffset.mm ?? 0));
        date.setUTCMinutes(date.getUTCMinutes() - totalOffsetMinutes);
    }

    // Return the ISO string of the date
    return {
        iso: date.toISOString(),
        isoTimezoned: convertToUserTimezone(date.toISOString()),
    };
};

export const extractTimeComponents = (timeString: string = "00:00") => {
    // Trim and normalize the input string
    timeString = timeString.trim();

    // Regular expressions to match 12-hour and 24-hour formats
    const twelveHourRegex = /^(\d{1,2}):(\d{2})(?::(\d{2}))?\s?(AM|PM|am|pm)?$/;
    const twentyFourHourRegex = /^(\d{1,2}):(\d{2})(?::(\d{2}))?$/;

    let match, hours, minutes, seconds;

    // Check if it's 12-hour format
    if ((match = timeString.match(twelveHourRegex))) {
        hours = parseInt(match[1] || '', 10);
        minutes = parseInt(match[2] || '', 10);
        seconds = match[3] ? parseInt(match[3], 10) : 0;

        // Handle AM/PM conversion
        const meridiem = match[4] ? match[4].toUpperCase().trim() : null;
        if (meridiem === "PM" && hours < 12) hours += 12;
        if (meridiem === "AM" && hours === 12) hours = 0;
    } 
    // Check if it's 24-hour format
    else if ((match = timeString.match(twentyFourHourRegex))) {
        hours = parseInt(match[1] || '', 10);
        minutes = parseInt(match[2] || '', 10);
        seconds = match[3] ? parseInt(match[3], 10) : 0;
    } else {
        throw new Error("Invalid time format");
    }

    return {
        hh: hours,
        mm: minutes,
        ss: seconds,
    };
};
export const extractFromIsoDateTime = (isoDateTime: isoDateTime) => {
    const splitsByT = isoDateTime.split('T') as (string | undefined)[];
    const isoDate = splitsByT[0] as isoDate | undefined;
    const isoTimeUtc = splitsByT[1] as isoTime | undefined;

    let isoTime: isoTime | undefined;
    if(isoTimeUtc) isoTime = normalizeIso24Time(isoTimeUtc).normalized;

    return {
        isoDate,
        isoTime,
    }
};

type adjustTimestampProps = {
    timestamp?: string;
    timeClock?: string; //like "12:30";
    day?: string | number; //like "26";
    op?: 'add' | 'replace';
}
export const adjustTimestamp = (props: adjustTimestampProps) => {
    const analyzedProps = analyzeTimestamp(props.timestamp);

    const constructProps: constructTimestampProps = {
        ...analyzedProps,
    };

    // console.log(props.timestamp, analyzedProps)

    if(props.timeClock){
        const extractedTimeProps = extractTimeComponents(props.timeClock);
        if(props.op === 'replace'){
            constructProps.hh = extractedTimeProps.hh;
            constructProps.mm = extractedTimeProps.mm;
        }
        else {//add;
            constructProps.hh += extractedTimeProps.hh;
            constructProps.mm += extractedTimeProps.mm;
        }
    }
    if(props.day){
        if(props.op === 'replace'){
            constructProps.day = parseInt(props.day.toString());
        }
        else {//add;
            constructProps.day += parseInt(props.day.toString());
        }
    }
    const updatedProps = constructTimestamp(constructProps);
    
    return {
        ...updatedProps,
    };
}

export const adjustDateTimeByMilliseconds = (isoDateTime: isoDateTime, milliseconds: number) => {
    const date = new Date(isoDateTime);
    date.setTime(date.getTime() + milliseconds);
    return {
        iso: date.toISOString() as isoDateTime,
        Date: date,
    };
}

export const fromIsoTime = (isoTime: isoTime) => {
    // from HH:mm:ss:SSSZ;

    let HH, mm, ss, SSS;
    // let normalized: isoTime | undefined;

    // const timePattern = /^(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?$/;
    const timePattern = /^(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?Z?$/;
    const match = isoTime?.match(timePattern);

    if(match){
        [, HH, mm, ss = '00', SSS = '000'] = match;
    }

    const hr = parseAndValidateNumber(HH) || 0;
    const min = parseAndValidateNumber(mm) || 0;
    const sec = parseAndValidateNumber(ss) || 0;
    const msec = parseAndValidateNumber(SSS) || 0;

    const totalSec = (
        (hr * 3600)
        + (min * 60)
        + sec
    );
    const totalMiliSec = (
        (totalSec * 1000)
        + msec
    );
    
    return {
        HH: {
            text: HH,
            number: hr,
        },
        mm: {
            text: mm,
            number: min,
        },
        ss: {
            text: ss,
            number: sec,
        },
        SSS: {
            text: SSS,
            number: msec,
        },
        total: {
            milisec: totalMiliSec,
        },
    };
};
