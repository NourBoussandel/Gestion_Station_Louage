import React,{ useState } from "react";
import ReactDOM from "react-dom/client";
import { FaUserAlt} from "react-icons/fa";
import{FaLock} from "react-icons/fa";
import './loginForm.css';
import ReservationChauffForm from './DriverReservationForm';
import ChoiseAdminButtons from "./ChoiseAdmin";
import axios from "axios";


/* on peut se connecter soit en tant qu'admin soit que chauffeur*/
  function LoginForm() {
    const [ email, setemail ] = useState("")
    const [ password, setpassword ] = useState("")
    var nomm,prenomm,CarteIN
    
    async function login(e) {
      
      e.preventDefault()
      try {

        await axios.post("http://localhost:4000/login", {
          email,password
        }).then((response)=>{
          nomm  = response.data.message.nom
          prenomm  = response.data.message.prenom
          CarteIN=response.data.message.cin
          console.log(CarteIN)
          render(response.data.message.message)
        
          
        })
      } catch (error) {
        console.error(error)
      }
     
    }
  function render(ch){
    if(ch==='admin'){
      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(
      <React.StrictMode>
        <ChoiseAdminButtons />
      </React.StrictMode>);
    } else if (ch==='chauffeur'){
      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(
      <React.StrictMode>
        <ReservationChauffForm nom={nomm} prenom={prenomm} carteIdentite={CarteIN}/>
      </React.StrictMode>);
    } else {alert('Aucun Utilisateur trouvé avec cet nom utilisateur et cet mot de passe! veuillez réessayer !')}
  }
    return (
      <div className="Login_Form">
          <h1>Se Connecter...</h1>
          <form  onSubmit={login}>
              <div className="email_field">
                <input type="email" value={email} onChange={(e)=>{setemail(e.target.value)}} placeholder= 'Prenom@Nom' size="60"  required />
                 <span></span>
                 <label><FaUserAlt class='icone2' />  Nom d'utilisateur</label>
              </div>
              <div className="password_field">
                <input type="password" value={password} onChange={(e)=>{setpassword(e.target.value)}}  placeholder="*************"  size="25"  required />
                 <span></span>
                 <label><FaLock class ='icone'   />Mot de passe</label>
              </div>
            <input type="submit" value="Envoyer"/>
          </form>
      </div>
    );
    
  }
export default LoginForm;