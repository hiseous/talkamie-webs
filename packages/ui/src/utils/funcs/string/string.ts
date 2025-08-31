
export const removeTraillingSlash = (string: string = '') => {
    let newString = string;
    if(string){
        const strLen = string.length;
        if(string[strLen - 1] === '/'){
            newString = string.substring(0, strLen - 1);
        }
    }

    return newString;
}
export const addTraillingSlash = (string: string = '') => {
    let newString = string;
    if(string){
        const strLen = string.length;
        if(string[strLen - 1] !== '/'){
            newString += '/';
        }
    }

    return newString;
}
export const capitalizeString = (text: string = '') => {
    let newString = '';
    if(text){
        const firstChar = text.substring(0, 1);
        const remainingChars = text.substring(1);
        newString = firstChar.toUpperCase() + remainingChars;
    }
    return {
        newString,
    };
}
export const getNewKey = (prefix?: string | number) => {
    return `${prefix ?? ''}${Date.now()}`;
};

export const stringIsEmpty = (text?: string): boolean => {
    //whitespaces are empty, too;
    return (text && text.length > 0 && text.replace(/\s/g, '').length > 0) ? false : true;
}