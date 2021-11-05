import React from 'react';
import { useState, useEffect } from "react";
import { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Calendar from 'js-year-calendar';
import 'js-year-calendar/dist/js-year-calendar.css';
import 'js-year-calendar/locales/js-year-calendar.es';

const title = {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '3vh',
    color: 'black',
    marginLeft: '3vh',
    height: '10vh',
};


const row = {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '3vh',
    color: 'black',
    marginLeft: '12vh',

};

const date = {
    display: 'flex',
    marginLeft: '2vh',

}

const label2 = {
    marginLeft: '8vh',
    display: 'flex',

}
const label3 = {
    marginLeft: '5vh',
    display: 'flex',

}

const label4 = {
    marginLeft: '21vh',
    display: 'flex',

}

const label5 = {
    marginLeft: '13vh',
    display: 'flex',

}

const label6 = {
    marginLeft: '16vh',
    display: 'flex',

}

const add = {
    display: 'flex',
    marginLeft:'2vh',
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: "#685cf4", 
    color: 'whitesmoke', 
    borderRadius: '6px',
    width: '8%', 
    height: '5%', 
}

const gen = {
    display: 'flex',
    marginLeft:'70vh',
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: "#685cf4", 
    color: 'whitesmoke', 
    borderRadius: '6px',
    width: '8%', 
    height: '5%', 
}

const input = {
    display: 'flex',
    marginLeft: '2vh',
    height: '3vh',
    width: '30vh',
}

const cal = {
    display: 'flex',
    marginLeft:'10vh',
    marginRight: '10vh',
}

const body ={
    padding: '0.5rem calc((100vw - 1000px) / 3)',
}

const mobileTable = {
    display: "flex", 
    height: "400px", 
    width: "340px",
    scrollBehaviour: "smooth",
    overflow: "scroll", 
};

const table = {
    display: "flex", 
    height: "50vh", 
    overflow: "scroll", 
    marginLeft: "1%", 
    marginRight: "1%",
    width: "1200px",
};

const Form = () => {  
    const [startDate, setStartDate] = useState(new Date());

    return(
        <div style={body}>
            <div style={title}>
                <h1>Crear Calendario Anual</h1>
            </div>

            <div style={row}>
                <label>Primer cuatrimestre</label>
                <label style={label2} > Inicio </label>
                <p style={date} ><DatePicker id="1" selected = {startDate} 
                onChange={(date) => setStartDate(date)}
                /> </p>

                <label style={label2} > Fin </label>
                <p style={date} ><DatePicker selected = {startDate} 
                onChange={(date) => setStartDate(date)}
                /> </p>
            </div>

            <div style={row}>
                <label>Segundo cuatrimestre</label>
                <label style={label3} > Inicio </label>
                <p style={date} ><DatePicker selected = {startDate} 
                onChange={(date) => setStartDate(date)}
                /> </p>

                <label style={label2} > Fin </label>
                <p style={date} ><DatePicker selected = {startDate} 
                onChange={(date) => setStartDate(date)}
                /> </p>
            </div>

            <div class = 'festivo' style={row}>
                <label>Festivos</label>
                <label style={label4} > Inicio </label>
                <p style={date} ><DatePicker selected = {startDate} 
                onChange={(date) => setStartDate(date)}
                /> </p>

                <label style={label2} > Fin </label>
                <p style={date} ><DatePicker selected = {startDate} 
                onChange={(date) => setStartDate(date)}
                /> </p>
                <input style={input} type="text" name="fiesta"/><button style= {add}>+</button>
            </div>

            <div class = 'festivo' style={row}>
                <label>Cambios de día</label>
                <p style={label5} ><DatePicker selected = {startDate} 
                onChange={(date) => setStartDate(date)}
                /> </p>
                <input style={input} type="text" name="fiesta"/><button  style= {add}>+</button>
            </div>
            <div class = 'festivo' style={row}>
                <label>Evaluaciones</label>
                <label style={label6} > Inicio </label>
                <p style={date} ><DatePicker selected = {startDate} 
                onChange={(date) => setStartDate(date)}
                /> </p>

                <label style={label2} > Fin </label>
                <p style={date} ><DatePicker selected = {startDate} 
                onChange={(date) => setStartDate(date)}
                /> </p>
                <input style={input} type="text" name="fiesta"/><button style= {add}>+</button>
            </div>
            <br/>
            <br/>
            <button style={gen}>Generar</button>
            <br/>
            <br/>
            <br/>
            


        </div>

    )
}

export default Form