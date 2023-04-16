const express = require("express")
const mysql=require('mysql')
const app = express()
const port = 4000
const cors = require("cors")
const twilio = require('twilio'); 
const bodyParser=require('body-parser');

//twilio requirements -- Texting API 
const accountSid = 'ACc77afe1571af16ea2f24e938d2831a64';
const authToken = 'd4bfc18e1e8c5c512811d8e5baecf089'; 
const client = new twilio(accountSid, authToken);


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "stationLouage"
  });

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.get("/", cors(), async (req, res) => {
	res.send("This is working")
})
app.get("/home", cors(), async (req, res) => {
	res.send("This is the data for the home page")
})

//se connecter a la table users

app.post("/login", async (req, res) => {
	let { email } = req.body
  let {password}= req.body
  con.query("SELECT user_role,nom,prenom,cin  FROM users where login = ? AND motdepasse = ?", [email,password],(err, result) => {
    if (err) {
      res.send({err:err})
    } 

    if (result.length>0){
          res.send({message:{
            message:result[0].user_role,
            nom:result[0].nom,
            prenom:result[0].prenom,
            cin:result[0].cin
            
          }})

          
    } else {
        res.send({message:{message:'user not found !'}})
      }
  });
})

app.get('/send-text', (req, res) => {
  //Welcome Message
  res.send('Hello to the Twilio Server')

  //_GET Variables
  const { recipient, textmessage } = req.query;

  //Send Text
  client.messages.create({
      body:textmessage,
      to: '+216'+recipient,  // Text this number
      from: '+12566733826' // From a valid Twilio number
  })
  var sqlInsert = "INSERT INTO users (login,motdepasse,user_role) VALUES (?,?,'passager')";
  var sqlSelect="SELECT id_user FROM users where login=? AND user_role='passager'"
  var sqlUpdate="UPDATE users SET motdepasse = ? WHERE login = ? AND user_role='passager'"
  con.query(sqlSelect,[recipient],(err,result)=>{
    if (err) throw err;
    if(result.length>0){
        con.query(sqlUpdate,[textmessage,recipient],(err,result)=>{
          if(err) throw err;
        })
    }else{
      con.query(sqlInsert,[recipient,textmessage], function (err, result) {
        if (err) throw err;
      });
    }
  })
 
}) 

//transfert des données du formulaire réservation chauffeur vers la table users

app.post("/DriverReservation", async (req, res) => {
	let { name } = req.body;
  let { FamilyName } = req.body;
  let { cin } = req.body;
  let { gouver } = req.body;
  let { deleg } = req.body;
  var sqlSelect1="SELECT id_user FROM users where nom=? AND prenom=? AND cin=? AND user_role='chauffeur'"  
  var sqlSelect2="SELECT id_delegation FROM delegation where delegation_name=? AND gouvernorat_name=? "
  var sqlInsert="INSERT INTO reservation (id_user,id_delegation,nbreDePlace,complet) VALUES (?,?,0,0)"
  
  con.query(sqlSelect1,[name,FamilyName,cin],(err,result)=>{
    
      id_user=result[0].id_user;
      con.query(sqlSelect2,[deleg,gouver],(err,result)=>{
      if (result.length > 0){
      id_dele=result[0].id_delegation;
      con.query(sqlInsert,[id_user,id_dele], function (err, result) {
        if (err) throw err;
        res.send({message:'Votre réservation a été effectué avec succès !'})
      });
      } else {
        res.send({message:"Veuillez vérifier votre destination s'il vous plaît !"})
      }
      })
    
  })
})

//ajout du chauffeur par l'admin dans la table users

  app.post("/AddDriver", async (req, res) => {
    let { name } = req.body;
    let { FamilyName } = req.body;
    let { cin } = req.body;
    var sqlInsert="INSERT INTO users (nom,prenom,login,motdepasse,cin,user_role) VALUES (?,?,?,?,?,'chauffeur')"
    var sqlSelect="SELECT nom FROM users where cin=? AND user_role='chauffeur'"
    con.query(sqlSelect,[cin],(err,result)=>{
      if (err) throw err;
      if (result.length>0){
        res.send({message:'Il existe déja un chauffeur avec ces coordonnées !'})
      } else{
        con.query(sqlInsert,[name,FamilyName,FamilyName+'@'+name,cin,cin],(err,result)=>{
          if (err) throw err;
          res.send({message:'Un chauffeur est ajouté avec succès !'})
        })
      }
    })
    
	
}) 

// transfert des données du formulaire réservation passager vers la table users

app.post("/UserReservation", async (req, res) => {
	let { gouver } = req.body;
  let { deleg } = req.body;
  var sqlSelectIdDelegation="SELECT id_delegation FROM delegation where delegation_name=? AND gouvernorat_name=? "
  
  var sqlUpdate="UPDATE reservation SET nbreDePlace = ?   WHERE id_delegation = ? AND id_reservation=? "
  var sqlDELETE= "DELETE FROM reservation where id_reservation=?"

  var sqlSelect="select id_user , nbreDePlace ,complet, min(id_reservation),id_reservation from reservation where (id_delegation=? AND complet=0)"
  
  con.query(sqlSelectIdDelegation,[deleg,gouver],(err,result)=>{
    if(err) throw err;
    if (result.length>0){
      id_dele=result[0].id_delegation;
      con.query(sqlSelect,[id_dele],(err,result)=>{
        if(err) throw err;
        if (result[0].id_reservation == null)
        {
          res.send({message:'Aucune louage disponible pour cette destination!'})
          
        }  else{
          
          id_chauff= result[0].id_user
          nbreDePlace=result[0].nbreDePlace
          id_reser=result[0].id_reservation
          
          if(nbreDePlace==7){ 
            var statu =1;
            con.query(sqlDELETE,[id_reser],(err,result)=>{
              if (err) throw err;
              con.query("SELECT nom , prenom FROM users where id_user =? ",[id_chauff],(err,result)=>{
                if(err) throw err;
                if (result.length>0){
                  res.send({message:'Vous avez reservé avec le chauffeur : '+ result[0].nom +' '+ result[0].prenom})
                }
              })

            }) 
            
          } else{
            
            
              con.query(sqlUpdate,[nbreDePlace+1,id_dele,id_reser],(err,result)=>{
            
                con.query("SELECT nom , prenom FROM users where id_user =? ",[id_chauff],(err,result)=>{
                  if(err) throw err;
                  if (result.length>0){
                    res.send({message:'Vous avez reservé avec le chauffeur : '+ result[0].nom +' '+ result[0].prenom})
                  }
                })
              })
          }
        }
  
      })
    } else {
      res.send({message:"Veuillez vérifier votre destination s'il vous plaît !"})
    } 
})
})

//suppression du chauffeur par l'admin de la table users

app.post("/RemouveDriver", async (req, res) => {
	let { cin} = req.body;
  var sqldelete="DELETE FROM users WHERE cin=?"
  var sqlselect="SELECT nom , prenom FROM users where cin=?"
  con.query(sqlselect,[cin],(err,result)=>{
    if (err) throw err;
    if (result.length>0){
      nom=result[0].nom
      prenom=result[0].prenom
      con.query(sqldelete,[cin],(err,result)=>{
        if (err) throw err;
        res.send({message : 'Le chauffeur '+nom+' '+prenom+' a été supprimé !'})
      })
    }else{
      res.send({message:"Il n'existe pas un chauffeur ayant ce numéro de cin : " + cin})
    }
  })
})

//récupération des données des chauffeurs de la table users
app.get("/get",(req,res)=>{
  const sqlSelectt="SELECT * FROM users where user_role='chauffeur'";
   con.query(sqlSelectt,(err,result)=>{
    res.send(result)
   });
});



app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`)
});
