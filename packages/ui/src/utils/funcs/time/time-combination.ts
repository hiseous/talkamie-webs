
type combineIntoUtcTimestampProps = {
    date?: string; //YYYY-MM-DD;
    time?: string; //HH:MM:SS;
    timezoneOffset?: number; //in minutes (e.g, +120 === UTC-02:00, -181 === UTC+03:01)
}
export const combineIntoUtcTimestamp = (props: combineIntoUtcTimestampProps) => {
    const dateTimeString = `${props.date || "0000-01-01"}T${props.time || "00:00:00"}Z`;
    // console.log(dateTimeString, props)
    const dateObj = new Date(dateTimeString);
    const adjustedDate = new Date(dateObj.getTime() + ((props.timezoneOffset ?? 0) * 60000)); //60000 = 1000(in ms) * 60(s); [converting into seconds] since timezoneOffset is in minutes;
    
    return {
        iso: adjustedDate.toISOString(), //utc timestamp;
    };
}