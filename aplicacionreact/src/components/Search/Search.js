import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import Articles from '../Articles/Articles';
import Sidebar from '../Sidebar/Sidebar';
import Slider from '../Slider/Slider';

const Search = () => {

    const {search} = useParams();

    return (
        <div id='blog'>
            <Slider 
                title={'Busqueda: ' + search} 
                size='slider-small'/>
            <div className='center'>
                <div id='content'>
                  <Articles
                  search = {search}/>
                </div>
                <Sidebar blog='true'/>
            </div>
        </div>
    )
  }

export default Search