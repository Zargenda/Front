import { SCHOOL, FESTIVE, CHANGE_DAY, CONTINUE_CONVOCATORY, CONVOCATORY, SECOND_CONVOCATORY, getTypeColor } from "./getCalendarData";



const LegendHeader = () => {
    const legendInfo = [
        {
            type: SCHOOL,
            comment: "Día lectivo sin prácticas programadas por la Escuela"
        },
        {
            type: CHANGE_DAY,
            comment: "Día con horario de otro de día de la semana "
        },
        {
            type: CONTINUE_CONVOCATORY,
            comment: "Día para la realización, en su caso, de las actividades finales de evaluación continua"
        },
        {
            type: CONVOCATORY,
            comment: "Día reservado para exámenes 1ª convocatoria"
        },
        {
            type: SECOND_CONVOCATORY,
            comment: "Día reservado para exámenes 2ª convocatoria"
        },
        {
            type: FESTIVE,
            comment: "Día no lectivo"
        },
    ];
    const legendsList = legendInfo.map((legend, index) => {
        var color = getTypeColor(legend.type);
        return (
                <div class="legendRow">
                    <div class="squareWithBorder" style={{ backgroundColor: color }} />
                    <pre class="legendText"> {legend.comment}</pre>
                </div>
        );
    });
    return (
        <div class="legendHeader">
            {legendsList}
        </div>
        );
}
export default LegendHeader;
