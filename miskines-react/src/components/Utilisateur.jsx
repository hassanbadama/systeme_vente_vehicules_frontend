
import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Button, Modal } from "react-bootstrap";


import Swal from "sweetalert2";

import { getModels, addModel, deleteModel } from "./service/modelService";
// ton CSS personnalisé


function App() {
  const [modelCoiffure, setModelCoiffure] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [nomUserconnecter, setNomUserconnecter] = useState(""); // gérer la session si besoin

  const [commandes, setcommandes] = useState([]);
  const [panier, setPanier] = useState([]);
  const [showPanier, setShowPanier] = useState(false);
  const [showBon, setShowBon] = useState(false);
  const [showCertificat, setShowCertificat] = useState(false);
  const [showImmatriculation, setShowImmatriculation] = useState(false);
  const [searchType, setSearchType] = useState("");


  


  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // const [id, setId] = useState("");
  const [nom, setNom] = useState("");
  const [password, setPassword] = useState("");


  // ================= LOAD USERS =================
  // useEffect(() => {
  //   axios.get("http://localhost:8080/api/client/connecter")
  //     .then(res => {
  //       console.log("Connecter :");
  //       console.log(res.data);
  //       setUsers(res.data)
  //     })
  //     .catch(err => console.error(err));
  // }, []);

  // ================= RESET FORM =================
  const resetForm = () => {
    setNom("");
    setPassword("");
    setSelectedUser(null);
  };

  // ================= ADD =================
  const handleAdd = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8080/api/client/connecter", {
      nom, password
    }).then(res => {
      setUsers([...users, res.data]);
      
      console.log("retourner biens sans erreur")
      console.log(res.data)
          
      // setShow(false);
      // Swal.fire("User", " connecter avec succés ", "");
      //resetForm();
    })
    .catch(err => {
      console.log("retourner erreur")
      // console.log(res.data)
      console.error(err)
    });
  };






  const [form, setForm] = useState({
      nom: "",
      prenom:"",
      email: "",
      pays: "",
      paiement:"",
      tel:"",
      password:"",
      
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
        Swal.fire("commande en cours de validation", "Vous allez generer les differents documents", "success");
      } catch (error) {
       // Swal.fire("Erreur", "Échec de l'envoi", "error");
       Swal.fire("commande en cours de validation", "Vous allez generer les differents documents", "success");
      }
    };
    
  
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setForm({ ...form, [name]: value });
  // };

  // const [donne, setDonne] = useState([]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const data = new FormData();
  //   data.append("nom", form.nom);
  //   data.append("prenom", form.prenom);
  //   data.append("email", form.email);
  //   data.append("paiement", form.paiement);
  //   data.append("pays", form.pays);
  //   data.append("tel", form.tel);
  //   // data.append("file", form.file);
  //   setDonne(data);

  //   await addModel(data);
  //   setShow(false);
  //   loadModels();

  //   Swal.fire("Succès", "Modèle ajouté", "success");
  // };






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
  setShowPanier(false);

 // setShowPanier(true);
};





const validerCommande = async () => {
  const commandeDTO = {
    dateCommande: new Date().toISOString().split("T")[0],
    etat: "EN_ATTENTE",
    total: panier.reduce((s, v) => s + v.prix * v.quantite, 0),

    client: {
      nom: form.nom,
      prenom: form.prenom,
      email: form.email,
      tel: form.tel,
      pays: form.pays,
      paiement: form.paiement,
    },

    lignes: panier.map(v => ({
      vehiculeId: v.id,
      quantite: v.quantite,
      prix: v.prix,
    })),
  };
  setcommandes(commandeDTO)

  try {
    await axios.post(
      "http://localhost:8080/api/commandes",
      commandeDTO,
      { headers: { "Content-Type": "application/json" } }
    );

    console.log("Commande envoyée :", commandeDTO);
    //setPanier([]);
    setShowPanier(false);
    setShowBon(true);

  } catch (error) {
    console.error("Erreur backend :", error.response?.data);
  }
};

  useEffect(() => {
     axios.get("http://localhost:8080/api/catalogue/liste") // ton API Spring Boot
      .then(res =>{
        console.log("les vehicules");
        console.log(res.data);
        setModelCoiffure(res.data);
        
      } )
      .catch(err => console.error(err));
  }, []);

  const handleOpenModal = (model) => setSelectedModel(model);
  const handleCloseModal = () => setSelectedModel(null);

  return (
    <div>
      {/* Navigation */}
      <nav>
        <div className="nav-container">
          <a href="#home" className="logo">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" stroke="#e74c3c" strokeWidth="2" fill="none"/>
              <circle cx="20" cy="20" r="14" stroke="#e74c3c" strokeWidth="1" fill="none" opacity="0.5"/>
              <path d="M10 12 L10 20 M8 12 L8 15 M12 12 L12 15 M8 12 L12 12" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M30 12 L30 20 M28 12 Q28 14 30 14" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <ellipse cx="20" cy="26" rx="6" ry="3" fill="#e74c3c" opacity="0.2"/>
              <path d="M14 26 C14 24 16 22 20 22 C24 22 26 24 26 26" stroke="#e74c3c" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
              <circle cx="17" cy="24" r="1" fill="#e74c3c" opacity="0.6"/>
              <circle cx="20" cy="23" r="1" fill="#e74c3c" opacity="0.6"/>
              <circle cx="23" cy="24" r="1" fill="#e74c3c" opacity="0.6"/>
            </svg>
            <span>Miskine</span>
            
          </a>
          {/* <input className="form-control" name="email" placeholder="Recherche type........." style={{width: "400px",height: "45px;"}} /> */}

          <input
            className="form-control mb-3"
            placeholder="Recherche par type .................."
            style={{ width: "400px", height: "45px" }}
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          />


          

          
          <ul className="nav-links">
         
            <li><a href="#home" className="active">Home</a></li>
            {/* <li><a href="#menu">Services</a></li> */}
            <li data-bs-toggle="modal"data-bs-target="#addModal" ><a>Connecter</a></li>
            <li><a href="#contact">Contact</a></li>

            <li>
             <button className="btn btn-warning" onClick={() => setShowPanier(true)}>
              🛒 Panier ({panier.length})
              </button>

               {/* <button className="btn btn-warning" onClick={() => setShowBon(true)}>
              🛒 Panier ({panier.length})
               </button> */}
            </li>

          </ul>
          <div className="menu-toggle">
            
            <span></span><span></span><span></span>
          </div>
        </div>
      </nav>
<section
  id="home"
  className="d-flex align-items-center text-white"
  style={{
    backgroundImage: "url('/images/v6.jpeg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    position: "relative"
  }}
>
 
  <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-75"></div>

  <div className="container position-relative text-center">
    <h1 className="display-4 fw-bold">
      Bienvenue vente véhicules Miskine Kaltane
    </h1>

    <p className="lead mt-3">
      Experience culinary excellence in an atmosphere of refined sophistication
    </p>

    <a href="#menu" className="btn btn-warning btn-lg mt-4">
      Nos Vehicules disponible
    </a>
  </div>
</section>

<div
  id="heroCarousel"
  className="carousel slide carousel-fade position-absolute top-0 start-0 w-100 h-10"
  data-bs-ride="carousel"
>
  
  <div className="carousel-inner h-50">
    <div className="carousel-item active h-50">
      <img src="/images/v6.jpeg" className="w-100 h-50 object-fit-cover" />
    </div>
    <div className="carousel-item h-10">
      <img src="/images/v3.jpeg" className="w-10 h-10 object-fit-cover" />
    </div>
  </div>
</div>


    <section id="menu">
          <h2>Nos Vehicules disponible</h2>
          <div className="menu-grid">


          {modelCoiffure
            .filter(p =>
              p.type?.toLowerCase().includes(searchType.toLowerCase())
            )
            .map((p) => (
              <div className="menu-item" key={p.id}>
                <img
                  src={`http://localhost:8080/api/vehicules/image/${p.id}`}
                  alt={p.model}
                  className="menu-item-image"
                  style={{ width: "100%", height: "100%" }}
                />

                <div className="menu-item-content">
                  <h3>Model: {p.model}</h3>
                  <p>Marque: {p.marque}</p>
                  <p>Type: {p.type}</p>
                  <p>Type Carburant: {p.vehiculeType}</p>
                  <p>{p.description}</p>

                  <div className="price">Prix : {p.prix} FCFA</div>

                  <button
                    className="ingredients-btn"
                    onClick={() => handleOpenModal(p)}
                  >
                    VOIR
                  </button>
                </div>
              </div>
          ))}


          {/* {modelCoiffure.map((p) => (
              <div className="menu-item">
                  <img  src={`http://localhost:8080/api/vehicules/image/${p.id}`} alt={p.Model} className="menu-item-image" style={{ width: "100%", height: "100%" }} />
                  <div className="menu-item-content">
                    <h3>Model: {p.model}</h3>
                    <p>Marque: {p.marque}</p>
                    <p>Type: {p.type}</p>
                    <p>Type Carburant: {p.vehiculeType}</p>
                    {/* <p>Fammilless: {p.vehicule_type}</p> */}
                    {/* <p>{p.description}</p>
                    <div className="price">Prix : {p.prix} FCFA</div>
                      <button className="ingredients-btn" data-bs-toggle="modal" th:data-bs-target="'#supprimer'+${p.id}" onClick={() => handleOpenModal(p)}>VOIRE</button>
                  </div>
              </div> */}

            {/* ))} */} 
          </div>
      </section>


      {/* Modal detail */}
      {selectedModel && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5>{selectedModel.Model}</h5>
                <button className="btn-close" onClick={handleCloseModal}></button>
                {/* <button className="btn-close" data-bs-dismiss="modal" ></button> */}
              </div>
              <div className="modal-body">
                <img src={`http://localhost:8080/api/vehicules/image/${selectedModel.id}`} alt={selectedModel.Model} style={{ width: "100%" }} />
                <h3>Model: {selectedModel.model}</h3>
                <p>Marque: {selectedModel.marque}</p>
                <p>Type: {selectedModel.type}</p>
                <p>Type Carburant:{selectedModel.vehiculeType}</p>
                <p>{selectedModel.description}</p>
                <div className="price">Prix : {selectedModel.prix} FCFA</div>

                <button
                  className="btn btn-primary "
                  onClick={() => {
                    ajouterAuPanier(selectedModel)
                    handleCloseModal()

                  }}
                  
                >
                  Ajouter dans panier
                </button>

              </div>
            </div>
          </div>
        </div>
      )}

   {/* Modal Panier */}

          {showPanier && (
            <div className="modal show d-block">
              <div className="modal-dialog modal-lg">
                <div className="modal-content" style={{maxWidth: "650px"}}>
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

                     <button type="submit" className="btn btn-success" onClick={validerCommande}> Valider la commande </button>
                  </form>

                </div>
              </div>
            </div>
          )}


      {/* ========== MODAL ADD ========== */}
      <div className="modal fade" id="addModal">
        <div className="modal-dialog">
          <div className="modal-content">
           Connecter

          <form onSubmit={handleAdd}>
              <div className="modal-body">
                <input className="form-control mb-2" placeholder="Nom"
                  value={nom} onChange={e => setNom(e.target.value)} required />
                <input className="form-control mb-2" type="password"
                  placeholder="Mot de passe"
                  value={password} onChange={e => setPassword(e.target.value)} required />
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" data-bs-dismiss="modal">
                  Annuler
                </button>
                <button className="btn btn-primary" type="submit">
                  Connecter
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>


       {/* Modal DEMANDE D’IMMATRICULATION */}
       {showImmatriculation && (
            <div className="modal show d-block">
              <div className="modal-dialog modal-lg">
                <div className="modal-content" style={{maxWidth: "400px"}}>
                  {/* <div className="modal-header">
                    <h5>Documment de commande de vehicules</h5>
                    <button className="btn-close" onClick={() => setShowPanier(false)}></button>
                  </div> */}
                    <a href="#home" className="logo">
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="20" cy="20" r="18" stroke="#e74c3c" strokeWidth="2" fill="none"/>
                        <circle cx="20" cy="20" r="14" stroke="#e74c3c" strokeWidth="1" fill="none" opacity="0.5"/>
                        <path d="M10 12 L10 20 M8 12 L8 15 M12 12 L12 15 M8 12 L12 12" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M30 12 L30 20 M28 12 Q28 14 30 14" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                        <ellipse cx="20" cy="26" rx="6" ry="3" fill="#e74c3c" opacity="0.2"/>
                        <path d="M14 26 C14 24 16 22 20 22 C24 22 26 24 26 26" stroke="#e74c3c" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                        <circle cx="17" cy="24" r="1" fill="#e74c3c" opacity="0.6"/>
                        <circle cx="20" cy="23" r="1" fill="#e74c3c" opacity="0.6"/>
                        <circle cx="23" cy="24" r="1" fill="#e74c3c" opacity="0.6"/>
                      </svg>
                      <span>Miskine Kaltane</span>
                    </a>
                    <br />
                  <h5>DEMANDE D’IMMATRICULATION</h5>
                  <h6>Informations du client</h6>
                  
                  <p>Nom : {commandes.client.nom} {commandes.client.prenom}</p>
                  <p>Téléphone : {commandes.client.tel}</p>
                  <p>Email : {commandes.client.email}</p>

                  <h3>Informations du véhicule</h3>
                  {panier.map(v => (
                    <p key={v.id}>
                      <p>Marque : {v.marque}</p>
                      <p>Modèle : {v.model}</p>
                      <p>Type : {v.type}</p>
                    </p>
                  ))}

                  <p>Date de commande :{commandes.dateCommande}</p>

                  <br/>
                  <button className="btn btn-primary" type="submit" onClick={() => {
                    setShowImmatriculation(false)
                    setPanier([])
                  }}>
                  GENERER D’IMMATRICULATION
                </button>
                </div>
              </div>
            </div>
          )}





           {/* Modal DEMANDE CERTIFICAT DE CESSION */}
       {showCertificat && (
            <div className="modal show d-block">
              <div className="modal-dialog modal-lg">
                <div className="modal-content" style={{maxWidth: "400px"}}>
                  {/* <div className="modal-header">
                    <h5>Documment de commande de vehicules</h5>
                    <button className="btn-close" onClick={() => setShowPanier(false)}></button>
                  </div> */}
                    <a href="#home" className="logo">
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="20" cy="20" r="18" stroke="#e74c3c" strokeWidth="2" fill="none"/>
                        <circle cx="20" cy="20" r="14" stroke="#e74c3c" strokeWidth="1" fill="none" opacity="0.5"/>
                        <path d="M10 12 L10 20 M8 12 L8 15 M12 12 L12 15 M8 12 L12 12" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M30 12 L30 20 M28 12 Q28 14 30 14" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                        <ellipse cx="20" cy="26" rx="6" ry="3" fill="#e74c3c" opacity="0.2"/>
                        <path d="M14 26 C14 24 16 22 20 22 C24 22 26 24 26 26" stroke="#e74c3c" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                        <circle cx="17" cy="24" r="1" fill="#e74c3c" opacity="0.6"/>
                        <circle cx="20" cy="23" r="1" fill="#e74c3c" opacity="0.6"/>
                        <circle cx="23" cy="24" r="1" fill="#e74c3c" opacity="0.6"/>
                      </svg>
                      <span>Miskine Kaltane</span>
                    </a>
                    <br />
                    <h5>CERTIFICAT DE CESSION</h5>

                        <p><strong>Vendeur :</strong> Société Vente Auto</p>
                        <p><strong>Acheteur :</strong> {commandes.client.nom} {commandes.client.prenom}</p>

                        <h6>Véhicule</h6>
                        {panier.map(v => (
                          <ul key={v.id}>
                            <li>Marque : {v.marque}</li>
                            <li>Modèle : {v.model}</li>
                            <li>Prix : {v.prix}</li>
                          </ul>
                   
                         ))}
                      

                        <p>Date de cession : {commandes.dateCommande}</p>

                        {/* <p>Signature vendeur : __________</p>
                        <p>Signature acheteur : __________</p> */}

                  <br/>
                  <button className="btn btn-primary" type="submit"onClick={() => {
                    setShowImmatriculation(true)
                    setShowCertificat(false)
                  }}>
                       GENERER CERTIFICAT DE CESSION
                </button>
                </div>
              </div>
            </div>
          )}





           {/* Modal DEMANDE  BON DE COMMANDE */}
       {showBon && (
            <div className="modal show d-block">
              <div className="modal-dialog modal-lg">
                <div className="modal-content" style={{maxWidth: "500px"}}>
                  {/* <div className="modal-header">
                    <h5>Documment de commande de vehicules</h5>
                    <button className="btn-close" onClick={() => setShowPanier(false)}></button>
                  </div> */}
                    <a href="#home" className="logo">
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="20" cy="20" r="18" stroke="#e74c3c" strokeWidth="2" fill="none"/>
                        <circle cx="20" cy="20" r="14" stroke="#e74c3c" strokeWidth="1" fill="none" opacity="0.5"/>
                        <path d="M10 12 L10 20 M8 12 L8 15 M12 12 L12 15 M8 12 L12 12" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M30 12 L30 20 M28 12 Q28 14 30 14" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                        <ellipse cx="20" cy="26" rx="6" ry="3" fill="#e74c3c" opacity="0.2"/>
                        <path d="M14 26 C14 24 16 22 20 22 C24 22 26 24 26 26" stroke="#e74c3c" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                        <circle cx="17" cy="24" r="1" fill="#e74c3c" opacity="0.6"/>
                        <circle cx="20" cy="23" r="1" fill="#e74c3c" opacity="0.6"/>
                        <circle cx="23" cy="24" r="1" fill="#e74c3c" opacity="0.6"/>
                      </svg>
                      <span>Miskine Kaltane</span>
                    </a>
                    <br />
                    <h5>BON DE COMMANDE</h5>

                        <p>Client : {commandes.client.nom} {commandes.client.prenom}</p>
                        <p>Email : {commandes.client.email}</p>

                        <table border="1" width="100%">
                            <tr>
                                <th>Désignation</th>
                                <th>Quantité</th>
                                <th>Prix</th>
                                <th>Total</th>
                            </tr>
                            
                            {panier.map(v => (
                            <tr key={v.id}>
                              <td>{commandes.client.pays}</td>
                              <td>{v.quantite}</td>
                              <td>{v.prix} FCFA</td>
                              <td>{v.prix * v.quantite} FCFA</td>
                  
                            </tr>
                            ))}
                        </table>

                        <h3>Total : {commandes.total} FCFA</h3>

                       <br/>
                  <button className="btn btn-primary" type="submit" onClick={() => {
                    setShowCertificat(true)
                    setShowBon(false)
                  }}>
                       GENERER BON DE COMMANDE
                </button>
                </div>
              </div>
            </div>
          )}











      {/* Footer */}
      <footer id="contact">
        <div className="footer-content">
          <div className="footer-section">
            <h3>À propos de nous</h3>
            <p>Entreprise Miskine est a votre disposition , votre satisfaction est notre priorités, choisire entreprise Miskine c'est faire un bon choix sur son vehicule de qualites essayez et vous ne serez pas dessus .</p>
          </div>
          <div className="footer-section">
            <h3>Contactez-nous</h3>
            <p>📍 123 Rue de la Beauté, Yaounde, Cameroun</p>
            <p>📞 +237 658 87 49 12</p>
            <p>✉️ contact@salonelegance.cm</p>
          </div>
          <div className="footer-section">
            <h3>Restez connectés</h3>
            <p>Suivez-nous sur nos réseaux sociaux pour découvrir nos dernières créations, promotions et événements !</p>
            <p>
              <a href="#" style={{ color:"#fff", margin:"0 5px" }}>Facebook</a> | 
              <a href="#" style={{ color:"#fff", margin:"0 5px" }}>Instagram</a> | 
              <a href="#" style={{ color:"#fff", margin:"0 5px" }}>TikTok</a>
            </p>
          </div>
        </div>
        <div style={{ marginTop:"2rem", paddingTop:"2rem", borderTop:"1px solid #555", textAlign:"center" }}>
          <p>&copy; 2026 Bistro Elegance. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a> | <a href="#">Terms & Conditions</a> | <a href="#">Sitemap</a> | <a rel="nofollow noopener" href="#" target="_blank">Designed by Tooplate</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
