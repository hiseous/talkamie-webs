import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import Button from "../button/Button";
import LoadingText from "../loader/LoadingText";
import CustomAvailabilityCalendar from "./CustomAvailabilityCalendar";
import { useCustomAvailabilitySettings } from "./useCustomAvailabilitySettings";
import { useWeeklyAvailabilitySettings } from "./useWeeklyAvailabilitySettings";

type CustomAvailabilitySettingsProps = ComponentPrimitiveProps & {
    weeklyHook?: ReturnType<typeof useWeeklyAvailabilitySettings>;
    customHook: ReturnType<typeof useCustomAvailabilitySettings>;
};

const CustomAvailabilitySettings = (props: CustomAvailabilitySettingsProps) => {
    
    return (
        <div className={`${props.className || ''}`}>
            {
                props.customHook.get.loading === false ?
                <>
                    <CustomAvailabilityCalendar
                        customHook={props.customHook}
                        // weeklyHook={props.weeklyHook}
                    />
                    <Button
                        theme="red"
                        className="w-full mt-8 rounded-md"
                        loading={props.customHook.saving}
                        onClick={props.customHook.submit}
                    >
                        Save changes
                    </Button>
                </> :
                props.customHook.get.loading ?
                <LoadingText text="loading custom availability..." /> :
                <></>
            }
        </div>
    );
}

export default CustomAvailabilitySettings;