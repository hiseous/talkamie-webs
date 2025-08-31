import { PickersCalendarHeaderProps } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import IconWrapper from "../icon/IconWrapper";

type MuiCustomHeaderProps = ComponentPrimitiveProps & PickersCalendarHeaderProps<dayjs.Dayjs> & {
    
};

const MuiCustomHeader = (props: MuiCustomHeaderProps) => {
    const handles = {
        onPrevClick: () => {
            props.onMonthChange(props.currentMonth.subtract(1, 'month'), 'right');
        },
        onNextClick: () => {
            props.onMonthChange(props.currentMonth.add(1, 'month'), 'left');
        },
        onViewChange: () => {

        },
        isBeforeMinMonth: (date: dayjs.Dayjs, minDate?: dayjs.Dayjs) => {
            return minDate ? date.isBefore(minDate, 'month') : false;
        },
        isAfterMaxMonth: (date: dayjs.Dayjs, maxDate?: dayjs.Dayjs) => {
            return maxDate ? date.isAfter(maxDate, 'month') : false;
        },
    };
    
    const now = dayjs();
    const startOfToday = now.startOf('day');

    const prevMonth = props.currentMonth.subtract(1, 'month');
    const nextMonth = props.currentMonth.add(1, 'month');

    const previousMonthButtonDisabled = (
        handles.isBeforeMinMonth(prevMonth, props.minDate) ||
        (props.disablePast && prevMonth.isBefore(startOfToday, 'month'))
    );

    const nextMonthButtonDisabled = (
        handles.isAfterMaxMonth(nextMonth, props.maxDate) ||
        (props.disableFuture && nextMonth.isAfter(startOfToday, 'month'))
    );
    
    return (
        <div
            className={`${props.className || ''} flex items-center justify-between`}
            // onClick={() => {
            //     console.log('hey')
            // }}
        >
            <div className="flex-1 font-medium">
                {props.currentMonth.format('MMMM YYYY')}
            </div>
            <div className="flex items-center justify-between">
                <IconWrapper
                    svgAssetName="AngleLeft"
                    disabled={previousMonthButtonDisabled}
                    onClick={handles.onPrevClick}
                />
                <IconWrapper
                    svgAssetName="AngleRight"
                    className="ml-4"
                    disabled={nextMonthButtonDisabled}
                    onClick={handles.onNextClick}
                />
            </div>
        </div>
    );
}

export default MuiCustomHeader;