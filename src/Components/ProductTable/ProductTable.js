import React, { Children, useEffect, useState } from "react";
import "./ProductTable.css";
import DeleteModal from "../DeleteModal/DeleteModal";
import DeatailsModal from "../DeatailsModal/DeatailsModal";
import EditModal from "../EditModal/EditModal";
import { AiOutlineDollarCircle } from "react-icons/ai";
import ErrorBox from "../ErrorBox/ErrorBox";

export default function ProductsTable({allProducts , getAllProducts}) {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [ProductsId, setProductsId] = useState(null);
  const [mainProductInfos, setMainProductInfos] = useState({});

  const [productNewTitle, setProductNewTitle] = useState("");
  const [productNewPrice, setProductNewPrice] = useState("");
  const [productNewCount, setProductNewCount] = useState("");
  const [productNewImg, setProductNewImg] = useState("");
  const [productNewPopularity, setProductNewPopularity] = useState("");
  const [productNewSale, setProductNewSale] = useState("");
  const [productNewColors, setProductNewColors] = useState("");



  const submitAction = () => {
    console.log("مدال تایید شد");
    fetch(`http://localhost:8000/api/products/${ProductsId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        setIsShowModal(false);
        getAllProducts();
      });
  };
  const cancelAction = () => {
    setIsShowModal(false);
  };
  const closeDetailsModal = () => {
    setIsShowDetailsModal(false);
  };
  const updateProductInfos = (event) => {
    event.preventDefault();

    const productsNewInfos = {
      title: productNewTitle,
      price: productNewPrice,
      count: productNewCount,
      img: productNewImg,
      popularity: productNewPopularity,
      sale: productNewSale,
      colors: productNewColors,
    }

    fetch(`http://localhost:8000/api/products/${ProductsId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productsNewInfos)
    }).then(res => res.json())
    .then(result => {
      console.log(result);
      getAllProducts()
      setIsShowEditModal(false)
    })

    console.log("محصول ویرایش شد");
  };

  

  return (
    <>
      {allProducts.length ? (
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
                    onClick={() => {
                      setIsShowDetailsModal(true);
                      setMainProductInfos(products);
                    }}
                  >
                    جزییات
                  </button>
                  <button
                    className="products-table-btn"
                    onClick={() => {
                      setIsShowModal(true);
                      setProductsId(products.id);
                    }}
                  >
                    حذف
                  </button>
                  <button
                    className="products-table-btn"
                    onClick={() => {
                      setIsShowEditModal(true);
                      setProductsId(products.id);
                      setProductNewTitle(products.title);
                      setProductNewPrice(products.price);
                      setProductNewCount(products.count);
                      setProductNewImg(products.img);
                      setProductNewPopularity(products.popularity);
                      setProductNewSale(products.sale);
                      setProductNewColors(products.colors);
                    }}
                  >
                    ویرایش
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ErrorBox msg="هیچ محصولی یافت نشد" />
      )}

      {isShowModal && (
        <DeleteModal submit={submitAction} cancel={cancelAction} title='ایااز حذف اطمینان دارید؟' />
      )}
      {isShowDetailsModal && (
        <DeatailsModal onHide={closeDetailsModal}>
          <table className="cms-table">
            <tr>
              <th>محبوبیت</th>
              <th>فروش</th>
              <th>رنگ بندی</th>
            </tr>
            <tr>
              <td>{mainProductInfos.popularity}%</td>
              <td>{mainProductInfos.sale}</td>
              <td>{mainProductInfos.colors}</td>
            </tr>
          </table>
        </DeatailsModal>
      )}
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
              value={productNewTitle}
              onChange={(event) => setProductNewTitle(event.target.value)}
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
              value={productNewPrice}
              onChange={(event) => setProductNewPrice(event.target.value)}
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
              value={productNewCount}
              onChange={(event) => setProductNewCount(event.target.value)}
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
              value={productNewImg}
              onChange={(event) => setProductNewImg(event.target.value)}
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
              value={productNewPopularity}
              onChange={(event) => setProductNewPopularity(event.target.value)}
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
              value={productNewSale}
              onChange={(event) => setProductNewSale(event.target.value)}
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
              value={productNewColors}
              onChange={(event) => setProductNewColors(event.target.value)}
            />
          </div>
        </EditModal>
      )}
    </>
  );
}
