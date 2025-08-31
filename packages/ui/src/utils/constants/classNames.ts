
export const __classNames = {
    //tailwind classNames;
    maxWidthA: `max-w-[496px]`,
    transition: `transition-all ease-in-out`,
    posCenterX: `left-[50%] translate-x-[-50%]`,
    posCenterY: `top-[50%] translate-y-[-50%]`,
    posCenter: `left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%]`,
    screenH: `!h-[100dvh] h-[100vh]`,
    inputVar1: `px-6 py-5 border-[1.5px] border-grayVar6 rounded-lg`,
    muiStaticDatePicker: `
        !min-w-[unset] max-w-[800px] !block mx-auto sm:[&_*]:!text-base

        [&_.MuiDateCalendar-root]:w-full [&_.MuiDateCalendar-root]:h-auto [&_.MuiDateCalendar-root]:max-h-[unset]

        [&_.MuiPickersCalendarHeader-root]:mt-0 [&_.MuiPickersCalendarHeader-root]:px-0 [&_.MuiPickersCalendarHeader-root]:justify-between

        [&_.MuiPickersCalendarHeader-label]:text-redVar1

        [&_.MuiPickersCalendarHeader-labelContainer]:mr-[unset] [&_.MuiPickersCalendarHeader-labelContainer]:w-[fit-content]

        sm:[&_.MuiSvgIcon-root]:w-[32px] sm:[&_.MuiSvgIcon-root]:h-[32px]
        md:[&_.MuiSvgIcon-root]:w-[38px] md:[&_.MuiSvgIcon-root]:h-[38px]

        [&_.MuiYearCalendar-root[role="radiogroup"]]:w-full [&_.MuiYearCalendar-root[role="radiogroup"]]:grid
        [&_.MuiYearCalendar-root[role="radiogroup"]]:grid-cols-3 [&_.MuiYearCalendar-root[role="radiogroup"]]:gap-2
        sm:[&_.MuiYearCalendar-root[role="radiogroup"]]:grid-cols-4 sm:[&_.MuiYearCalendar-root[role="radiogroup"]]:gap-3
        md:[&_.MuiYearCalendar-root[role="radiogroup"]]:grid-cols-5 md:[&_.MuiYearCalendar-root[role="radiogroup"]]:gap-5
        lg:[&_.MuiYearCalendar-root[role="radiogroup"]]:grid-cols-6 lg:[&_.MuiYearCalendar-root[role="radiogroup"]]:gap-6

        [&_.MuiPickersYear-yearButton]:w-[fit-content] [&_.MuiPickersYear-yearButton]:h-[fit-content] [&_.MuiPickersYear-yearButton]:rounded-full
        [&_.MuiPickersYear-yearButton]:px-4 md:[&_.MuiPickersYear-yearButton]:py-[7px]
        [&_.MuiPickersYear-yearButton.Mui-disabled]:text-grayVar1
        [&_.MuiPickersYear-yearButton.Mui-selected]:!bg-redVar1 [&_.MuiPickersYear-yearButton.Mui-selected]:!text-white

        [&_.MuiPickersSlideTransition-root.MuiDayCalendar-slideTransition]:min-h-[200px] md:[&_.MuiPickersSlideTransition-root.MuiDayCalendar-slideTransition]:min-h-[300px]
        lg:[&_.MuiPickersSlideTransition-root.MuiDayCalendar-slideTransition]:min-h-[400px]
        [&_.MuiTypography-caption.MuiDayCalendar-weekDayLabel]:font-semibold [&_.MuiTypography-caption.MuiDayCalendar-weekDayLabel]:shrink-0
        [&_.MuiTypography-caption.MuiDayCalendar-weekDayLabel]:w-[36px] [&_.MuiTypography-caption.MuiDayCalendar-weekDayLabel]:h-[36px]
        sm:[&_.MuiTypography-caption.MuiDayCalendar-weekDayLabel]:w-[54px] sm:[&_.MuiTypography-caption.MuiDayCalendar-weekDayLabel]:h-[54px]
        lg:[&_.MuiTypography-caption.MuiDayCalendar-weekDayLabel]:w-[72px] lg:[&_.MuiTypography-caption.MuiDayCalendar-weekDayLabel]:h-[72px]
        
        [&_.MuiPickersDay-root.MuiPickersDay-dayWithMargin]:shrink-0
        [&_.MuiPickersDay-root.MuiPickersDay-dayWithMargin]:w-[36px] [&_.MuiPickersDay-root.MuiPickersDay-dayWithMargin]:h-[36px]
        sm:[&_.MuiPickersDay-root.MuiPickersDay-dayWithMargin]:w-[54px] sm:[&_.MuiPickersDay-root.MuiPickersDay-dayWithMargin]:h-[54px]
        lg:[&_.MuiPickersDay-root.MuiPickersDay-dayWithMargin]:w-[72px] lg:[&_.MuiPickersDay-root.MuiPickersDay-dayWithMargin]:h-[72px]
        [&_.MuiPickersDay-root.MuiPickersDay-dayWithMargin.Mui-disabled]:text-grayVar1
        [&_.MuiPickersDay-root.MuiPickersDay-dayWithMargin.MuiPickersDay-today]:!bg-pinkVar1 [&_.MuiPickersDay-root.MuiPickersDay-dayWithMargin.MuiPickersDay-today]:!text-redVar1
        [&_.MuiPickersDay-root.MuiPickersDay-dayWithMargin.MuiPickersDay-today]:border-transparent
        [&_.MuiPickersDay-root.MuiPickersDay-dayWithMargin.Mui-selected]:!bg-redVar1 [&_.MuiPickersDay-root.MuiPickersDay-dayWithMargin.Mui-selected]:!text-white
        [&_.MuiPickersDay-root.MuiPickersDay-dayWithMargin.Mui-selected.MuiPickersDay-today]:!bg-redVar1 [&_.MuiPickersDay-root.MuiPickersDay-dayWithMargin.Mui-selected.MuiPickersDay-today]:!text-white
    `,
    rsuiteCalendar: `
        [&_.rs-btn-sm]:text-base
        [&_.rs-icon]:!text-lg

        [&_.rs-calendar-table]:border-spacing-1


        [&_.rs-calendar-table-cell]:rounded-md
        [&_.rs-calendar-table-cell]:overflow-hidden

        [&_.rs-calendar-table-cell-selected_.rs-calendar-table-cell-content]:!shadow-none
        [&_.rs-calendar-table-cell-selected_.rs-calendar-table-cell-content]:!bg-pinkVar1
        [&_.rs-calendar-table-cell-selected_.rs-calendar-table-cell-day]:!text-redVar1
        [&_.rs-calendar-table-cell-selected_.rs-calendar-table-cell-day]:!bg-transparent

        [&_.rs-calendar-table-cell-is-today_.rs-calendar-table-cell-content]:!shadow-none
        [&_.rs-calendar-table-cell-is-today_.rs-calendar-table-cell-content]:!bg-transparent
        [&_.rs-calendar-table-cell-is-today_.rs-calendar-table-cell-content]:!border-[1px] [&_.rs-calendar-table-cell-is-today_.rs-calendar-table-cell-content]:!border-redVar1
        [&_.rs-calendar-table-cell-is-today_.rs-calendar-table-cell-day]:!bg-transparent
        
        sm:[&_.rs-calendar-month-dropdown-cell-content]:text-base
        sm:[&_.rs-calendar-table-header-cell-content]:text-base
        sm:[&_.rs-calendar-table-cell-day]:text-base

        sm:[&_.rs-calendar-month-dropdown-list]:grid-cols-4 sm:[&_.rs-calendar-month-dropdown-list]:gap-4
    `,
};