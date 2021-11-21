/* eslint-disable */
import React from "react";
import "./calendar.css";
import {
    getConvertedData, getTypeStyle, getBorderStyle, getMonthHeader, getStartYear, getWeekHeader,
    SCHOOL, NO_SCHOOL, CONVOCATORY, CONTINUE_CONVOCATORY, FESTIVE, CHANGE_DAY, CULM_EXAM,
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
} from "./getCalendarData";

const CalendarTable = () => {
    const calendarArray = [
        { date: "2021-09-13", type: NO_SCHOOL, day:MONDAY, week:'a1'},
        { date: "2021-09-14", type: NO_SCHOOL, day:TUESDAY, week:'a1'},
        { date: "2021-09-15", type: SCHOOL, day:WEDNESDAY, week:'a1'},
        { date: "2021-09-16", type: SCHOOL, day:THURSDAY, week:'a1'},
        { date: "2021-09-17", type: SCHOOL, day:FRIDAY, week:'a1'},
        { date: "2021-09-18", type: FESTIVE, day:SATURDAY, week:'a1'},
        { date: "2021-09-19", type: FESTIVE, day:SUNDAY, week:'a1'},
        { date: "2021-09-20", type: SCHOOL, day:MONDAY, week:'b1'},
        { date: "2021-09-21", type: SCHOOL, day:TUESDAY, week:'b1'},
        { date: "2021-09-22", type: SCHOOL, day:WEDNESDAY, week:'b1'},
        { date: "2021-09-23", type: SCHOOL, day:THURSDAY, week:'b1'},
        { date: "2021-09-24", type: SCHOOL, day:FRIDAY, week:'b1'},
        { date: "2021-09-25", type: FESTIVE, day:SATURDAY, week:'b1'},
        { date: "2021-09-26", type: FESTIVE, day:SUNDAY, week:'b1'},
        { date: "2021-09-27", type: FESTIVE, day:MONDAY, week:'a2'},
        { date: "2021-09-28", type: CHANGE_DAY, day:MONDAY, week:'a2'},
        { date: "2021-09-29", type: SCHOOL, day:WEDNESDAY, week:'a2'},
        { date: "2021-09-30", type: CONTINUE_CONVOCATORY, day:THURSDAY, week:'a2'},
        { date: "2021-10-01", type: CONVOCATORY, day:FRIDAY, week:'a2'},
        { date: "2021-10-02", type: FESTIVE, day:SATURDAY, week:'a2'},
        { date: "2021-10-03", type: FESTIVE, day:SUNDAY, week:'a2'},
        { date: "2021-10-04", type: SCHOOL, day:MONDAY, week:'b2'},
        { date: "2021-10-05", type: SCHOOL, day:TUESDAY, week:'b2'},
        { date: "2021-10-06", type: SCHOOL, day:WEDNESDAY, week:'b2'},
        { date: "2021-10-07", type: SCHOOL, day:THURSDAY, week:'b2'},
        { date: "2021-10-08", type: SCHOOL, day:FRIDAY, week:'b2'},
        { date: "2021-10-09", type: FESTIVE, day:SATURDAY, week:'b2'},
        { date: "2021-10-10", type: FESTIVE, day:SUNDAY, week:'b2'},
        { date: "2021-10-11", type: SCHOOL, day:MONDAY, week:'a3'},
        { date: "2021-10-12", type: SCHOOL, day:TUESDAY, week:'a3'},
        { date: "2021-10-13", type: SCHOOL, day:WEDNESDAY, week:'a3'},
        { date: "2021-10-14", type: SCHOOL, day:THURSDAY, week:'a3'},
        { date: "2021-10-15", type: CULM_EXAM, day:FRIDAY, week:'a3'},
        { date: "2021-10-16", type: FESTIVE, day:SATURDAY, week:'a3'},
        { date: "2021-10-17", type: FESTIVE, day:SUNDAY, week:'a3'},
    ];
    const yearCalendar = Object.values(getConvertedData(calendarArray));

    const tBodies = yearCalendar.map((monthValues, index) => {
        const weekValues = Object.values(monthValues.weeks);
        const weekRows = weekValues.map((actualWeek, i) => {
            const monthName = getMonthHeader(i, weekValues.length, monthValues.month);
            const weekNumber = actualWeek.weekNumber;

            var weekRows = actualWeek.dayInfo.map(function (actualDay, day) {
                if (actualDay.type == NO_SCHOOL)
                    return <td ket={i}/>
                var styleClass = getTypeStyle(actualDay.type) + " " +
                        getBorderStyle(actualDay.date, actualDay.day, monthValues.finalMonthDay, actualWeek.finalWeek);
                if (actualDay.day == SUNDAY || actualDay.day == SATURDAY || actualDay.type==FESTIVE) {
                    return <td class={styleClass} key={day + 2}>{actualDay.date}</td>;
                }
                return <td class={styleClass} key={day + 2}>{actualDay.date} {actualDay.day}{actualDay.week} {actualDay.day}{weekNumber}</td>;
            });

            return (
                <tr key={i}>
                    {monthName}
                    {weekRows}
                </tr>
            );
        });

        return (
            <tbody key={index} className={monthValues.name}>
                {weekRows}
            </tbody>
        );
    });

    return (
        <div>
            <table class="calendarTable">
                <thead>
                    <tr>
                        <th class="header">{getStartYear()}</th>
                        {getWeekHeader()}
                    </tr>
                </thead>
                {tBodies}
            </table>
        </div>
    );
};

export default CalendarTable;
