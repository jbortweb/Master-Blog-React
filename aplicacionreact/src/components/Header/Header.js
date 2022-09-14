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
                                <NavLink to='/home' activeClassName='active'>Inicio</NavLink>
                            </li>
                            <li>
                                <NavLink to='/Blog' activeClassName='active'>Blog</NavLink>
                            </li>
                            <li>
                                <NavLink to="/formulario" activeClassName='active'>Formulario</NavLink>
                            </li>
                            <li>
                                <NavLink to="/peliculas" activeClassName='active'>Películas</NavLink>
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
