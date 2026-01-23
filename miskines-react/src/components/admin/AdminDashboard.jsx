


import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";


//import React, { useState } from "react";


//import React, { useEffect, useState } from "react";
//import axios from "axios";

const AdminDashboard = () => {
  const [show, setShow] = useState(false);

  // ================= STATES =================
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // const [id, setId] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tel, setTel] = useState("");
  const [sexe, setSexe] = useState("");
  const [type, setType] = useState("admin");

  // ================= LOAD USERS =================
  useEffect(() => {
    axios.get("http://localhost:8080/api/client/admins")
      .then(res => {
        console.log("Commande adminss :");
        console.log(res.data);
        setUsers(res.data)
      })
      .catch(err => console.error(err));
  }, []);

  // ================= RESET FORM =================
  const resetForm = () => {
    setNom("");
    setPrenom("");
    setTel("");
    setEmail("");
    setPassword("");
    setSexe("");
    setType("admin");
    setSelectedUser(null);
  };

  // ================= ADD =================
  const handleAdd = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8080/api/client/societe", {
      nom, prenom, email, password, tel, sexe,type
    }).then(res => {
      setUsers([...users, res.data]);
          
      setShow(false);
      Swal.fire("User", " ajouté avec succés dans base de donnee", "");
      resetForm();
    })
    .catch(err => console.error(err));
  };

  // ================= PREPARE EDIT =================
  const openEditModal = (user) => {
    setSelectedUser(user);
    // setNom(user.id);
    setNom(user.nom);
    setPrenom(user.prenom);
    setEmail(user.email);
    setType(user.type);
    setTel(user.tel);
    setSexe(user.sexe);
  };

  // ================= UPDATE =================
  const handleUpdate = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:8080/api/client/${selectedUser.id}`, {
      nom, prenom, email, tel, sexe,type
    }).then(res => {
      setUsers(users.map(u => u.id === selectedUser.id ? res.data : u));
      resetForm();
      Swal.fire("Modification", "effectuer avec succes", "succes");
    })
    // .catch(err => console.error(err));
  };

  // ================= DELETE =================
  const handleDelete = () => {
    axios.delete(`http://localhost:8080/api/client/${selectedUser.id}`)
      .then(() => {
        setUsers(users.filter(u => u.id !== selectedUser.id));
        Swal.fire("Supprimé", "User supprimé avec succes dans base", "success");
        setSelectedUser(null);
      });
  };

  return (
    <div className="container mt-4">

            {/* STATISTIQUES */}
            <div className="row text-center mb-4">
        <div className="col-md-4">
          <div className="bg-primary p-3 rounded text-white">
            {/* <h5>Aujourd'hui :{today.getDate()}</h5> */}
            {/* <p>Jour</p> */}
            <p>Nombre des admin</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="bg-dark p-3 rounded text-white">
            {/* <h5> mois: {today.getMonth() + 1}</h5> */}
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

     
      {/* <button
        className="btn btn-primary mb-3"
        data-bs-toggle="modal"
        data-bs-target="#addModal"
        onClick={resetForm}
      >
        + Ajouter Nouveau Admin
      </button> */}

    <div className="d-flex justify-content-between mb-3">
        <h4>Liste des Admin</h4>
        <Button onClick={() => setShow(true)}>
          <i className="fas fa-plus"></i> + Ajouter Nouveau Admin
        </Button>
      </div>

      {/* ========== USERS TABLE ========== */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Noms</th>
            <th>Prénoms</th>
            <th>Emails</th>
            <th>Sexes</th>
            <th>Numero</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) && users.map(user => (
            <tr key={user.idCoiffeur}>
              <td>{user.nom}</td>
              <td>{user.prenom}</td>
              <td>{user.email}</td>
              <td>{user.sexe}</td>
              <td>{user.tel}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#editModal"
                  onClick={() => openEditModal(user)}
                >
                  Modifier
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteModal"
                  onClick={() => setSelectedUser(user)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ========== MODAL ADD ========== */}
      {/* <div className="modal fade" id="addModal">
        <div className="modal-dialog">
          <div className="modal-content"> */}

      <Modal show={show} onHide={() => setShow(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Nouveau modèle</Modal.Title>
              </Modal.Header>
              <Modal.Body>
        

            <form onSubmit={handleAdd}>
              <div className="modal-body">
                <input className="form-control mb-2" placeholder="Nom"
                  value={nom} onChange={e => setNom(e.target.value)} required />

                <input className="form-control mb-2" placeholder="Prénom"
                  value={prenom} onChange={e => setPrenom(e.target.value)} required />

                <input className="form-control mb-2" placeholder="Tel"
                  value={tel} onChange={e => setTel(e.target.value)} required />

                <input className="form-control mb-2" placeholder="Email"
                  value={email} onChange={e => setEmail(e.target.value)} required />

                <input className="form-control mb-2" type="password"
                  placeholder="Mot de passe"
                  value={password} onChange={e => setPassword(e.target.value)} required />

                {/* <select className="form-control mb-2"
                  value={role} onChange={e => setRole(e.target.value)} required>
                  <option value="">-- Rôle --</option>
                  <option value="ADMIN">Admin</option>
                  <option value="USER">Client</option>
                  <option value="MANAGER">Coiffeur</option>
                </select> */}

                <select className="form-control"
                  value={sexe} onChange={e => setSexe(e.target.value)} required>
                  <option value="">-- Sexe --</option>
                  <option value="M">Masculin</option>
                  <option value="F">Féminin</option>
                </select>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" data-bs-dismiss="modal">
                  Annuler
                </button>
                <button className="btn btn-primary" type="submit">
                  Ajouter
                </button>
              </div>

            </form>
          {/* </div>
        </div>
      </div> */}
       </Modal.Body>
    </Modal>

      {/* ========== MODAL EDIT ========== */}
      <div className="modal fade" id="editModal">
        <div className="modal-dialog">
          <div className="modal-content">
          <div className="modal-header">
                <h5>Modifier utilisateur</h5>
                <button className="btn-close" data-bs-dismiss="modal"></button>
              </div>

            <form onSubmit={handleUpdate}>

              <div className="modal-body">
                <input className="form-control mb-2" value={nom}
                  onChange={e => setNom(e.target.value)} />

                {/* <input className="form-control mb-2" value={id}
                  onChange={e => setId(e.target.value)} /> */}
                  

                <input className="form-control mb-2" value={prenom}
                  onChange={e => setPrenom(e.target.value)} />

                <input className="form-control mb-2" value={email}
                  onChange={e => setEmail(e.target.value)} />

                <input className="form-control mb-2" value={tel}
                  onChange={e => setTel(e.target.value)} />

                <select className="form-control"
                  value={sexe} onChange={e => setSexe(e.target.value)} required>
                  <option value="">-- Sexe --</option>
                  <option value="M">Masculin</option>
                  <option value="F">Féminin</option>
                </select>

                {/* <select className="form-control"
                  value={role} onChange={e => setRole(e.target.value)}>
                  <option value="ADMIN">Admin</option>
                  <option value="USER">Client</option>
                  <option value="MANAGER">Coiffeur</option>
                </select> */}
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" data-bs-dismiss="modal">
                  Annuler
                </button>
                <button className="btn btn-warning" type="submit" data-bs-dismiss="modal">
                  Modifier
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>

      {/* ========== MODAL DELETE ========== */}
      <div className="modal fade" id="deleteModal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="text-danger">Confirmation</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              Supprimer <strong>{selectedUser?.nom}</strong> ?
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Annuler
              </button>
              <button className="btn btn-danger" onClick={handleDelete} data-bs-dismiss="modal">
                Supprimer
              </button>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;


