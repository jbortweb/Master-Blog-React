import axios from "axios";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { Link, useParams } from "react-router-dom";
import Global from "../../Global";
import Sidebar from "../Sidebar/Sidebar";
import "moment/locale/es";
import ImagenDefault from '../../assets/images/imagesNot.svg';

const Article = () => {
  const url = Global.url;

  const [articule, setArticule] = useState(null);

  useEffect(() => {
    getArticle();
  });

  const { id } = useParams();
  const getArticle = () => {
    axios.get(url + "article/" + id).then((res) => {
      setArticule(res.data.article);
    });
  };

  var article = articule;

  return (
    <div className="center">
      <section id="content">
        {article && (
          <article className="article-item article-detail">
            <div className="image-wrap article-img">
              {article.image !== null ? (
                <img
                  src={this.url + "get-image/" + article.image}
                  alt={article.title}
                />
              ) : (
                <img src={ImagenDefault} alt={article.title} />
              )}
            </div>
            <h1 className="subheader">{article.title}</h1>
            <span className="date">
              <Moment locale="es" fromNow>
                {article.date}
              </Moment>
            </span>
            <p>{article.content}</p>
            <Link to ="/blog" className="btn btn-danger">Eliminar</Link>
            <Link to ="/blog" className="btn btn-warning">Editar</Link>
            
            <div className="clearfix"></div>
          </article>
        )}
        {article === null && (
          <div className="article">
            <h2 className="subheader">El artículo no existe</h2>
            <p>Intentalo de nuevo más tarde</p>
          </div>
        )}
      </section>
      <Sidebar />
    </div>
  );
};

export default Article;
