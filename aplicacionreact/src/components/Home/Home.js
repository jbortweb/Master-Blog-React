import React, { Component } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Slider from '../Slider/Slider'

class Home extends Component {
  render() {
    return (
        <div id='home'>
            <Slider 
                title='Bienvenido al master de Frameworks de Javascript'
                btn='Ir al blog'
                size='slider-big'/>
            <div className='center'>
                <div id='content'>
                    <h1 className='subheader'>Últimos artículos</h1>
                </div>
                <Sidebar/>
            </div>
        </div>
    )
  }
}

export default Home