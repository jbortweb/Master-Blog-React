import axios from "axios";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { Link, Navigate, useParams } from "react-router-dom";
import Global from "../../Global";
import Sidebar from "../Sidebar/Sidebar";
import "moment/locale/es";
import ImagenDefault from "../../assets/images/imagesNot.svg";
import swal from "sweetalert";

const Article = () => {
  const url = Global.url;

  const [articule, setArticule] = useState(false);
  const [suces, setSuces] = useState("success");

  useEffect(() => {
    getArticle();
  });

  const { id } = useParams();

  const getArticle = () => {
    axios.get(url + "article/" + id).then((res) => {
      setArticule(res.data.article);
      suces();
    });
  };

  var article = articule;

  const deleteArticle = (id) => {
    swal({
      title: "¿Estas seguro?",
      text: "Borraras permanentemente tu artículo",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {

          axios.delete(url + "article/" + id)
          .then((res) => {
            setArticule(res.data.article);
            setSuces("deleted");

            swal(
              "Artículo eliminado", 
              "El artículo ha sido borrado", 
              "success"
            );
          });
        }else {
          swal(
            'Tranquilo!',
            'No se ha borrado nada',
            'success'
          );
        }
    });
  };

  if (suces === "deleted") {
    return <Navigate to="/blog"></Navigate>;
  }

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
            <button
              onClick={() => {
                deleteArticle(article._id);
              }}
              className="btn btn-danger"
            >
              Eliminar
            </button>
            <Link to={"/blog/editar/" + article._id} className="btn btn-warning">
              Editar
            </Link>

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
