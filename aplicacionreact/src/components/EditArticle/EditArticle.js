import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Global from "../../Global";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import swal from "sweetalert";
import ImagenDefault from '../../assets/images/imagesNot.svg';

export function withRouter(Children) {
  return (props) => {
    const match = { params: useParams() };
    return <Children {...props} match={match} />;
  };
}

class EditArticle extends React.Component {
  url = Global.url;

  articleId = null;
  titleRef = React.createRef();
  contentRef = React.createRef();

  state = {
    article: {},
    status: null,
    selectedFile: null,
  };

  constructor(props) {
    super(props);
    this.articleId = this.props.match.params.id;
    this.getArticle(this.articleId);
    this.validator = new SimpleReactValidator({
      messages: {
        required: "El campo es obligatorio.",
      },
    });
  }

  getArticle = (id) => {
    axios.get(this.url + "article/" + id).then((res) => {
      this.setState({
        article: res.data.article,
      });
    });
  };

  changeState = () => {
    this.setState({
      article: {
        title: this.titleRef.current.value,
        content: this.contentRef.current.value,
        image: this.state.article.image
      },
    });

    this.validator.showMessages();
    this.forceUpdate();
  };

  saveArticle = (e) => {
    e.preventDefault();

    //Rellenar state con formulario

    this.changeState();

    if (this.validator.allValid()) {
      //Hacer una peticion http por post para guardar el archivo

      axios.put(this.url + "article/" + this.articleId, this.state.article)
      .then((res) => {
        if (res.data.article) {
          this.setState({
            article: res.data.article,
            status: "waiting",
          });

          swal(
            "Artículo creado",
            "El artículo ha sido creado correctamente",
            "success"
          );

          //Subir la imagen

          if (this.state.selectedFile !== null) {
            //Sacar id del articulo guardado

            var articleId = this.state.article._id;

            //Crear form data y añadir fichero

            const formData = new FormData();

            formData.append(
              "file0",
              this.state.selectedFile,
              this.state.selectedFile.name
            );

            //Peticion ajax

            axios
              .post(this.url + "upload-image/" + articleId, formData)
              .then((res) => {
                if (res.data.article) {
                  this.setState({
                    article: res.data.article,
                    status: "success",
                  });
                } else {
                  this.setState({
                    article: res.data.article,
                    status: "failed",
                  });
                }
              });
          } else {
            this.setState({
              status: "success",
            });
          }
        } else {
          this.setState({
            status: "failed",
          });
        }
      });
    } else {
      this.setState({
        status: "failed",
      });
    }
  };

  fileChange = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    });
  };

  render() {
    var article = this.state.article;

    if (this.state.status === "success" || this.state.status === "waiting") {
      return <Navigate to="/blog" />;
    }

    return (
      <div className="center">
        <section id="content">
          <h1 className="subheader">Editar artículo</h1>

          {this.state.article.title && (
            <form className="mid-form" onSubmit={this.saveArticle}>
              <div className="form-group">
                <label htmlFor="title">Titulo</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={this.state.article.title}
                  ref={this.titleRef}
                  onChange={this.changeState}
                />

                {this.validator.message(
                  "title",
                  this.state.article.title,
                  "required|alpha_num_space"
                )}
              </div>

              <div className="form-group">
                <label htmlFor="content">Contenido</label>
                <textarea
                  name="content"
                  ref={this.contentRef}
                  onChange={this.changeState}
                  defaultValue={this.state.article.content}
                ></textarea>

                {this.validator.message(
                  "content",
                  this.state.article.content,
                  "required"
                )}
              </div>

              <div className="form-group">
                <label htmlFor="file0">Imagen</label>
                <input type="file" name="file0" onChange={this.fileChange} />

                <div className="image-wrap article-img">
                  {
                  article.image !== null ? (
                    <img
                      src={this.url + "get-image/" + article.image}
                      alt={article.title}
                    />
                  ) : (
                    <img src={ImagenDefault} alt={article.title} className='imagEdit'/>
                    )
                  }
                </div>

              </div>
              <div className="clearfix"></div>

              <input
                type="submit"
                value="Guardar"
                className="btn btn-success"
              />
            </form>
          )}
          {!this.state.article.title && (
            <h2 className="subheader">Cargando...</h2>
          )}
        </section>

        <Sidebar />
      </div>
    );
  }
}

export default withRouter(EditArticle);
