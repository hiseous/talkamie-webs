// import { io, Socket } from "socket.io-client";
// import { useLocalUser } from "../../components/local-user-provider/useLocalUser";
// import { useEffect, useState } from "react";
// import { __wsDomainUrl, __wsUrls } from "../../utils/constants/ws-urls";

// export const useSocket = () => {
//     const localUser = useLocalUser();
//     const [socket, setSocket] = useState<Socket | undefined>(undefined);
//     const [initialized, setInitialized] = useState<boolean | undefined>(undefined);
//     // const servers = { iceServers: [{ urls: __urls.stunServer }] };

//     const handles = {
//         initialize: () => {
//             const newSocket = io(__wsDomainUrl, {
//                 path: __wsUrls.signalPath,
//                 // auth: {
//                 //     userId: thisProps.userId,
//                 //     userDisplayName: thisProps.userDisplayName,
//                 // },
//             });
//             setSocket(newSocket);
//             setInitialized(true);
//         },
//     };

//     useEffect(() => {
//         if(localUser?.id){
//             // console.log(localUser)
//             handles.initialize();
//         }
//     }, [localUser?.id]);
    
//     return {
//         ...handles,
//         socket,
//         initialized,
//     };
// }