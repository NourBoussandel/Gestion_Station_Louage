import React, { useEffect, useState } from "react";
import axios from "axios";
import './loginForm';


    
    function AddDriverForm() {
      const [ name, setname ] = useState("")
      const [ FamilyName, setfamilyname ] = useState("")
      const [ cin, setcin ] = useState()
     

      async function AddDriver(e) {
        e.preventDefault()   
        try {
          await axios.post("http://localhost:4000/AddDriver", {
            name,FamilyName,cin
          }).then((response=>{alert(response.data.message)}))
        } catch (error) {
          console.error(error)
        }
        
      
      }

      
      return (
        <div className="Reservation_Form" >
            <h1>Ajouter un Chauffeur...</h1>
            <form onSubmit={AddDriver} >
              <div className="field">
                <input type="text" value={name} onChange={(e)=>{setname(e.target.value)}} placeholder="Nom"  size="25" required />
                 <span></span>
                 <label>Nom</label>
              </div>
              <div className="field">
                <input type="text" value={FamilyName} onChange={(e)=>{setfamilyname(e.target.value)}} placeholder="Prénom"  size="25"  required />
                 <span></span>
                 <label>Prénom</label>
              </div>
              <div className="field">
                <input type="tel" value={cin} onChange={(e)=>{setcin(e.target.value)}} placeholder="01259856" pattern="[0-1]{1}[0-9]{7}" size="25" minLength="8" maxLength="8" required />
                 <span></span>
                 <label>CIN</label>
              </div>
              <input type="submit" value="Ajouter"/>

              
        </form>
       
             
        </div>
      );
      
    }
export default AddDriverForm;