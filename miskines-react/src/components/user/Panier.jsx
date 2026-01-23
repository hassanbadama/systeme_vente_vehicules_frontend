// import React from "react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Swal from "sweetalert2";

import { getModels, addModel, deleteModel } from " ../service/modelService";

function Panier() {

      const [form, setForm] = useState({
          nom: "",
          prenom:"",
          email: "",
          pays: "",
          paiement:"",
          tel:"",
          
        });
    
    
      
        const handleChange = (e) => {
          const { name, value } = e.target;
          setForm((prev) => ({ ...prev, [name]: value }));
        }; 
        
        const handleSubmit = async (e) => {
          e.preventDefault();
        
          const data = new FormData();
          Object.keys(form).forEach((key) => {
            data.append(key, form[key]);
          });
        
          try {
            await addModel(data);
            setShow(false);
            loadModels();
            Swal.fire("Succès", "Commande validée", "success");
          } catch (error) {
            Swal.fire("Erreur", "Échec de l'envoi", "error");
          }
        };


    const [panier, setPanier] = useState([]);
    const [showPanier, setShowPanier] = useState(false);
    
    const ajouterAuPanier = (vehicule) => {
      setPanier((prevPanier) => {
        const exist = prevPanier.find(v => v.id === vehicule.id);
    
        if (exist) {
          return prevPanier.map(v =>
            v.id === vehicule.id
              ? { ...v, quantite: v.quantite + 1 }
              : v
          );
        }
    
        return [...prevPanier, { ...vehicule, quantite: 1 }];
      });
    
      setShowPanier(true);
    };


    const validerCommande = async () => {
      const commande = {
        donnees: {
          nom: form.nom,
          prenom: form.prenom,
          email: form.email,
          tel: form.tel,
          pays: form.pays,
          paiement: form.paiement,
        },
        date: new Date().toISOString().split("T")[0],
        total: panier.reduce((s, v) => s + v.prix * v.quantite, 0),
        lignes: panier.map(v => ({
          vehiculeId: v.id,
          quantite: v.quantite,
          prix: v.prix,
        })),
      };
    
      try {
        await axios.post(
          "http://localhost:8080/api/commandes",
          commande,
          { headers: { "Content-Type": "application/json" } }
        );
    
        console.log("Commande enregistrée :", commande);
        alert("Commande enregistrée avec succès !");
        setPanier([]);
        setShowPanier(false);
    
      } catch (error) {
        console.error("Erreur :", error);
        alert("Erreur lors de l'enregistrement");
      }
    };



  return (
    <div>


       {showPanier && (
            <div className="modal show d-block">
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5>🛒 Votre panier</h5>
                    <button className="btn-close" onClick={() => setShowPanier(false)}></button>
                  </div>

                  <div className="modal-body">
                    {panier.length === 0 ? (
                      <p>Votre panier est vide</p>
                    ) : (
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Model</th>
                            <th>Marque</th>
                            <th>Prix</th>
                            <th>Quantité</th>
                            <th>Images</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {panier.map(v => (
                            <tr key={v.id}>
                              <td>{v.model}</td>
                              <td>{v.marque}</td>
                              <td>{v.prix} FCFA</td>
                              <td>{v.quantite}</td>
                              <img src={`http://localhost:8080/api/vehicules/image/${v.id}`} alt={v.model} style={{ width: "100%" }} />
                              <td>{v.prix * v.quantite} FCFA</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>

                  <div className="modal-footer">
                    <p>
                      <strong>
                        Total :
                        {panier.reduce((s, v) => s + v.prix * v.quantite, 0)} FCFA
                      </strong>
                    </p>
                  </div>



                  <form onSubmit={handleSubmit}>
                    <input
                      className="form-control mb-2"
                      name="nom"
                      placeholder="Nom"
                      value={form.nom}
                      onChange={handleChange}
                      required
                    />

                    <input
                      className="form-control mb-2"
                      name="prenom"
                      placeholder="Prénom"
                      value={form.prenom}
                      onChange={handleChange}
                      required
                    />

                    <input
                      className="form-control mb-2"
                      name="email"
                      placeholder="Email"
                      value={form.email}
                      onChange={handleChange}
                    />

                    <select
                      className="form-control mb-2"
                      name="paiement"
                      value={form.paiement}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Sélectionner mode paiement</option>
                      <option value="COMPTANT">COMPTANT</option>
                      <option value="CREDIT">CREDIT</option>
                    </select>

                    <select
                      className="form-control mb-2"
                      name="pays"
                      value={form.pays}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Sélectionner pays</option>
                      <option value="National">National</option>
                      <option value="International">International</option>
                    </select>

                    <input
                      className="form-control mb-2"
                      name="tel"
                      placeholder="Téléphone"
                      type="tel"
                      value={form.tel}
                      onChange={handleChange}
                      required
                    />
{/* 
                    <button
                      type="button"
                      className="btn btn-secondary me-2"
                      onClick={() => setShowPanier(false)}
                    >
                      Fermer
                    </button>

                    <button type="submit" className="btn btn-success">
                      Valider la commande
                    </button> */}
                     <button type="submit" className="btn btn-success" onClick={validerCommande}> Valider la commande </button>
                  </form>

                </div>
              </div>
            </div>
          )}




    </div>

  );
}
export default Panier;