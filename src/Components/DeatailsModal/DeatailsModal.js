import React, { useEffect } from "react";
import "./DeatailsModal.css";

export default function DeatailsModal({onHide}) {

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
        <table className="cms-table">
          <tr>
            <th>اسم</th>
            <th>قیمت</th>
            <th>محبوبیت</th>
          </tr>
          <tr>
            <td>لپ تاپ</td>
            <td>12.000.000</td>
            <td>91</td>
          </tr>
        </table>
      </div>
    </div>
  );
}
