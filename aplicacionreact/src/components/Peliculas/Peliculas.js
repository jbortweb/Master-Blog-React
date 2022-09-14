import React, { Component } from 'react';
import Pelicula from '../Pelicula/Pelicula';
import Sidebar from '../Sidebar/Sidebar';
import Slider from '../Slider/Slider';

export class Peliculas extends Component {

  state = {
    peliculas: [
      { titulo: 'Batman vs Superman', image: 'https://www.elviejotopo.com/wp-content/uploads/2016/03/batman-v-superman-dawn-of-justice_bb788b6f.jpg'},
      { titulo: 'Gran Torino', image: 'https://static.abc.es/Media/201504/18/clint7--644x362.jpg'},
      { titulo: 'Looper', image: 'https://es.web.img3.acsta.net/medias/nmedia/18/92/47/73/20250845.jpg'}
    ],
    nombre: 'jbortweb',
    favorita: {}
  }  

  favorita = (pelicula, indice) => {
    console.log('favorita');
    console.log(pelicula, indice);
    this.setState({
      favorita: pelicula
    })
  }

  render() {

    var pStyle = {
      background : "green",
      color : 'white',
      padding : '10px'
    };
    
    return (
      <>
      <Slider
        title='Películas'
        size='slider-small'
      />
      <div className='center'>
        <div id='content' className='peliculas'>
          <h2 className='subheader'>Listado de películas</h2>
          <p>Seleccion de las películas favoritas de {this.state.nombre}
          </p>

          {this.state.favorita.titulo &&
          <p className='favorita' style={pStyle}>
            <strong>La película favorita es : </strong>
            <span>{this.state.favorita.titulo}</span>
          </p>
          }

                {/*Crear componente de pelicula*/}
          <div id ='articles'>
            {
              this.state.peliculas.map((pelicula,i) =>{
                return (
                  <Pelicula 
                    key={i}
                    pelicula={pelicula}
                    indice = {i}
                    marcarFavorita = {this.favorita}
                  />              
                )
              })
            }
          </div>
        </div>
        <Sidebar/>
      </div>
      </>
    )
  }
}

export default Peliculas