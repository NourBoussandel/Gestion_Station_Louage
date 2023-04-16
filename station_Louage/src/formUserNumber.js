import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import NumberConfirmationForm from "./formUserNumberConfimation";
import './formUserNumberConfirmation.css';

/*pour réserver le passager utilise son numéro de téléphone*/

class NumberForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        /*phone: '',
        '};*/
        text: {
          recipient: '',
          textmessage: entierAleatoire()
        }
      }
      
    }
  
    
    sendText = _ => {
      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(
      <React.StrictMode>
        <NumberConfirmationForm numero={this.state.text.recipient} code={this.state.text.textmessage}/>
      </React.StrictMode>
      );
      const { text } = this.state;
      //pass text message GET variables via query string
      fetch(`http://127.0.0.1:4000/send-text?recipient=${text.recipient}&textmessage=${text.textmessage}`)
      .catch(err => console.error(err))
    }

    render() {
      return (
        <div className="Form" >
            <h1>S'identifier...</h1>
            <form  onSubmit={this.sendText}>
               <div className="field">
                  <input type="tel" value={this.state.text.recipient} onChange={e => this.setState({ text: { ...this.state.text, recipient: e.target.value } })}  placeholder='exemple: 95753853' pattern="[0-9]{1}[0-9]{1}[0-9]{1}[0-9]{1}[0-9]{1}[0-9]{1}[0-9]{1}[0-9]{1}" size="25" minLength="8" maxLength="8" required />
                   <span></span>
                   <label>Numéro de Téléphone</label>
                </div>
              <button type="submit">Envoyer</button>
              
            </form>
        </div>
      );
    }
  }

  function entierAleatoire(){

    return Math.floor(Math.random() * 9000) + 1000;
   }


   export default NumberForm;





/*function NumberForm() {
	const [ phone, setphone ] = useState("")
	const [ code_envoyé, setcode_envoyer ] = useState(entierAleatoire())
  function entierAleatoire()
  {
   return Math.floor(Math.random() * 9000) + 1000;
  }
 
  
	async function postphone(e) {
		/*e.preventDefault()
    const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(
      <React.StrictMode>
        <NumberConfirmationForm number={phone}/>
      </React.StrictMode>
      );
      
		try {
			await axios.post("http://localhost:4000/post_phone", {
				phone
			})
		} catch (error) {
			console.error(error)
		}
    phone ,code_envoyé;
    //pass text message GET variables via query string
    fetch(`http://127.0.0.1:3004/send-text?recipient=${phone}&textmessage=${code_envoyé}`)
    .catch(err => console.error(err))
  }
    
	

	return (
    <div className="Form" >
        
        <h1>S'identifier...</h1>
        <form  /*onSubmit={postphone}>
           <div className="field">
              <input type="tel" value={phone} onChange={(e) =>setphone(e.target.value)} placeholder='21695753853' pattern="[2]{1}[1]{1}[6]{1}[0-9]{1}[0-9]{1}[0-9]{1}[0-9]{1}[0-9]{1}[0-9]{1}[0-9]{1}[0-9]{1}" size="25" minLength="11" maxLength="11" required />
               <span></span>
               <label>Numéro de Téléphone</label>
            </div>
          <button type="submit">envoyer</button>
          
        </form>
    </div>
  );
}*/

