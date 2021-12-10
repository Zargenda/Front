/* eslint-disable */
import { React, useState } from "react";
import "./calendar.css";
import {
    getConvertedData, getTypeColor, getBorderStyle, getMonthHeader, getStartYear,
    getWeekHeader, NO_SCHOOL, FESTIVE, SATURDAY, SUNDAY, getLegends, getWeekNumberStyle
} from "./getCalendarData";
import { makeStyles } from '@material-ui/core/styles';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Button, Modal } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid graylight',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        top: '50%',
        left: '50%',
        borderStyle: 'outset',
        borderRadius: '6px',
    },
    iconos: {
        cursor: 'pointer'
    },
    inputMaterial: {
        width: '100%'
    }
}));
const CalendarTable = ({ calendarArray }) => {
    const styles = useStyles(); 

    const [changeModal, setChangeModal] = useState(false);
    const [changeDate, setChangeDate] = useState("09/12/2021");
    const [changeDateOption, setChangeDateOption] = useState("Normal");

    const changeDayOptions = ["A", "B", "Normal"]

    const yearCalendar = Object.values(getConvertedData(calendarArray));
    const legendInfo = getLegends();
    const openModal = (date) => {
        setChangeDate(date);
        setChangeModal(true);
    }

    const toggleModal = () => {
        setChangeModal(!changeModal)
    }

    const saveModal = () => {
        let opt = changeDateOption;


        toggleModal()
    }
    const modal =(
            <div className={styles.modal}>
                <h4>Cambiar semana </h4>
            <div class="modalTitle">
                <p class="modalTitle">{changeDate}</p>
                <DropdownButton id="dropdown-item-button" title={changeDateOption} variant="light">
                    {changeDayOptions.map((option) => (
                        <Dropdown.Item as="button" onClick={(option) => setChangeDateOption(option.target.innerText)}>{option}</Dropdown.Item>))}
                </DropdownButton>
            </div>
                <div align="right">
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
                var color = getTypeColor(actualDay.type);
                if (actualDay.type == NO_SCHOOL)
                    return <td key={i} />;
                var styleClass =
                    getBorderStyle(actualDay.date, actualDay.day, monthValues.finalMonthDay, actualWeek.finalWeek);
                if (actualDay.day == SUNDAY || actualDay.day == SATURDAY || actualDay.type == FESTIVE) {
                    return <td class={styleClass} style={{ backgroundColor: color}} key={day + 2}>
                        <pre> {new Date(actualDay.date).getDate()}</pre>
                    </td>;
                } 
                return <td class={styleClass} style={{ backgroundColor: color, cursor: 'pointer' }} key={day + 2} onClick={() => openModal(actualDay.date)}>
                    <pre> {new Date(actualDay.date).getDate()} {actualDay.day}{actualDay.week} {actualDay.day}{weekNumber}</pre>
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
