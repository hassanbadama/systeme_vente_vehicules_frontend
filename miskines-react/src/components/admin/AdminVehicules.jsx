import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";

import { getModels, addModel, deleteModel } from "../service/modelService";


const ModelCoiffure = () => {
  const [models, setModels] = useState([]);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    model: "",
    marque:"",
    description: "",
    prix: "",
    famille:"",
    type:"",
    file: null
  });

  const today = new Date();

  useEffect(() => {
    loadModels();
  }, []);

  const loadModels = async () => {
    const res = await getModels();
    console.log("valeur recurer")
    console.log(res.data)
    setModels(res.data);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("model", form.model);
    data.append("marque", form.marque);
    data.append("description", form.description);
    data.append("prix", form.prix);
    data.append("famille", form.famille);
    data.append("type", form.type);
    data.append("file", form.file);

    await addModel(data);
    setShow(false);
    loadModels();

    Swal.fire("Vehicule", " ajouté avec succes dans base de donnee", "success");
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Supprimer ?",
      text: "Cette action est irréversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, supprimer",
    });

    if (confirm.isConfirmed) {
      await deleteModel(id);
      loadModels();
      Swal.fire("Supprimé", "Vous avez supprimer vehicule avec success dans la base de donnee", "success");
    }
  };

  return (
    <div className="container py-5">




      {/* <nav>
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
            <span>Miskine Kaltane</span>
          </a>
          <ul className="nav-links">
            <li><a href="#home" className="active">Home</a></li>
            <li><a href="#menu">Services</a></li>
            <li><a href="#contact">Contact</a></li>

        



          </ul>
          <div className="menu-toggle">
            <span></span><span></span><span></span>
          </div>
        </div>
      </nav> */}












      {/* STATISTIQUES */}
      <div className="row text-center mb-4">
        <div className="col-md-4">
          <div className="bg-primary p-3 rounded text-white">
            <h5>Aujourd'hui :{today.getDate()}</h5>
            {/* <p>Jour</p> */}
          </div>
        </div>
        <div className="col-md-4">
          <div className="bg-dark p-3 rounded text-white">
            <h5> mois: {today.getMonth() + 1}</h5>
            {/* <p>Mois</p> */}
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
        <h4>Liste des  Voitures en stock</h4>
        <Button onClick={() => setShow(true)}>
          <i className="fas fa-plus"></i> Ajouter
        </Button>
      </div>

      {/* TABLE */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Model</th>
            <th>marque</th>
            <th>Description</th>
            <th>Prix</th>
            <th>Type Carburants</th>
            <th>Image</th>
            <th>Dates Entrer Stocker</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {models.map((p) => (
            <tr key={p.id}>
              <td>{p.model}</td>
              <td>{p.marque}</td>
              <td>{p.description}</td>
              <td>{p.prix}</td>
              <td>{p.vehiculeType}</td>
              <td>
                <img
                  src={`http://localhost:8080/api/vehicules/image/${p.id}`}
                  alt=""
                  width="60"
                />
              </td>
              <td>{p.dateEntreStocke}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(p.id)}
                >
                  <i className="fas fa-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL AJOUT */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Nouveau modèle</Modal.Title>
        </Modal.Header>
        <Modal.Body>


        <form onSubmit={handleSubmit} >
            <input
              className="form-control mb-2"
              name="model"
              placeholder="model"
              onChange={handleChange}
              required
            />

            <input
              className="form-control mb-2"
              name="marque"
              placeholder="marque"
              onChange={handleChange}
              required
            />      

            <input
              className="form-control mb-2"
              name="description"
              placeholder="Description"
              onChange={handleChange}
            />

            {/*  Liste déroulante Famille */}
            <select
              className="form-control mb-2"
              name="famille"
              onChange={handleChange}
              required
            >
              <option value="">Sélectionner une famille</option>
              <option value="electrique">electrique</option>
              <option value="essence">essence</option>
            </select>

            {/* Liste déroulante Type */}
            <select
              className="form-control mb-2"
              name="type"
              onChange={handleChange}
              required
            >
              <option value=""> Sélectionner un type</option>
              <option value="automobile">automobile</option>
              <option value="scooter">scooter</option>
            </select>

            <input
              className="form-control mb-2"
              name="prix"
              placeholder="Prix"
              type="number"
              onChange={handleChange}
              required
            />

            <input
              type="file"
              className="form-control mb-3"
              name="file"
              onChange={handleChange}
              required
            />

            <Button type="submit">Ajouter</Button>
          </form>



          {/* <form onSubmit={handleSubmit}>
            <input
              className="form-control mb-2"
              name="nom"
              placeholder="Nom"
              onChange={handleChange}
              required
            />
            <input
              className="form-control mb-2"
              name="description"
              placeholder="Description"
              onChange={handleChange}
            />
            <input
              className="form-control mb-2"
              name="prix"
              placeholder="Prix"
              onChange={handleChange}
              required
            />
            <input
              type="file"
              className="form-control mb-3"
              name="file"
              onChange={handleChange}
              required
            />
            <Button type="submit">Ajouter</Button>
          </form> */}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModelCoiffure;
