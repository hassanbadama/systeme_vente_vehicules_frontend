import React from "react";
import { modeles } from "../data/modeles";
import ModalRdv from "./ModalRdv";

export default function Services() {
  return (
    // <section id="menu" className="py-5">
    //   <h2 className="text-center mb-4">Nos services</h2>
    //   <div className="row">
    //     {modeles.map((p) => (
    //       <div key={p.id} className="col-md-4 mb-4">
    //         <div className="card h-100">
    //           <img src={p.image} className="card-img-top" alt={p.nom} />
    //           <div className="card-body">
    //             <h5 className="card-title">{p.nom}</h5>
    //             <p className="card-text">{p.description}</p>
    //             <p className="card-text"><strong>Prix :</strong> {p.prix} FCFA</p>
    //             <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#rdv${p.id}`}>
    //               Voir le modèle
    //             </button>
    //             <ModalRdv modele={p} />
    //           </div>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </section>,
 

  <section id="menu">
        <h2>Our Signature Menu</h2>
        <div class="menu-grid">
          <div className="row">
          {modeles.map((p) => (
            <div key={p.id} className="col-md-4 mb-4">
              <div className="card h-100">
              <img src="https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=200&fit=crop&crop=center" alt="Truffle Risotto" class="menu-item-image"/>
                <div className="card-body">
                  <h5 className="card-title">{p.nom}</h5>
                  <p className="card-text">{p.description}</p>
                  <p className="card-text"><strong>Prix :</strong> {p.prix} FCFA</p>
                  <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#rdv${p.id}`}>
                    Voir le modèle
                  </button>
                  <ModalRdv modele={p} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
  </section>


  
    

    
  );
}
