import React from 'react';
import { BrowserRouter, Navigate, Route, Routes, useParams} from 'react-router-dom';
import Error from '../Error/Error';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Home from '../Home/Home';
import Blog from '../Blog/Blog';
import Peliculas from '../Peliculas/Peliculas.js';
import Formulario from '../Formulario/Formulario';
import Search from '../Search/Search';
import Article from '../Article/Article';
import CreateArticle from '../CreateArticle/CreateArticle';

 /* Parametros dinamicos url
  
 const Iden = () => {
  let {id} = useParams();
  
  return (
    <div id="content">
      <h1 className="subheader">Hola amigo</h1>
      <h2>{id}</h2>
    </div>
  );
};

const Nomape = () => {
  let {nombre} = useParams();
  let {apellidos} = useParams();

  return (
    <div id="content">
      <h1 className="subheader">Estos son el nombre y apellido</h1>
      <h2>
        {nombre && !apellidos &&
          <span>{nombre}</span>
        }
        {nombre && apellidos &&
          <span>{nombre} {apellidos}</span>
        }
      </h2>
    </div>
  )
}
*/

const Router = () => {

  function GetParamsRedirect(){

    let params = useParams();

    return (
    <Navigate to={'/blog/busqueda/'+params.search} />
    )
  };

      return (
        <BrowserRouter>

          <Header/>

          <Routes>

            <Route exact path='/home' element = {<Home/>}/>   
            <Route exact path='/' element = {<Home/>}/>   
            <Route exact path='*' element = {<Error/>}/>
            <Route exact path='/blog' element = {<Blog/>}/>
            <Route exact path='/blog/articulo/:id' element = {<Article/>}/>
            <Route exact path='/blog/crear' element = {<CreateArticle/>}/>
            <Route exact path='/peliculas' element = {<Peliculas/>}/>
            <Route exact path='/formulario' element = {<Formulario/>}/>
            <Route exact path='/blog/busqueda/:search' element = {<Search/>}/>
            <Route exact path="/redirect/:search" element={<GetParamsRedirect/>} />



            {/*Aqui recogemos los datos dinamicos de la url*/}
            {/* <Route exact path='/:id' element= {<Iden/>}/>*/}
             {/*Aqui recogemos distintos parametros de la url*/}
            {/*<Route exact path='/:nombre/:apellidos?' element ={<Nomape/>}/>
            */}

          </Routes>

          <div className='clearfix'></div>
          <Footer/>

        </BrowserRouter>
    )
}

export default Router