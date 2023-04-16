import React, { Component }  from 'react';
import ReactDOM from "react-dom/client";
import './role.css';
import NumberForm from "./formUserNumber";
import LoginForm from './loginForm';
import { FaFacebook } from "react-icons/fa";
import {FaInstagram  } from "react-icons/fa";
import {FaLinkedin  } from "react-icons/fa";
import { BsInfoLg } from "react-icons/bs";

/*ce fichier présente la page d'accueil*/
class Role extends React.Component {
    constructor(props) {                                            
      super(props);
      this.state = {value: ''};
      this.handleChange = this.handleChange.bind(this);
      this.handleClick = this.handleClick.bind(this);
    }
    
    handleChange(event) {
      this.setState({value: event.target.value});
    }

    handleClick(){

      const value=this.state.value;
          if (value === 'autre')
          {
             renderLogin();  
          }
          
          if (value === 'Passager') {
            renderUserNumber();
          }
          
      }

    render() {
      return (
        <div >
            <h2 className='titre'>Bienvenue Sur notre <span>Plateforme</span>...</h2>
             <form className='liste_deroulante' >
                <div className="select">
                <select  value={this.state.value} onChange={this.handleChange}>
                    <option value="" selected disabled>Se Connecter en tant que ...</option>
                    <option value="Passager">Passager</option>
                    <option value="autre">Autre</option>
                    
                </select>
                </div>
                <button className="btn-user" onClick={this.handleClick}>suivant</button>

                
            </form>

            <div className='btns'>

            <div class="icon details">
                     <div class="tooltip"><p>
                     L'objectif de notre site est la gestion d'une station louage.<br/>
                     Trois utilisateurs peuvent profiter de notre site :<br/>
                     Premièrement l'admin, responsable de : <br/>
                     -Ajouter un chauffeur, étant nouveau dans la station, à la base. <br/>
                     -supprimer un chauffeur en cas de retraite.<br/>
                     Deuxièmement le chauffeur qui utilise le site pour marquer son entrée dans la station.<br/>
                     Troisièmement le passager qui reserve une place en utilisant son numéro de téléphone. <br/>
                      Dès que 8 places sont remplies le chauffeur sera supprimé de la table réservation.<br/>
                      Un chauffeur ne peut pas être ajouté à la table users que par l'admin et par suite il peut faire la réservation.</p>
                    </div>
                   <span > <BsInfoLg className='Aprops'  size={20}  /></span>
                  </div>
                  </div>
            <div ><img src="4.png" ></img></div>
            <div className='footer'>
              <div className='container'>
                <div className='row'>
                  <div className='col'>
                    <ul className='list'>
                    <h3>COORDONNEES</h3>
                      <li> Adresse: Station Moncef Bey Tunis</li>
                      <li>télépone:71578640</li>
                      <li>Email:Station@gmail.com</li>
                    </ul>
                    <div  className='col1'>
                     <h3>NOS RESEAUX</h3>
                    <FaFacebook class='facebook' size='20' /> <a href='https://www.facebook.com/boussandel.nour/'>station_louage_fb</a><br/> 
                    <FaInstagram class='insta' size='20'/><a href='https://www.instagram.com/?hl=fr'>station_louage_insta</a> <br/>
                    <FaLinkedin class='linkedin' size='20'/><a href='https://www.linkedin.com/feed/'>station_louage_linkedin</a>
                       </div>
                       </div>
                  
                  
                  

                </div>
              </div>

            </div>
            <div className='row1'>
                    <p className='col-sm'>
                      &copy;{new Date().getFullYear()} Station Tunisie|privacy
                    </p>
                  </div>

        </div>    
      );
    }
  }

function renderUserNumber(){
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
  <React.StrictMode>
    <NumberForm />
  </React.StrictMode>
  );
}

function renderLogin()
  {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
    <React.StrictMode>
         <LoginForm/>
    </React.StrictMode>);
  }




  export default Role;