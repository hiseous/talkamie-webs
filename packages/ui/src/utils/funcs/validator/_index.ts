import { __regExes } from "../../constants/reg-exes";

export const validateEmail = (email?: string): boolean => {
    return __regExes.email.test(email || '');
}
// export const validatePassword = (password?: string): boolean => {
//     return (password && password.length >= 8) ? true : false;
// }
export const validatePassword = (password?: string): boolean => {
    const minLength = 10;
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    const number = /\d/;
    // const specialChar = /[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    const specialChar = /[^A-Za-z0-9]/;

    const isValid = (
        password && password.length >= minLength &&
        uppercase.test(password) &&
        lowercase.test(password) &&
        number.test(password) &&
        specialChar.test(password)
    ) ? true : false;
    return isValid;
    // return (password && password.length >= 8) ? true : false;
}
export const validateOTP = (otp?: string): boolean => {
    return (otp && otp.length >= 4) ? true : false;
}