import React, { useEffect } from "react";
import "./DeatailsModal.css";

export default function DeatailsModal({onHide , children}) {

    useEffect(() => {
        const checkkey = (event) => {
            if(event.keyCode === 27){
                onHide();
            }
        }
        window.addEventListener('keydown', checkkey)
        return () => window.addEventListener('keydown' , checkkey)
    });

  return (
    <div className="modal-parent active">
      <div className="details-modal">
        {children}
      </div>
    </div>
  );
}
