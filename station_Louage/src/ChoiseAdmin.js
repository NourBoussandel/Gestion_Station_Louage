
import React, { Component }  from 'react';
import { useState } from 'react';
import axios from 'axios';
import ReactDOM from "react-dom/client";
import AddDriverForm from './AddDriver';
import RemouveDriverForm from './RemouveDriver';
import './ChoiseAdmin.css'

/* 2 boutons un pour ajouter un chauffeur et l'autre pour supprimer */
function ChoiseAdminButtons() {
  const [chauffeurlist,setchauffeurlist]=useState([])
      
      
  const getchauffeurlist=()=>{
    axios.get("http://localhost:4000/get").then((response)=>{
    setchauffeurlist(response.data);
    });
  
 }
 
  
  function ClickAdd(){
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
    <React.StrictMode>
      <AddDriverForm />
    </React.StrictMode>);
  }
  function ClickRemouve(){
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
    <React.StrictMode>
      <RemouveDriverForm />
    </React.StrictMode>);
  }

  return (
    <div className="btns-admin" >   
      <h1>Modifier...</h1>          
      <input type="button" value="Ajouter" onClick={ClickAdd}/> 
      <input type="button" value="Supprimer" onClick={ClickRemouve}/>  
      <div>
              <input type='submit' onClick={getchauffeurlist} value='Voir la liste des chauffeurs'/>
              {chauffeurlist.map((val,key)=>{
          return <div className="base"><pre>{val.nom} {val.prenom}</pre></div>;

        })}
        </div>           
    </div>
  );
  
}
export default ChoiseAdminButtons;