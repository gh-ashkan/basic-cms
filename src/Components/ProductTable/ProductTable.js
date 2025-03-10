import React, { Children, useEffect, useState } from "react";
import "./ProductTable.css";
import DeleteModal from "../DeleteModal/DeleteModal";
import DeatailsModal from "../DeatailsModal/DeatailsModal";
import EditModal from "../EditModal/EditModal";
import { AiOutlineDollarCircle } from "react-icons/ai";
import ErrorBox from "../ErrorBox/ErrorBox";

export default function ProductsTable() {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [ProductsId, setProductsId] = useState(null);

  useEffect(() => {
    getAllProducts()
  }, []);

  const getAllProducts = () => {
    fetch("http://localhost:8000/api/products")
      .then((res) => res.json())
      .then((products) => setAllProducts(products));
  }

  const submitAction = () => {
    console.log('مدال تایید شد')
    fetch(`http://localhost:8000/api/products/${ProductsId}`, {
      method: 'DELETE'
    }).then(res => res.json())
    .then(result => {
    setIsShowModal(false);
    getAllProducts()
  })
    
    
  };
  const cancelAction = () => {
    setIsShowModal(false);
  };
  const closeDetailsModal = () => {
    setIsShowDetailsModal(false);
  };
  const updateProductInfos = (event) => {
    // setIsShowEditModal(false)
    event.preventDefault();
    console.log("مدال بسته شد");
  };

  return (
    <>

    {
      allProducts.length ? (
        <table className="products-table">
        <thead>
          <tr className="products-table-heading-tr">
            <th>عکس</th>
            <th>اسم</th>
            <th>قیمت</th>
            <th>موجودی</th>
          </tr>
        </thead>

        <tbody>
          {allProducts.map((products) => (
            <tr className="products-table-tr" key={products.id}>
              <td>
                <img
                  src={products.img}
                  alt="oil img"
                  className="products-table-img"
                />
              </td>
              <td>{products.title}</td>
              <td>{products.price}</td>
              <td>{products.count}</td>
              <td>
                <button
                  className="products-table-btn"
                  onClick={() => setIsShowDetailsModal(true)}
                >
                  جزییات
                </button>
                <button
                  className="products-table-btn"
                  onClick={() => { setIsShowModal(true)
                                  setProductsId(products.id)
                  }}
                  
                >
                  حذف
                </button>
                <button
                  className="products-table-btn"
                  onClick={() => setIsShowEditModal(true)}  
                >
                  ویرایش
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      ) : (<ErrorBox msg="هیچ محصولی یافت نشد" />)
    }

      
      {isShowModal && (
        <DeleteModal submit={submitAction} cancel={cancelAction} />
      )}
      {isShowDetailsModal && <DeatailsModal onHide={closeDetailsModal} />}
      {isShowEditModal && (
        <EditModal
          onClose={() => setIsShowEditModal(false)}
          onSubmit={updateProductInfos}
        >
          {/* {Children} */}
          <div className="edit-proructs-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="عنوان جدید را وارد کنید"
              className="edit-product-input"
            />
          </div>
          <div className="edit-proructs-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="عنوان جدید را وارد کنید"
              className="edit-product-input"
            />
          </div>
          <div className="edit-proructs-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="عنوان جدید را وارد کنید"
              className="edit-product-input"
            />
          </div>
          <div className="edit-proructs-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="عنوان جدید را وارد کنید"
              className="edit-product-input"
            />
          </div>
        </EditModal>
      )}
    </>
  );
}
