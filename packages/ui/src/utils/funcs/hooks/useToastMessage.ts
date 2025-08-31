
import { Bounce, toast, ToastOptions } from "react-toastify";

export const useToastMessage = () => {
    const config: ToastOptions = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        // theme: themeMode,
        transition: Bounce,
    };

    const handles = {
        success: (message: string) => {
            toast.success(message, config);
        },
        warn: (message: string) => {
            toast.warn(message, config);
        },
        error: (message: string) => {
            toast.error(message, config);
        },
    };

    return {
        ...handles,
    };
};