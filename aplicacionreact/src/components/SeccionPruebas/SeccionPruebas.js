import React, { Component } from 'react';
import MiComponente from '../MiComponente/MiComponente';

export class SeccionPruebas extends Component {

    contador = 0;

    constructor(props){
        super(props);
        this.state = {
            contador: 0
        }
    }
    
    HolaMundo(nombre, edad) {
        var presentacion = (
            <div>
                <h2>Hola, soy {nombre}</h2>
                <h3>Tengo {edad} años</h3>
            </div>
        )
        return presentacion;
    }
    sumar = () => {
        this.setState({
            contador: (this.state.contador +1)
        });
    }
    restar = () => {
        this.setState({
            contador: (this.state.contador -1)
        });
    }
    
    render() {
      var nombre = 'jbortweb';

    return (
        <section id='content'>
            <h2 className="subheader">Últimos artículos</h2>
            <p>
                {this.props.title}
            </p>

            {this.HolaMundo(nombre, 12)}
        <section className='componentes'>
        <MiComponente/>
        </section>
        <h2 className="subheader">Estado</h2>
        <p>contador: {this.state.contador}</p>
        <input type='button' value='Sumar' onClick={this.sumar}/>
        <input type='button' value='Restar' onClick={this.restar}/>
      </section>

    )
  }
}

export default SeccionPruebas