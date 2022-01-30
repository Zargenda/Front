import {
    getConvertedData, getTypeColor, getBorderStyle, getMonthHeader, getStartYear, getWeekHeader,
    SCHOOL, NO_SCHOOL, CONVOCATORY, CONTINUE_CONVOCATORY, FESTIVE, CHANGE_DAY, CULM_EXAM,
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY, getLegends, SECOND_CONVOCATORY, getRealWeekNumber
} from "./getCalendarData";

test('get converted calendar data and legends', () => {
    const calendarArray = [
        { date: "2021/09/13", type: NO_SCHOOL, day: MONDAY, week: 'a1', comment:"INICIO_CUATRIMESTRE"},
        { date: "2021/09/14", type: NO_SCHOOL, day: TUESDAY, week: 'a1' },
        { date: "2021/09/15", type: SCHOOL, day: WEDNESDAY, week: 'a1' },
        { date: "2021/09/16", type: SCHOOL, day: THURSDAY, week: 'a1' },
        { date: "2021/09/17", type: SCHOOL, day: FRIDAY, week: 'a1' },
        { date: "2021/09/18", type: FESTIVE, day: SATURDAY, week: 'a1' },
        { date: "2021/09/19", type: FESTIVE, day: SUNDAY, week: 'a1' },
        { date: "2021/09/20", type: SCHOOL, day: MONDAY, week: 'b1' },
        { date: "2021/09/21", type: SCHOOL, day: TUESDAY, week: 'b1' },
        { date: "2021/09/22", type: SCHOOL, day: WEDNESDAY, week: 'b1' },
        { date: "2021/09/23", type: SCHOOL, day: THURSDAY, week: 'b1' },
        { date: "2021/09/24", type: SCHOOL, day: FRIDAY, week: 'b1' },
        { date: "2021/09/25", type: FESTIVE, day: SATURDAY, week: 'b1' },
        { date: "2021/09/26", type: FESTIVE, day: SUNDAY, week: 'b1' },
        { date: "2021/09/27", type: FESTIVE, day: MONDAY, week: 'a2', comment: "Festividad de todos los Santos" },
        { date: "2021/09/28", type: CHANGE_DAY, day: MONDAY, week: 'a2', comment: "horario de lunes" },
        { date: "2021/09/29", type: SECOND_CONVOCATORY, day: WEDNESDAY, week: 'a2', comment: "Exámenes 2ª conv" },
        { date: "2021/09/30", type: CONTINUE_CONVOCATORY, day: THURSDAY, week: 'a2' },
        { date: "2021/10/01", type: CONVOCATORY, day: FRIDAY, week: 'a2', comment: "Exámenes 1ª conv" },
        { date: "2021/10/02", type: FESTIVE, day: SATURDAY, week: 'a2' },
        { date: "2021/10/03", type: FESTIVE, day: SUNDAY, week: 'a2' },
        { date: "2021/10/04", type: SCHOOL, day: MONDAY, week: 'b2' },
        { date: "2021/10/05", type: SCHOOL, day: TUESDAY, week: 'b2' },
        { date: "2021/10/06", type: SCHOOL, day: WEDNESDAY, week: 'b2' },
        { date: "2021/10/07", type: SCHOOL, day: THURSDAY, week: 'b2' },
        { date: "2021/10/08", type: SCHOOL, day: FRIDAY, week: 'b2' },
        { date: "2021/10/09", type: FESTIVE, day: SATURDAY, week: 'b2' },
        { date: "2021/10/10", type: FESTIVE, day: SUNDAY, week: 'b2' },
        { date: "2021/10/11", type: FESTIVE, day: MONDAY, week: 'a3', comment: "Festividad del Pilar" },
        { date: "2021/10/12", type: FESTIVE, day: TUESDAY, week: 'a3', comment: "Festividad del Pilar" },
        { date: "2021/10/13", type: FESTIVE, day: WEDNESDAY, week: 'a3', comment: "Festividad del Pilar" },
        { date: "2021/10/14", type: FESTIVE, day: THURSDAY, week: 'a3', comment: "Festividad del Pilar" },
        { date: "2021/10/15", type: CULM_EXAM, day: FRIDAY, week: 'a3', comment: "Exámenes CULM" },
        { date: "2021/10/16", type: FESTIVE, day: SATURDAY, week: 'a3' },
        { date: "2021/10/17", type: FESTIVE, day: SUNDAY, week: 'a3' },
    ];
    const expectedCalendar = [
        {
            month: "Sept",
            weeks: [
                {
                    weekNumber: 1,
                    finalWeek: false,
                    dayInfo: [
                        { date: "2021/09/13", day: MONDAY, week: 'a1', type: NO_SCHOOL },
                        { date: "2021/09/14", day: TUESDAY, week: 'a1', type: NO_SCHOOL },
                        { date: "2021/09/15", day: WEDNESDAY, week: 'a1', type: SCHOOL },
                        { date: "2021/09/16", day: THURSDAY, week: 'a1', type: SCHOOL },
                        { date: "2021/09/17", day: FRIDAY, week: 'a1', type: SCHOOL },
                        { date: "2021/09/18", day: SATURDAY, week: 'a1', type: FESTIVE },
                        { date: "2021/09/19", day: SUNDAY, week: 'a1', type: FESTIVE },

                    ]
                },
                {
                    weekNumber: 2,
                    finalWeek: false,
                    dayInfo: [
                        { date: "2021/09/20", day: MONDAY, week: 'b1', type: SCHOOL },
                        { date: "2021/09/21", day: TUESDAY, week: 'b1', type: SCHOOL },
                        { date: "2021/09/22", day: WEDNESDAY, week: 'b1', type: SCHOOL },
                        { date: "2021/09/23", day: THURSDAY, week: 'b1', type: SCHOOL },
                        { date: "2021/09/24", day: FRIDAY, week: 'b1', type: SCHOOL },
                        { date: "2021/09/25", day: SATURDAY, week: 'b1', type: FESTIVE },
                        { date: "2021/09/26", day: SUNDAY, week: 'b1', type: FESTIVE },
                    ]
                },
                {
                    weekNumber: null,
                    finalWeek: false,
                    dayInfo: [
                        { date: "2021/09/27", day: MONDAY, week: 'a2', type: FESTIVE },
                        { date: "2021/09/28", day: MONDAY, week: 'a2', type: CHANGE_DAY },
                        { date: "2021/09/29", day: WEDNESDAY, week: 'a2', type: SECOND_CONVOCATORY },
                        { date: "2021/09/30", day: THURSDAY, week: 'a2', type: CONTINUE_CONVOCATORY },
                        { date: "2021/10/01", day: FRIDAY, week: 'a2', type: CONVOCATORY },
                        { date: "2021/10/02", day: SATURDAY, week: 'a2', type: FESTIVE },
                        { date: "2021/10/03", day: SUNDAY, week: 'a2', type: FESTIVE },
                    ]
                }
            ]
        },
        {
            month: "Oct",
            weeks: [
                {
                    weekNumber: 3,
                    finalWeek: false,
                    dayInfo: [
                        { date: "2021/10/04", day: MONDAY, week: 'b2', type: SCHOOL },
                        { date: "2021/10/05", day: TUESDAY, week: 'b2', type: SCHOOL },
                        { date: "2021/10/06", day: WEDNESDAY, week: 'b2', type: SCHOOL },
                        { date: "2021/10/07", day: THURSDAY, week: 'b2', type: SCHOOL },
                        { date: "2021/10/08", day: FRIDAY, week: 'b2', type: SCHOOL },
                        { date: "2021/10/09", day: SATURDAY, week: 'b2', type: FESTIVE },
                        { date: "2021/10/10", day: SUNDAY, week: 'b2', type: FESTIVE },

                    ]
                },
                {
                    weekNumber: null,
                    finalWeek: true,
                    dayInfo: [
                        { date: "2021/10/11", day: MONDAY, week: 'a3', type: FESTIVE },
                        { date: "2021/10/12", day: TUESDAY, week: 'a3', type: FESTIVE },
                        { date: "2021/10/13", day: WEDNESDAY, week: 'a3', type: FESTIVE },
                        { date: "2021/10/14", day: THURSDAY, week: 'a3', type: FESTIVE },
                        { date: "2021/10/15", day: FRIDAY, week: 'a3', type: CULM_EXAM },
                        { date: "2021/10/16", day: SATURDAY, week: 'a3', type: FESTIVE },
                        { date: "2021/10/17", day: SUNDAY, week: 'a3', type: FESTIVE },
                    ]
                }
            ]
        }
    ];
    const convertedData = getConvertedData(calendarArray);
    expect(convertedData).toEqual(expectedCalendar);

    const expectedLegends = [
        { comment: "Festividad de todos los Santos", endDate: null, startDate: "27/9/21", type: FESTIVE },
        { comment: "horario de lunes", endDate: null, startDate: "28/9/21", type: CHANGE_DAY },
        { comment: "Exámenes 2ª conv", endDate: null, startDate: "29/9/21", type: "SECOND_CONVOCATORY" },
        { comment: "Exámenes 1ª conv", endDate: null, startDate: "1/10/21", type: "CONVOCATORY" },
        { comment: "Festividad del Pilar", endDate: "14/10/21", startDate: "11/10/21", type: "FESTIVE" },
        { comment: "Exámenes CULM", endDate: null, startDate: "15/10/21", type: "CULM_EXAM" }
    ];
    expect(getLegends()).toEqual(expectedLegends);
});

test('get startYear', () => {
    expect(getStartYear()).toEqual(2021);
});

test('get border style', () => {
    //cualquier domingo que no es el ultimo del mes
    expect(getBorderStyle("2021-09-19", SUNDAY)).toEqual("rightBorder")
    //de la ultima semana del mes y no es domingo
    expect(getBorderStyle("2021-09-27", MONDAY)).toEqual("bottomBorder")
    //ultimo domingo del mes
    expect(getBorderStyle("2021-09-26", SUNDAY)).toEqual("rightBottomBorder")
    //ultimo dia del mes
    expect(getBorderStyle("2021-09-30", THURSDAY)).toEqual("rightBottomBorder")
    //de la primera semana del mes
    expect(getBorderStyle("2021-10-01", FRIDAY)).toEqual("");

    getConvertedData([
        {
            "date": "2021-09-15",
            "type": "SCHOOL",
            "day": "X",
            "week": "0",
            "comment": "INICIO_CUATRIMESTRE"
        },
        {
            "date": "2021-09-16",
            "type": "SCHOOL",
            "day": "J",
            "week": "0",
            "comment": null
        },
        {
            "date": "2021-09-17",
            "type": "SCHOOL",
            "day": "V",
            "week": "0",
            "comment": null
        },
        {
            "date": "2021-09-18",
            "type": "FESTIVE",
            "day": "S",
            "week": "",
            "comment": null
        },
        {
            "date": "2021-09-19",
            "type": "FESTIVE",
            "day": "D",
            "week": "",
            "comment": null
        },
        {
            "date": "2021-09-20",
            "type": "SCHOOL",
            "day": "L",
            "week": "a1",
            "comment": null
        }
    ])
    //ultimo dia del calendario
    expect(getBorderStyle("2021-09-20", MONDAY)).toEqual("rightBottomBorder");
    //de la ultima semana del calendario y no es domingo
    expect(getBorderStyle("2021-09-16", THURSDAY)).toEqual("bottomBorder");
    //domingo de la ultima semana del calendario
    expect(getBorderStyle("2021-09-19", SUNDAY)).toEqual("rightBottomBorder");
})

test('get real week number', () => {
    const weekArray = ["a1", "b1", "a2", "b2", "a3", "b3", "a4", "b4", "a5", "b5", "a6", "b6"]
    for (let i = 0; i < weekArray.length; i++) {
        expect(getRealWeekNumber(weekArray[i])).toBe(i+1)
    }
})


