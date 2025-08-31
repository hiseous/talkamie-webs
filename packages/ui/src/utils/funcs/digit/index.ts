
export const fromDigitToOrdinal = (n: number): string => {
    const str = `${n}`;
    const lastN = str[str.length - 1];

    return `${n}${
        lastN == '1' ? 'st' :
        lastN == '2' ? 'nd' :
        lastN == '3' ? 'rd' :
        'th'
    }`;
}
export const toTwoDigits = (n: number): string => {
    let str = `${n}`;
    if(n < 10){
        str = `0${n}`;
    }
    return str;
}
export const toInteger = (value: number) => {
    return Math.floor(Number(value));
};

type fromCountProps = {
    count: number;
    dp?: number;
    suffix?: string;
    divisor?: number;
}
export const estimateCount = (props: fromCountProps) => {
    let toHuman = '';
    const thresh = props.divisor ?? 1000;
    const units = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
    const dp = props.dp ?? 1;
  
    if(Math.abs(props.count) < thresh) {
        toHuman = `${props.count}`;
    }
    else {
        let u = -1;
        const r = 10 ** dp;
    
        do {
            props.count /= thresh;
            ++u;
        }
        while (Math.round(Math.abs(props.count) * r) / r >= thresh && u < units.length - 1);
    
    
        toHuman = `${props.count.toFixed(dp)} ${units[u]}`;
    }

    if(props.suffix) toHuman += `${props.suffix}`;

    return {
        toHuman,
    };
}

export const isValidNumber = (value?: string | number) => {
  return typeof value === 'number' && !isNaN(value);
}
export const parseAndValidateNumber = (value?: string | number) => {
  const num = Number(value);
  return isValidNumber(num) ? num : undefined;
}