import { useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const useUserProfile = () => {
    return useContext(UserProfileContext)
}
