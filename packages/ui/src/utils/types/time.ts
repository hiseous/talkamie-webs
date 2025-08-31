
export type weekDayAbbr = 'sun' | 'mon' | 'tue' | 'wed' | 'thur' | 'fri' | 'sat';

export type isoDateTime = string; //utc timestamp, iso; YYYY-MM-DDTHH:MM:SS.MMMZ;
export type isoDate = `${string}-${string}-${string}`; //iso date, YYYY-MM-DD;
export type isoTime = `${string}:${string}:${string}.${string}Z`; //utc time, iso; HH:MM:SS.MMMZ;
export type iso24HrTime = `${string}:${string}` | `${string}:${string}:${string}`; //iso 24-hr time; HH:MM | HH:MM:SS;
export type timeRangeProps = {
    start?: iso24HrTime;
    end?: iso24HrTime;
}
export type dateTimeRangeProps = {
    start?: isoDateTime;
    end?: isoDateTime;
}
export type dateTimeRanges = {
    [startDateTime in isoDateTime]?: dateTimeRangeProps;
}
export type meridiem = 'am' | 'pm';