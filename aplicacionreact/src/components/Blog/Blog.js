import React, { Component } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Slider from '../Slider/Slider'

class Blog extends Component {
  render() {
    return (
        <div id='blog'>
            <Slider title='Blog' size='slider-small'/>
            <div className='center'>
                <div id='content'>
                    {/*Listado de articulos provenientes del API*/}
                </div>
                <Sidebar blog='true'/>
            </div>
        </div>
    )
  }
}

export default Blog