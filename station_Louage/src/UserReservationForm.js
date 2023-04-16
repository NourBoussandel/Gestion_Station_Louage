import axios from "axios"
import React, { useState } from "react"
import './ReservationForm.css'
 
/*réservation du passager*/

function UserReservationForm(props) {
	const [ gouver, setgouver] = useState("")
  const [ deleg, setdeleg ] = useState("")
	async function UserReservation(e) {
		e.preventDefault()
		try {
			await axios.post("http://localhost:4000/UserReservation", {
				gouver , deleg 
			}).then((response)=>{
        alert(response.data.message)
      })
		} catch (error) {
			console.error(error)
		}
    
	}

	return (
    <div className="Reservation_Form" >
        <h1>Réserver...</h1>
        <form onSubmit={UserReservation}>
            <div>
                <div className="selectList">
                    <select className="Liste-Deroulante" value={gouver} onChange={(e)=>{setgouver(e.target.value)}}>
                        <option value="" selected disabled>Gouvernorat.</option>
                        <option value="Siliana">Siliana</option>
                        <option value="Medenine">Medenine</option>
                        <option value="Bizerte">Bizerte</option>
                    </select>
                </div>

                <div className="selectList">
                    <select className="Liste-Deroulante" value={deleg} onChange={(e)=>{setdeleg(e.target.value)}}>
                        <option value="" selected disabled>Delegation.</option>
                        <option value="Bargou">Bargou</option>
                    <option value="rouhiya">rouhiya</option>
                    <option value="ras jbal">  ras jbal </option>
                    <option value="menzel jemil">menzel jemil</option>
                    <option value="zarzis">  zarzis </option>
                    <option value="Djerba">  Djerba </option>
                    </select>
                </div>
            </div>
          <input type="submit" value="Réserver"/>
        </form>
    </div>
  );
  
}


export default UserReservationForm;