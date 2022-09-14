import React, { Component } from 'react';
import Articles from '../Articles/Articles';
import Sidebar from '../Sidebar/Sidebar';
import Slider from '../Slider/Slider';

class Blog extends Component {

  render() {

    return (
        <div id='blog'>
            <Slider title='Blog' size='slider-small'/>
            <div className='center'>
                <div id='content'>
                  <Articles/>
                </div>
                <Sidebar blog='true'/>
            </div>
        </div>
    )
  }
}

export default Blog