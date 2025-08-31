// import { useEffect } from "react";
// import { useGetUserRequestsApi } from "../../utils/api/user/useGetUserRequestsApi";
// import { useLocalUser } from "../local-user-provider/useLocalUser";

// export const useUserRequestCards = () => {
//     const localUser = useLocalUser();
//     const getApi = useGetUserRequestsApi();
    
//     useEffect(() => {
//         if(localUser?.id){
//             // getApi.trigger({
//             //     userId: localUser.id,
//             // });
//         }
//     }, []);

//     return {
//         items: getApi.data?.items,
//     };
// }