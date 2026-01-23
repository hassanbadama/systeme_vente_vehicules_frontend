import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";

import {afficheCommand, afficheCommandes,getModels, addModel, deleteModel } from "../service/modelService";


const AdminCommande = () => {
  const [commandeuniques, setCommandeuniques] = useState([]);
  const [show, setShow] = useState(false);
  const [command, setCommand] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:8080/api/catalogue/liste") // ton API Spring Boot
//      .then(res => setCommand(res.data))
//      .catch(err => console.error(err));
//  }, []);

  useEffect(() => {
    commandes();
  }, []);

  const commandes = async () => {
    const res = await afficheCommandes();
    console.log("valeur recurer hassane")
    console.log(res.data)
    setCommand(res.data);
  };


  // useEffect(() => {
  //   commandunique();
  // }, []);

  // const commandunique = async () => {
  //   const res = await afficheCommand();
  //   console.log("--valeur recurer hassane commandunique---")
  //   console.log(res.data)
  //   setCommandeunique(res.data);
  // };

  useEffect(() => {
    axios.get("http://localhost:8080/api/commandes") // ton API Spring Boot
     .then(res =>{
       console.log("les commmmm commandunique");
       console.log(res.data);
       setCommandeuniques(res.data);
     } )
     .catch(err => console.error(err));
 }, []);

 


  // useEffect(() => {
  //   loadModel();
  // }, []);

  // const loadModel = async () => {
  //   const res = await afficheCommande();
  //   console.log("----valeur recurer commande----")
  //   console.log(res.data)
  //   setModels(res.data);
  // };



 


  return (
    <div className="container py-5">

      {/* STATISTIQUES */}
      <div className="row text-center mb-4">
        <div className="col-md-4">
          <div className="bg-primary p-3 rounded text-white">
            {/* <h2>{today.getDate()}</h2> */}
            <p>Jour</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="bg-dark p-3 rounded text-white">
            {/* <h2>{today.getMonth() + 1}</h2> */}
            <p>Mois</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="bg-primary p-3 rounded text-white">
            {/* <h2>{models.length}</h2> */}
            <p>Nombre de voiture</p>
          </div>
        </div>
      </div>

      {/* TITRE + BOUTON */}
      <div className="d-flex justify-content-between mb-3">
        <h4>Liste des clients commandes</h4>
        {/* <Button onClick={() => setShow(true)}>
          <i className="fas fa-plus"></i> Ajouter
        </Button> */}

              {/* ========== ADD BUTTON ========== */}




      </div>

      {/* TABLE */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Noms</th>
            <th>Prenoms</th>
            <th>Email</th>
            <th>Numero</th>
            <th>Dates Commande</th>
            <th>Etat</th>
            <th>Total</th>
            <th>Voir</th>

          </tr>
        </thead>
        <tbody>
          {Array.isArray(commandeuniques) &&
            commandeuniques.map((p) => (
              <tr key={p.id}>
                <td>{p.client?.nom}</td>
                <td>{p.client?.prenom}</td>
                <td>{p.client?.email}</td>
                <td>{p.client?.tel}</td>
                <td>{p.dateCommande}</td>
                <td>{p.etat}</td>
                <td>{p.total} FCFA</td>
                <td><button
                  className="btn btn-primary mb-3"
                  data-bs-toggle="modal"
                  data-bs-target={`#addModal${p.id}`}
                
                >
                  + Detail
                </button></td>
              </tr>
          ))}
        </tbody>

      </table>

      {/* MODAL AJOUT */}

            {/* ========== MODAL DETAILLE ========== */}
 {Array.isArray(commandeuniques) && commandeuniques.map((p) => (
    <div className="modal fade" id={`addModal${p.id}`}>
       <div className="modal-dialog">
          <div className="modal-content"style={{minWidth: "750px"}}>
             <div className="modal-header">
                <h5>Detaille sur une commande</h5>
                <button className="btn-close" data-bs-dismiss="modal"></button>
              </div>
                  <table className="table table-striped">
                    <thead>
                        <tr>
                          <th>Image</th>
                          <th>Quantites</th>
                          <th>Prix</th>
                          <th>Marque</th>
                          <th>Model</th>
                          <th>Type</th>
                          
                        </tr>
                      </thead>
                        <tbody>
                            {p.lignes.map((k) => (
                                <tr key={k.id}>

                                  <td>
                                  <img
                                    src={`http://localhost:8080/api/vehicules/image/${k.idVehi}`}
                                    alt=""
                                    width="60"
                                  />
                                </td>
                                  
                                  <td>{k.quantite}</td>
                                  <td>{k.prix} FCFA</td>
                                  <td>{k.model}</td>
                                  <td>{k.marque}</td>
                                  <td>{k.type}</td>
                              
                              </tr>

                              ))}
                        </tbody>
                    </table>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AdminCommande;
