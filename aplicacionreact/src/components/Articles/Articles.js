import React, { Component } from 'react';
import axios from 'axios';


class Articles extends Component {

    state = {
      articles: [],
      status: null
    }

    componentDidMount() {
        this.getArticles();
    }

    getArticles = () => {
        /*Peticion ajax*/
    
        axios.get("http://localhost:3900/api/articles")
          .then(res => {
            console.log(res.data);
            this.setState({
              articles: res.data.articles,
              status: 'success'
            })
          });
    }

  render() {

    if(this.state.articles.length >=1) {

        return (
          <div id='articles'>
            {/*Listado de articulos provenientes del API*/}
            {this.state.status === "success" && (
              <div>
                {this.state.articles.map((article) => {
                  return <h1 key={article._id}>{article.title}</h1>;
                })}
              </div>
            )}
          </div>
        );
    }else if (this.state.articles.length === 0 && this.state.status === 'success'){
        <div id='articles'>
            <h2 className='subheader'>No hay artículos para mostrar</h2>
            <p>No hay contenido para esta sección</p>
        </div>
    }else {
        <div id='articles'>
            <h2 className='subheader'>Cargando...</h2>
            <p>Espere mientras buscamos el contenido</p>
        </div>
    }
  }
}

export default Articles;