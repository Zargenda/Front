/* eslint-disable */
import { React, useState } from "react";
import "./calendar.css";
import {
    getConvertedData, getTypeColor, getBorderStyle, getMonthHeader, getStartYear,
    getWeekHeader, NO_SCHOOL, FESTIVE, SATURDAY, SUNDAY, CONVOCATORY, SECOND_CONVOCATORY,
    CONTINUE_CONVOCATORY, CULM_EXAM, getLegends, getWeekNumberStyle, getRealWeekNumber, SCHOOL,
    CHANGE_DAY, changeDayOptions, getWeekdayName, examOptions, getWeekConst

} from "./getCalendarData";
import { makeStyles } from '@material-ui/core/styles';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Button, Modal } from '@material-ui/core';
import { Calendar } from "@syncfusion/ej2-react-calendars";

const baseUrl = 'http://localhost:8080'

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        border: '0.4vh solid graylight',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(3, 7, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderStyle: 'outset',
        borderRadius: '1vh',
    },
    iconos: {
        cursor: 'pointer'
    },
    inputMaterial: {
        width: '100%'
    },
    modalButton: {
        marginTop:'1vw'
    },
    input: {
        height: '4vh',
        width: '40vh',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    }

}));

const CalendarTable = ({ calendarArray, editable, enableHeader, fetchCalendar }) => {
    const styles = useStyles();

    const [changeModal, setChangeModal] = useState(false);
    const [changeDate, setChangeDate] = useState("09/12/2021");
    const [changeDateOption, setChangeDateOption] = useState("Normal");
    const [changeDateType, setChangeDateType] = useState("Festivo");
    const [changeDateComment, setChangeDateComment] = useState("Comment");
    const [changeDayInfo, setChangeDayInfo] = useState({});
    //console.log("TBODY--" + JSON.stringify(calendarArray))

    const changeWeekOptions = ["a", "b", "Normal"];
    const CHANGE_DAY_OPTION = "Cambio de día", FESTIVO = "Festivo", NORMAL = "Normal", EVALUACION = "Evaluación";
    const typeOptions = [NORMAL, FESTIVO, CHANGE_DAY_OPTION, EVALUACION];

    const yearCalendar = Object.values(getConvertedData(calendarArray));
    const legendInfo = getLegends();
    const getTypeName = (type) => {
        //let map = new Map([[CHANGE_DAY, CHANGE_DAY_OPTION], [FESTIVE, FESTIVO]]);
        switch (type) {
            case FESTIVE:
                return FESTIVO
            case CHANGE_DAY:
                return CHANGE_DAY_OPTION
            case CONVOCATORY:
            case SECOND_CONVOCATORY:
            case CONTINUE_CONVOCATORY:
            case CULM_EXAM:
                return EVALUACION
            default:
                return NORMAL
        }
    }
    const openModal = (date) => {
        let dateInfo = calendarArray.find(d => d.date == date)
        setChangeDayInfo(dateInfo)
        setChangeDate(dateInfo.date);
        let type = dateInfo.type
        setChangeDateType(getTypeName(type));
        if (type == CHANGE_DAY)
            setChangeDateComment(getWeekdayName(dateInfo.day))
        else 
            setChangeDateComment(dateInfo.comment)
        let letter = dateInfo.week.charAt(0);
        console.log("--"+letter)
        if (!(letter == 'a' || letter == 'b')) setChangeDateOption("Normal");
        else setChangeDateOption(letter)
        toggleModal();
    };

    const toggleModal = () => {
        setChangeModal(!changeModal);
    };

    const getTypeConst = () => {
        if (changeDateType == NORMAL)
            return SCHOOL
        else if (changeDateType != EVALUACION)
            return changeDateType
        else 
            if (changeDateComment.includes("continua"))
                return CONTINUE_CONVOCATORY
            else if (changeDateComment.includes("1"))
                return CONVOCATORY
            else if(changeDateComment.includes("2"))
                return SECOND_CONVOCATORY
            else if(changeDateComment.includes("CULM"))
                return CULM_EXAM
    }

    const getWeekDay = () => {
        if (changeDateType != CHANGE_DAY_OPTION)
            return changeDayInfo.day;
        else
            return getWeekConst(changeDateComment);
    }
    const saveModal = async () => {
        let opt = changeDateOption;
        let date = new Date(changeDate.getTime() + dayInSeconds)

        let dateInfo = {
            date: date,
            type: getTypeConst(),
            day: getWeekDay(),
            comment: changeDateComment,
            week: changeDateOption
        };
        console.log("MODAL---" + JSON.stringify(dateInfo))
        await axios.post(baseUrl+'/ModificarC', dateInfo)
        .then(response=>{
            if(!response.data){
            //error
            }else{
            //éxito
            }
        })
        await fetchCalendar();
        toggleModal();
    };

    const modalTypeInput = () => {
        if (changeDateType == NORMAL)
            return (null)
        if (changeDateType == CHANGE_DAY_OPTION)
            return (
                <div class="modalTitle">
                    <p class="modalTitle">Cambiar a </p>
                    <DropdownButton id="dropdown-item-button" title={changeDateComment} variant="light">
                        {changeDayOptions.map((option) => (
                            <Dropdown.Item as="button" onClick={(option) => setChangeDateComment(option.target.innerText)}>{option}</Dropdown.Item>))}
                    </DropdownButton>
                </div>)
        else if (changeDateType == EVALUACION)
            return (
                <div className={styles.input}>
                    <DropdownButton id="dropdown-item-button" title={changeDateComment} variant="light">
                        {examOptions.map((option) => (
                            <Dropdown.Item as="button" onClick={(option) => setChangeDateComment(option.target.innerText)}>{option}</Dropdown.Item>))}
                    </DropdownButton>
                </div>)
            else 
                return (<input type="text" className={styles.input} value={changeDateComment} placeholder="Descripción"
                    onChange={(comment) => setChangeDateComment(comment.target.value)} />);

    }

    const modal = (
        <div className={styles.modal}>
            <h4>Editar {changeDate}</h4>
            <div class="modalTitle">
                <p class="modalTitle">Semana</p>
                <DropdownButton id="dropdown-item-button" title={changeDateOption} variant="light">
                    {changeWeekOptions.map((option) => (
                        <Dropdown.Item as="button" onClick={(option) => setChangeDateOption(option.target.innerText)}>{option}</Dropdown.Item>))}
                </DropdownButton>
            </div>
            <div class="modalTitle">
                <p class="modalTitle">Tipo</p>
                <DropdownButton id="dropdown-item-button" title={changeDateType} variant="light">
                    {typeOptions.map((option) => (
                        <Dropdown.Item as="button" onClick={(option) => { setChangeDateType(option.target.innerText); setChangeDateComment("")}}>{option}</Dropdown.Item>))}
                </DropdownButton>
            </div>
            {modalTypeInput()}
            <div className={styles.modalButton} align="right">
                <Button color="primary" onClick={() => saveModal()}>Editar</Button>
                <Button onClick={() => toggleModal()}>Cancelar</Button>
            </div>
        </div>
    );


    const tBodies = yearCalendar.map((monthValues, index) => {
        const weekValues = Object.values(monthValues.weeks);
        const weekRows = weekValues.map((actualWeek, i) => {
            const monthName = getMonthHeader(i, weekValues.length, monthValues.month);
            const weekNumber = actualWeek.weekNumber;

            var weekRows = actualWeek.dayInfo.map(function (actualDay, day) {
                const dateValue = new Date(actualDay.date).getDate();
                var color = getTypeColor(actualDay.type);
                if (actualDay.type == NO_SCHOOL)
                    return <td key={i} />;
                var styleClass =
                    getBorderStyle(actualDay.date, actualDay.day);
                if (actualDay.day == SUNDAY || actualDay.day == SATURDAY) {
                    return <td class={styleClass} style={{ backgroundColor: color }} key={day + 2}>
                        <pre> {dateValue}</pre>
                    </td>;
                } else if (actualDay.type == FESTIVE) {
                    return <td class={styleClass} style={{ backgroundColor: color, cursor: 'pointer' }} key={day + 2} 
                        onClick={() => openModal(actualDay.date)}>
                        <pre> {dateValue} </pre>
                    </td>;
                }
                if (editable)
                    if (actualDay.week == "0")
                        return <td class={styleClass} style={{ backgroundColor: color, cursor: 'pointer' }} key={day + 2} onClick={() => openModal(actualDay.date)}>
                            <pre> {dateValue}</pre>
                        </td>;
                    else
                        return <td class={styleClass} style={{ backgroundColor: color, cursor: 'pointer' }} key={day + 2} onClick={() => openModal(actualDay.date)}>
                            <pre> {dateValue} {actualDay.day}{actualDay.week} {actualDay.day}{getRealWeekNumber(actualDay.week)}</pre>
                        </td>;
                else
                    return <td class={styleClass} style={{ backgroundColor: color}} key={day + 2}>
                        <pre> {dateValue} {actualDay.day}{actualDay.week} {actualDay.day}{getRealWeekNumber(actualDay.week)}</pre>
                    </td>;
            });
            return (
                <tr key={i}>
                    {monthName}
                    <td class={getWeekNumberStyle(i, actualWeek.finalWeek)}> {weekNumber}  </td>
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
            <div class="legendHeader">
                <div class="legendRow">
                    <div class="square" style={{ backgroundColor: color }} />
                    {text}
                </div>
            </div>
        );
    });

    return (
                <div class="calendarRow">
            {calendarArray.length > 0? <div>
                <table class="calendarTable">
                     <thead>
                        <tr>
                            <th class="header">{getStartYear()}</th>
                            {getWeekHeader(enableHeader)}
                        </tr>
                    </thead>
                    {tBodies}
                </table>
            </div> : null}
                <Modal
                        open={changeModal}
                        onClose={toggleModal}>
                        {modal}
                    </Modal>
                    <div> {legendsList} </div>
                </div>
    );
};

export default CalendarTable;
