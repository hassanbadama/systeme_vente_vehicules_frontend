// import axios from "axios";

// const API_URL = "http://localhost:8079/SERVICE-MODELCOIFFURES";

// export const getModels = () => axios.get(`${API_URL}`);
// export const addModel = (formData) =>
//   axios.post(`${API_URL}`, formData);
// export const deleteModel = (id) =>
//   axios.get(`${API_URL}/delete/${id}`);

// import axios from "axios";

// const API = "http://localhost:8079/SERVICE-MODELCOIFFURES";

// export const addModel = (formData) =>
//   axios.post(`${API}/AjouterModelcoiffure`, formData, {
//     headers: {
//       "Content-Type": "multipart/form-data"
//     }
//   });

import axios from "axios";

const API = "http://localhost:8080/api";

export const getModels = () => axios.get(`${API}/catalogue/liste`);
export const afficheCommandes = () => axios.get("http://localhost:8080/api/commandes");
export const afficheCommand = () => axios.get("http://localhost:8080/api/commandes/commande");

export const addModel = (formData) =>
  axios.post(`${API}/vehicules`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

//  Vérifie que cette fonction existe
export const deleteModel = (id) =>
  axios.delete(`${API}/vehicules/${id}`);




// @Data
// public class CommandeDTO {
//     public Long id; 
//     public String dateCommande;
//     public String etat;
//     public double total;
//     public Client client;
//     public List<LigneCommande> lignes;


//     public List<CommandeDTO> findAllcommande() {
//       return commandeRepository.findAll()
//       .stream()
//       .map(v->new CommandeDTO(
//           v.getId(),
//           v.getDateCommande(),
//           v.getEtat(), 
//           v.getTotal(),
//           v.getClient(),
//           v.getLignes()
      
//       ))
//       .toList();
//   }

