export const MONDAY = "L", TUESDAY = "M", WEDNESDAY = "X", THURSDAY = "J", FRIDAY = "V", SATURDAY = "S", SUNDAY = "D";
export const weekDayName = ["sem",MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY];
export const monthName = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"];
export const WEEK_A = "WEEK_A", WEEK_B = "WEEK_B", FESTIVE = "FESTIVE", CONVOCATORY = "CONVOCATORY",
    SECOND_CONVOCATORY = "SECOND_CONVOCATORY", CONTINUE_CONVOCATORY = "CONTINUE_CONVOCATORY",
    NO_SCHOOL = "NO_SCHOOL", SCHOOL = "SCHOOL", CHANGE_DAY = "CHANGE_DAY", CULM_EXAM="CULM_EXAM";
export const JANUARY = "Ene";
const WEEK_TOTAL = 7;

//Global variables
var weekNumber = 1;
var finalWeek = 1;
var schoolYears = {
    startYear: 0,
    endYear: 1
};
var legendList = new Map();

function sortByDate(a, b) {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
}

function getLastDayMonth(day) {
    let date = new Date(day);
    return new Date(date.getFullYear(), date.getMonth()+1, 0);
}

function getDifferenceInDays(start, end) {
    let diffInSeg = ((new Date(end)).getTime() - (new Date(start)).getTime());
    return diffInSeg / (1000 * 3600 * 24);
}

const addLegend = (day) => {
    let comment = day.comment;
    if (comment != null) {
        let d = new Date(day.date);
        let formatDate = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear().toString().substr(-2);

        if (legendList.get(comment) == null) {
            legendList.set(comment, [day.type, formatDate]);
        } else {
            let lastDate = legendList.get(comment);
            lastDate[2] = formatDate;
            legendList.set(comment, lastDate);
        }
        //console.log(legendList.get(comment));
    }
}
const isFestiveWeek = (weekArray) => {
    let noFestiveDay = weekArray.filter(day => day.type == SCHOOL || day.type == CHANGE_DAY);
    return noFestiveDay.length < 3;   
}

const getDayInfo = (weekArray) => {
    let dayInfo = [];
    for (let i = 0; i < weekArray.length; i++) {
        addLegend(weekArray[i])
        dayInfo.push(
            {
                date: weekArray[i].date,
                day: weekArray[i].day,
                week: weekArray[i].week,
                type: weekArray[i].type
            }
        );
    }
    return dayInfo;
};

const getWeeks = (monthArray) => {
    let weeks = [];
    for (let i = 0; i < (monthArray.length / WEEK_TOTAL); i++) {
        let dayInfo = getDayInfo(monthArray.slice(i * WEEK_TOTAL, (i + 1) * WEEK_TOTAL));
        let thisWeekNumber = null;
        let isFinalWeek = weekNumber == finalWeek;
        if (!isFestiveWeek(dayInfo)) {
            thisWeekNumber = weekNumber;
            weekNumber++;
        } else {
            finalWeek--;
            isFinalWeek = weekNumber - 1 == finalWeek;
        }
        weeks.push(
            {
                weekNumber: thisWeekNumber,
                dayInfo: dayInfo,
                finalWeek: isFinalWeek,
            }
        );
    }
    return weeks;
}

export const getConvertedData = (calendarArray) => {
    setSchoolYears(calendarArray[0].date);
    legendList = new Map();
    calendarArray.sort(sortByDate);
    weekNumber = 1;
    finalWeek = Math.ceil(getDifferenceInDays(calendarArray[0].date, calendarArray[calendarArray.length - 1].date) / WEEK_TOTAL) ;
    let numberMonths = Math.ceil(finalWeek / 4);
    let firstDayIndex = 0, firstDayMonth, lastDayMonth, lastDayIndex;
    let calendarData = [];

    for (let i = 0; i < numberMonths; i++) {
        firstDayMonth = calendarArray[firstDayIndex].date;
        lastDayMonth = getLastDayMonth(firstDayMonth);
        lastDayIndex = firstDayIndex + Math.ceil(getDifferenceInDays(firstDayMonth, lastDayMonth) / WEEK_TOTAL) * WEEK_TOTAL;
        let monthArray = calendarArray.slice(firstDayIndex, lastDayIndex);
        calendarData.push(
            {
                month: monthName[lastDayMonth.getMonth()],
                finalMonthDay: lastDayMonth.getDate(),
                weeks: getWeeks(monthArray)
            }
        );
        firstDayIndex = lastDayIndex;
    }
    //console.log("-------------------------" + JSON.stringify(calendarData));
    return calendarData;
};

const setSchoolYears = (date) => {
    let startYear = new Date(date).getFullYear();
    schoolYears={
        startYear: startYear,
        endYear: startYear + 1
    };
}

export const getStartYear = (date) => {
    return schoolYears.startYear;
}
export const getLegends = () => {
    var legends = [];
    for (const [key, value] of legendList) {
        legends.push(
            {
                type: !value[0] ? null:value[0],
                startDate: !value[1] ? null : value[1],
                endDate: !value[2] ? null : value[2],
                comment: key
            }
        )
    }
    return legends;
}

//---Style functions
export const getTypeColor = (type) => {
    var color = "";
    switch (type) {
        case CHANGE_DAY:
            color = "yellow";
            break;
        case FESTIVE:
            color = "#C7E093";
            break;
        case CONVOCATORY:
            color = "#FF99CC";
            break;
        case CONTINUE_CONVOCATORY:
            color = "#FF33CC";
            break;
        case SECOND_CONVOCATORY:
            color = "#CC00CC";
            break;
        case CULM_EXAM:
            color = "#9966ff";
            break;
    }
    return color;
}

export const getBorderStyle = (date, day, finalDay, finalWeek) => {
    var style = "";
    if (finalDay != 0) {
        if (date == finalDay)
            style = "rightBottomBorder";
        else if ((date + 6) % finalDay < 7) {
            if (day == SUNDAY)
                style = "rightBottomBorder";
            else
                style = "bottomBorder";
        } else if (day == SUNDAY && finalWeek) {
            style = "rightBottomBorder";
        } else if (day == SUNDAY) {
            style = "rightBorder";
        } else if (finalWeek) {
            style = "bottomBorder";
        }
    }
    return style;
};

export const getMonthHeader = (index, length, month) => {
    let header = null;
    if (month != JANUARY && index == 0)
        header = (<td class="header" rowSpan={length}>{month}</td>);
    else if (month == JANUARY && index != 0)
        header = (<td class="headerWithoutTop" rowSpan={length - 1}>{month}</td>);
    else if (month == JANUARY)
        header = (<td class="headerWithoutBottom" rowSpan={1}>{schoolYears.endYear}</td>);
    return header;
}

export const getWeekHeader = () => {
    return weekDayName.map((day, i) => {
        return (<th key={i}>{day}</th>);
    });
}

export const getWeekNumberStyle = (index, finalWeek) => {
    let header = "rightBorder";
    if (finalWeek) {
        header = "rightBottomBorder";
    } else if (index == 0) {
        header = "rightTopBorder"
    }
    return header + " weekNumber";
}

export default getConvertedData;