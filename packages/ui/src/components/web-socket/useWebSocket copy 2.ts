// import { io, Socket } from "socket.io-client";
// import { useEffect, useState } from "react";
// import { __wsDomainUrl, __wsUrls } from "../../utils/constants/ws-urls";
// import { wsStatus } from "../../utils/types/ws";
// import { getLocalUserStorage } from "../local-user-provider/local-user-storage";

// export const useWebSocket = () => {
//     // const localUser = useLocalUser();
//     const [socket, setSocket] = useState<Socket | undefined>(undefined);
//     const [status, setStatus] = useState<wsStatus>({});
//     // const [initialized, setInitialized] = useState<boolean | undefined>(undefined);
//     // const servers = { iceServers: [{ urls: __urls.stunServer }] };

//     const handles = {
//         initialize: () => {
//             const newSocket = io(__wsDomainUrl, {
//                 path: __wsUrls.signalPath,
//                 // port: 10000,
//                 // auth: {
//                 //     userId: thisProps.userId,
//                 //     userDisplayName: thisProps.userDisplayName,
//                 // },
//                 auth: {
//                     token: getLocalUserStorage()?.accessToken,
//                 },
//             });
//             setSocket(newSocket);
//             setStatus(prev => ({
//                 ...prev,
//                 initialized: true,
//             }));
//         },
//     };

//     useEffect(() => {
//         return () => {
//             socket?.disconnect();
//         };
//     }, [status.initialized, socket]);
    
//     return {
//         ...handles,
//         socket,
//         status,
//         setStatus,
//     };
// }