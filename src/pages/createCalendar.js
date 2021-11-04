import React from 'react';
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
    marginLeft: '2vh',
}

const label2 = {
    marginLeft: '8vh',
}
const label3 = {
    marginLeft: '5vh',
}

const label4 = {
    marginLeft: '21vh',
}

const label5 = {
    marginLeft: '13vh',
}

const label6 = {
    marginLeft: '16vh',
}

const add = {
    marginLeft:'2vh',
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: "#2422BD", 
    color: 'white', 
    borderRadius: '1px', 
    width: '5%', 
    height: '5%', 
    borderColor: 'blue' 
}

const input = {
    marginLeft: '2vh',
    height: '3vh',
    width: '30vh',
}

const cal = {
    marginLeft:'10vh',
    marginRight: '10vh',
}
var gen = false;
var create = false;

class form extends Component{  


    state ={
        fecha: new Date("2021","10","03")
    }

    onChange=fecha=>{
        this.setState({fecha:fecha});
    }

    

  

    render(){

       /* function createComponent(e){
            create=true;
            if (create) return <div class = 'festivo' style={row}>
                    <label>Festivos</label>
                    <label style={label2} > Inicio </label>
                    <p style={date} ><DatePicker selected = {this.state.fecha} 
                    onChange={this.onChange}
                    /> </p>

                    <label style={label2} > Fin </label>
                    <p style={date} ><DatePicker selected = {this.state.fecha} 
                    onChange={this.onChange}
                    /> </p> 
               </div>;

            create= false;
        }*/

        function handleClickGenerate(e){
            const app = document.querySelector("#body")
           app.insertAdjacentHTML('beforeend','<div  style={cal} data-provide="calendar"></div>');
        }
        
        return(
            <div id="body">
                <div style={title}>
                    <h1>Crear Calendario Anual</h1>
                </div>

                <div style={row}>
                    <label>Primer cuatrimestre</label>
                    <label style={label2} > Inicio </label>
                    <p style={date} ><DatePicker selected = {this.state.fecha} 
                    onChange={this.onChange}
                    /> </p>

                    <label style={label2} > Fin </label>
                    <p style={date} ><DatePicker selected = {this.state.fecha} 
                    onChange={this.onChange}
                    /> </p>
                </div>

                <div style={row}>
                    <label>Segundo cuatrimestre</label>
                    <label style={label3} > Inicio </label>
                    <p style={date} ><DatePicker selected = {this.state.fecha} 
                    onChange={this.onChange}
                    /> </p>

                    <label style={label2} > Fin </label>
                    <p style={date} ><DatePicker selected = {this.state.fecha} 
                    onChange={this.onChange}
                    /> </p>
                </div>

                <div class = 'festivo' style={row}>
                    <label>Festivos</label>
                    <label style={label4} > Inicio </label>
                    <p style={date} ><DatePicker selected = {this.state.fecha} 
                    onChange={this.onChange}
                    /> </p>

                    <label style={label2} > Fin </label>
                    <p style={date} ><DatePicker selected = {this.state.fecha} 
                    onChange={this.onChange}
                    /> </p>
                    <input style={input} type="text" name="fiesta"/><button style= {add}>+</button>
                </div>

                <div class = 'festivo' style={row}>
                    <label>Cambios de día</label>
                    <p style={label5} ><DatePicker selected = {this.state.fecha} 
                    onChange={this.onChange}
                    /> </p>
                    <input style={input} type="text" name="fiesta"/><button  style= {add}>+</button>
                </div>
                <div class = 'festivo' style={row}>
                    <label>Evaluaciones</label>
                    <label style={label6} > Inicio </label>
                    <p style={date} ><DatePicker selected = {this.state.fecha} 
                    onChange={this.onChange}
                    /> </p>

                    <label style={label2} > Fin </label>
                    <p style={date} ><DatePicker selected = {this.state.fecha} 
                    onChange={this.onChange}
                    /> </p>
                    <input style={input} type="text" name="fiesta"/><button style= {add}>+</button>
                </div>
                <br/>
                <br/>
                <button style={add} onClick={(e) => handleClickGenerate(e)}>Generar</button>
                <br/>
                <br/>
                <br/>
                


            </div>

        );
    }
}

export default form;