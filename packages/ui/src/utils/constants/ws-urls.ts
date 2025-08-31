
// export const __wsDomainUrl = `http://localhost:5000`; 
// export const __wsDomainUrl = `https://backend-test-socket-io.onrender.com`;
// const __wsDomainUrl = `10.39.0.234:5000`;
// const __wsDomainUrl = `https://${wsDomain}`;
// const __wsBaseUrl = `${__wsDomainUrl}/v1`;

// const appendPathToBase = (pathname: string) => `${__wsBaseUrl}${pathname}`;

export const __wsUrls = {
    // signal: () => appendPathToBase(
    //     `/socket`
    // ),
    stunServer: () => `stun:stun.l.google.com:19302`,
    // stunServer1: `stun:stun1.l.google.com:19302`,
    // rtcServer: __wsDomainUrl,
    // signalPath: `/v1/signal`,
};