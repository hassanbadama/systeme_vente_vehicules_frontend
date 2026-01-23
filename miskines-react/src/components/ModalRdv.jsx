import React from "react";

export default function ModalRdv({ modele }) {
  return (
    <div className="modal fade" id={`rdv${modele.id}`} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Prendre Rendez-vous</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">
            <img src={modele.image} className="img-fluid mb-3" alt={modele.nom} />
            <p>{modele.nom} - {modele.description}</p>
            <form>
              <div className="mb-3">
                <label>Date</label>
                <input type="date" className="form-control" />
              </div>
              <div className="mb-3">
                <label>Heure</label>
                <input type="time" className="form-control" />
              </div>
              <button type="submit" className="btn btn-primary">Prendre Rendez-vous</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
