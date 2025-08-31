import { toInteger, toTwoDigits } from "../digit";

export const fromSeconds = (seconds: number = 0) => {

    let n = seconds;
    const hh = toInteger(n / 3600);

    n %= 3600;
    const mm = toInteger(n / 60);

    n %= 60;
    const ss = toInteger(n);
    
    return {
        parts: {
            hh,
            mm,
            ss,
        },
        text: `${
            hh ? `${toTwoDigits(hh)}:` : ``
        }${
            toTwoDigits(mm)
        }:${
            toTwoDigits(ss)
        }`,
    };
};