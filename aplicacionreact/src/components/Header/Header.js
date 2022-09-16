import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import logo from '../../assets/images/react.svg';

export class Header extends Component {
    render() {
        return (
            <header id="header">
                <div className="center">
                    <div id="logo">
                        <img src= {logo} className="app-logo" alt="logo" />
                        <span id="brand">
                            <strong>Master</strong>React
                        </span>
                    </div>
                    <nav id="menu">
                        <ul>
                            <li>
                                <NavLink to='/home' style={({ isActive }) => ({ color: isActive ? '#299ebf' : '#444' })}>Inicio</NavLink>
                            </li>
                            <li>
                                <NavLink to='/blog' style={({ isActive }) => ({ color: isActive ? '#299ebf' : '#444' })}>Blog</NavLink>
                            </li>
                            <li>
                                <NavLink to="/formulario" style={({ isActive }) => ({ color: isActive ? '#299ebf' : '#444' })}>Formulario</NavLink>
                            </li>
                            <li>
                                <NavLink to="/peliculas" style={({ isActive }) => ({ color: isActive ? '#299ebf' : '#444' })}>Películas</NavLink>
                            </li>
                        </ul>
                    </nav>
                    <div className="clearfix"></div>
                </div>
            </header>
        );
    }
}

export default Header;
