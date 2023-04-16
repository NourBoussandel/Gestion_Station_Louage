import React, { useState } from "react"
import axios from 'axios';
import './ReservationForm.css';

/*formulaire pour q'un chauffeur puisse réserver*/
    
    function ReservationChauffForm(props) {
      const [ name, setname ] = useState(props.nom)
      const [ FamilyName, setfamilyname ] = useState(props.prenom)
      const [ cin, setcin ] = useState(props.carteIdentite)
      const [ gouver, setgouver] = useState("")
      const [ deleg, setdeleg] = useState("")
    
      
    
     
    
      async function reserver(e) {
        e.preventDefault()   
        try {
          await axios.post("http://localhost:4000/DriverReservation",{
            name,FamilyName,cin,gouver,deleg
          }).then((response)=>{alert(response.data.message)})
        } catch (error) {
          console.error(error)
        }
      
      }
    
      
    
      return (
        <div className="Reservation_Form" >
            <h1>Réserver...</h1>
            <form onSubmit={reserver}>
              <div className="field">
                <input type="text" value={props.nom} readOnly    size="25" required />
                 <span></span>
                 <label>Nom</label>
              </div>
              <div className="field">
                <input type="text" value={props.prenom} readOnly   size="25"  required />
                 <span></span>
                 <label>Prénom</label>
              </div>
              <div className="field">
                <input type="tel" value={props.carteIdentite} readOnly  size="25" minLength="8" maxLength="8" required />
                 <span></span>
                 <label>CIN</label>
              </div>
              
              
              <div className="selectList">
                   <select className="Liste-Deroulante" value={gouver} onChange={(e)=>{setgouver(e.target.value)}}>
                      <option value="" selected disabled>Veuillez choisir un Gouvernorat</option>
                      <option value="Siliana">Siliana</option>
                      <option value="Medenine">Medenine</option>
                      <option value="Bizerte">Bizerte</option>
                  </select>
              </div>
              <div className="selectList">
                  <select className="Liste-Deroulante" value={deleg} onChange={(e)=>{setdeleg(e.target.value)}}>
                    <option value="" selected disabled>Veuillez choisir une Delegation</option>
                    <option value="Bargou">Bargou</option>
                    <option value="rouhiya">Rouhiya</option>
                    <option value="ras jbal">  Ras Jbal </option>
                    <option value="menzel jemil">Menzel Jemil</option>
                    <option value="zarzis">  Zarzis </option>
                    <option value="Djerba">  Djerba </option>
                  </select>
              </div> 
              <input type="submit" value="Réserver"/>
            </form>
            
        </div>
      );
      
    }
export default ReservationChauffForm;