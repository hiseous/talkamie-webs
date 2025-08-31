import { useContext } from "react";
import { AppSocketContext } from "./AppSocketProvider";

export const useAppSocket = () => {
    return useContext(AppSocketContext)
}
