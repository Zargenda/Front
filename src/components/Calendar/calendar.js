/* eslint-disable */
import React from "react";
import "./calendar.css";
import {
    getConvertedData, getTypeColor, getBorderStyle, getMonthHeader, getStartYear, getWeekHeader,
    SCHOOL, NO_SCHOOL, CONVOCATORY, CONTINUE_CONVOCATORY, FESTIVE, CHANGE_DAY, CULM_EXAM,
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY, getLegends, SECOND_CONVOCATORY
} from "./getCalendarData";

const CalendarTable = ({ calendarArray }) => {
    const yearCalendar = Object.values(getConvertedData(calendarArray));
    const legendInfo = getLegends();
    const tBodies = yearCalendar.map((monthValues, index) => {
        const weekValues = Object.values(monthValues.weeks);
        const weekRows = weekValues.map((actualWeek, i) => {
            const monthName = getMonthHeader(i, weekValues.length, monthValues.month);
            const weekNumber = actualWeek.weekNumber;

            var weekRows = actualWeek.dayInfo.map(function (actualDay, day) {
                var color = getTypeColor(actualDay.type);
                if (actualDay.type == NO_SCHOOL)
                    return <td key={i} />;
                var styleClass =
                    getBorderStyle(actualDay.date, actualDay.day, monthValues.finalMonthDay, actualWeek.finalWeek);
                if (actualDay.day == SUNDAY || actualDay.day == SATURDAY || actualDay.type == FESTIVE) {
                    return <td class={styleClass} style={{ backgroundColor: color }} key={day + 2}>
                        <pre> {actualDay.date}</pre>
                    </td>;
                }
                return <td class={styleClass} style={{ backgroundColor: color }} key={day + 2}>
                    <pre> {actualDay.date} {actualDay.day}{actualDay.week} {actualDay.day}{weekNumber}</pre>
                </td>;
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

    const legendsList = legendInfo.map((legend, index) => {
        var color = getTypeColor(legend.type);
        var text = "";
        if (legend.endDate != null) {
            text = <pre class="legendText">  del {legend.startDate} al {legend.endDate}: {legend.comment}</pre>;
        } else {
            text = <pre class="legendText">  {legend.startDate}: {legend.comment}</pre>;
        }

        return (
            <div>
                <div class="legendRow">
                    <div class="square" style={{ backgroundColor: color }} />
                    {text}
                </div>
            </div>
        );
    });

    return (
        <div class="calendarRow">
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
            <div> {legendsList} </div>
        </div>
    );
};

export default CalendarTable;
