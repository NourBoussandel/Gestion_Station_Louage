    import React, { useState } from "react";
    import axios from "axios";
    import './loginForm';

    
    function RemouveDriverForm() {
      const [ cin, setcin ] = useState("")
      async function supprimer(e) {
        e.preventDefault()   
        try {
          await axios.post("http://localhost:4000/RemouveDriver",{
          cin
          }).then((response)=>{alert(response.data.message)})
        } catch (error) {
          console.error(error)
        }
      
      }
    
      
      
    
      return (
        <div className="Reservation_Form" >
            <h1>Supprimer un Chauffeur...</h1>
            <form  onSubmit={supprimer}>
              <div className="field">
                <input type="text" value={cin} onChange={(e)=>{setcin(e.target.value)}} placeholder="01234567" pattern="[0-1]{1}[0-9]{7}" minLength='8' maxLength='8' size="25" required />
                 <span></span>
                 <label>CIN</label>
              </div>
              <input type="submit" value="Supprimer"/>
            </form>
        </div>
      );
      
    }
export default RemouveDriverForm;