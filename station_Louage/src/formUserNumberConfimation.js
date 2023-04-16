
import React, { useState } from "react"
import ReactDOM from "react-dom/client";
import './formUserNumberConfirmation.css';
import UserReservationForm from "./UserReservationForm";



function NumberConfirmationForm(props) {
	const [ code, setcode ] = useState("")
  
	async function postcode(e) {
		e.preventDefault()
    
    if (code==props.code){
      const root = ReactDOM.createRoot(document.getElementById('root'));
          root.render(
         <React.StrictMode>
            <UserReservationForm login={props.numero} password={props.code} />
         </React.StrictMode>
          ); 
    }else {
      alert('code invalide')
    }
  
	}

	return (
    <div className="Form" >
        <h1>Un code est envoyé sur votre numéro de téléphone </h1>
        <form onSubmit={postcode}>
           <div className="field">
              <input type="tel" value={code} onChange={(e)=>{setcode(e.target.value)}} placeholder='exemple: 2458' pattern="[0-9]{4}" size="25" minLength="4" maxLength="4" required />
               <span></span>
               <label>Code De Confirmation</label>
            </div>
          <input type="submit" value="Confirmer"/>
        </form>
    </div>
  );
  
}


  

export default NumberConfirmationForm;