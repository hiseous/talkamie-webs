import { __app } from "./app";

const __localStorageKey = `${__app.name.toLowerCase()}-local-storage-key`;
export const __localCookieKey = `${__app.name.toLowerCase()}-cookie-key`;

export const __localStorage = {
    userKey: `${__localStorageKey}-user`,
    userCredentialsKey: `${__localStorageKey}-user-creds`,
};