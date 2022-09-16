import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import 'moment/locale/es';
import Global from '../../Global';
import ImagenDefault from '../../assets/images/imagesNot.svg';
import { Link } from 'react-router-dom';


class Articles extends Component {

    url = Global.url

    state = {
      articles: [],
      status: null
    }

    componentDidMount() {
        var home = this.props.home;
        var search = this.props.search;

        if(home === 'true'){
          this.getLastArticles();
        
        }else if(search && search !== null && search !== undefined){
          this.getArticlesBySearch(search);
          
        }else{
          this.getArticles();
        }
    }

    getArticlesBySearch = (search) => {
    
      axios.get(this.url+"search/" + search)
        .then(res => {

            this.setState({
              articles: res.data.articles,
              status: 'success'
            });          
        })
        .catch (err => {
          this.setState({
            articles: [],
            status: 'success'
          });
        });
    }

    getLastArticles = () => {
      /*Peticion ajax*/
  
      axios.get(this.url+"articles/last")
        .then(res => {

          this.setState({
            articles: res.data.articles,
            status: 'success'
          })
        });
    }

    getArticles = () => {
    
        axios.get(this.url+"articles")
          .then(res => {
            
            this.setState({
              articles: res.data.articles,
              status: 'success'
            })
          });
    }

  render() {

    if(this.state.articles.length >=1) {

        var listArticles = this.state.articles.map((article) => {
            return (
                <article className="article-item article-detail" key={article._id}>
                <div className="image-wrap article-img">
                    {article.image !==null ? (
                        <img src={this.url + 'get-image/' + article.image} alt={article.title}/>
                    ):(
                        <img src={ImagenDefault}alt='Paisaje'/>
                    )
                    }
                </div>
                <h1 className="subheader">{article.title}</h1>
                <span className="date">
                    <Moment fromNow>{article.date}</Moment>
                </span>
                <Link to= {'/blog/articulo/' + article._id}>Leer más</Link>

                <div className="clearfix"></div>
            </article>
            )
          });

        return (
          <div id='articles'>
            {/*Listado de articulos provenientes del API*/}
            {listArticles}
          </div>
        );
    }else if (this.state.articles.length === 0 && this.state.status === 'success'){
      return (
        <div id='articles'>
            <h2 className='subheader'>No hay artículos para mostrar</h2>
            <p>No hay contenido para esta sección</p>
        </div>
      );
    }else {
      return(
        <div id='articles'>
            <h2 className='subheader'>Cargando...</h2>
            <p>Espere mientras buscamos el contenido</p>
        </div>
      );
    }
  }
}

export default Articles;