// 'use client';

// import { useParams } from "next/navigation";
// import { useGetUserApi } from "../../utils/api/user/useGetUserApi";
// import { useLocalUser } from "../local-user-provider/useLocalUser";
// import { useEffect } from "react";

// export const useUserProfileLayout = () => {
//     const params = useParams();
//     const paramId = params.id as string | undefined;
    
//     const localUser = useLocalUser();
//     const isLocalUser = (localUser?.id && localUser.id === paramId) ? true : false;
//     const userApi = useGetUserApi();

//     useEffect(() => {
//         if(!isLocalUser && paramId){
//             userApi.trigger({
//                 userId: paramId,
//             });
//         }
//     }, [paramId]);

//     return {
//         user: isLocalUser ? localUser : userApi.data,
//         loading: isLocalUser ? localUser?.loading : userApi.loading,
//     };
// };