import React, { Component } from 'react'

export class Slider extends Component {
  render() {
    return (
        <div id="slider" className= {this.props.size}>
        <h1>{this.props.title}</h1>
        {
          this.props.btn &&
          <a href='../Blog/Blog.js' className="btn-white">{this.props.btn}</a>
        }
    </div>
    )
  }
}

export default Slider