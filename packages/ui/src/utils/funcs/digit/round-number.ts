import { parseAndValidateNumber } from ".";

export const roundNumber = (n: number, precision: number = 0, approximate = true) => {
    const pow = Math.pow(10, precision);
    let rounded = Math.round((n + Number.EPSILON) * pow) / pow;

    if(!approximate){
        const splits = `${n}`.split('.');
        const intPart = splits?.[0];
        const decimalPart = splits?.[1];
        let truncDecimal = precision ? decimalPart?.substring(0, precision) : undefined;

        rounded = parseAndValidateNumber(`${intPart}${truncDecimal ? `.${truncDecimal}` : ``}`) ?? 0;
    }

    return rounded;
}
export const numberMayFloat = (n: number, precision: number = 2, approximate = true) => {
    let num = roundNumber(n, precision, approximate);
    
    return (
        Number.isInteger(num) ? num : num.toFixed(precision)
    );
}