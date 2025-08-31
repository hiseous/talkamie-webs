import { iso24HrTime, isoTime, meridiem } from "../../types/time";
import { parseAndValidateNumber, toTwoDigits } from "../digit";

export const normalizeIso24Time = (iso24HrTime?: iso24HrTime | isoTime) => {
    // from HH:mm, HH:mm:ss,HH:mm:ss.SSS, or HH:mm:ss.SSSZ to HH:mm:ss:SSSZ;

    let normalized: isoTime | undefined;
    let completeIso24Time: iso24HrTime | undefined;

    // const timePattern = /^(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?$/;
    const timePattern = /^(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?Z?$/;
    const match = iso24HrTime?.match(timePattern);

    if(match){
        const [, HH, mm, ss = '00', SSS = '000'] = match;
        normalized = `${HH}:${mm}:${ss}.${SSS}Z`;
        completeIso24Time = `${HH}:${mm}:${ss}`;
    }

    // Step 2: Ensure seconds and milliseconds are present (default values if missing)
    // We also append "Z" for UTC timezone.

    return {
        normalized,
        iso24HrTime: completeIso24Time
    };
}

type from24HrTimeReturnType = {
    hh?: number;
    mm?: number;
    ampm?: meridiem;
    text?: {
        human?: string;
        normalized?: isoTime;
        iso24HrTime?: iso24HrTime;
    };
}
export const from24HrTime = (iso24HrTime?: iso24HrTime) => {
    const res: from24HrTimeReturnType = {};

    if(iso24HrTime?.includes(':')){
        const [hourStr, minuteStr] = iso24HrTime?.split(':');
        res.hh = parseAndValidateNumber(hourStr) ?? 0;
        res.mm = parseAndValidateNumber(minuteStr) ?? 0;
        res.ampm = res.hh >= 12 ? 'pm' : 'am';

        res.hh = res.hh % 12;
        res.hh = res.hh === 0 ? 12 : res.hh;

        const normalizeProps = normalizeIso24Time(iso24HrTime);

        res.text = {
            ...res.text,
            human: `${toTwoDigits(res.hh)}:${toTwoDigits(res.mm)} ${res.ampm}`,
            normalized: normalizeProps.normalized,
            iso24HrTime: normalizeProps.iso24HrTime,
        };
    }

    return {
        ...res,
    };
};