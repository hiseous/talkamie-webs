import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

type LocalizationWrapperProps = {
    children?: React.ReactNode;
}
const LocalizationWrapper = (props: LocalizationWrapperProps) => {

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {props.children}
        </LocalizationProvider>
    );
}

export default LocalizationWrapper;