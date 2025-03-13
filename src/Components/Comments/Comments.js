import React, { useEffect, useState } from "react";
import ErrorBox from "../ErrorBox/ErrorBox";
import DeatailModal from "../DeatailsModal/DeatailsModal"
import DeleteModal from "../DeleteModal/DeleteModal";
import './Comments.css'
import EditModal from "../EditModal/EditModal";

export default function Comments() {
  const [allComments, setAllComments] = useState([]);
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowEditModal, setIsShowEditeModal] = useState(false);
  const [mainCommentBody, setMainCommentBody] = useState("");
  const [commentID, setCommentID] = useState(null)

  useEffect(() => {
    getAllComments()
  }, []);

  function getAllComments () {
    fetch("http://localhost:8000/api/comments")
      .then((res) => res.json())
      .then((comments) => setAllComments(comments));
  }

  const closeDetailsModal = () => setIsShowDetailsModal(false);
  const closeDeleteModal = () => setIsShowDeleteModal(false);
  const closeEditModal = () => setIsShowEditeModal  (false);

  const deleteComment = () => {
    fetch(`http://localhost:8000/api/comments/${commentID}`, {
      method: 'DELETE'
    }).then(res => res.json())
    .then(result => {
      console.log(result);
      setIsShowDeleteModal(false)
      getAllComments()
    })

  }
  const updatComment = (event) => {
    event.preventDefault()
    fetch(`http://localhost:8000/api/comments/${commentID}`, {
      method: 'PUT',    
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        body: mainCommentBody
      }),
    })
    .then(res => res.json())
    .then(result => {
      console.log(result) 
      setIsShowEditeModal(false)
      getAllComments()
    })
  }

  return (
    <div className="cms-main">
      {allComments.length ? (
        <table className="cms-table">
          <thead>
            <tr>
              <th>اسم کاربر</th>
              <th>محصول</th>
              <th>کامنت</th>
              <th>تاریخ</th>
              <th>ساعت</th>
            </tr>
          </thead>

          <tbody>
            {allComments.map((comment) => (
              <tr key={comment.id}>
                <td>{comment.userID}</td>
                <td>{comment.productID}</td>
                <td>
                  <button
                    onClick={() => {
                      setMainCommentBody(comment.body);
                      setIsShowDetailsModal(true);
                    }}
                  >
                    دیدن متن
                  </button>
                </td>
                <td>{comment.date}</td>
                <td>{comment.hour}</td>
                <td>
                  <button onClick={() => {
                    setIsShowDeleteModal(true)
                    setCommentID(comment.id)
                  }}>حذف</button>
                  <button onClick={() => {
                    setIsShowEditeModal(true)
                    setMainCommentBody(comment.body)
                    setCommentID(comment.id)
                  }}>ویرایش</button>
                  <button>پاسخ</button>
                  <button>تایید</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ErrorBox msg="هیچ کامنتی یافت نشد" />
      )}

      {isShowDetailsModal && (
        <DeatailModal onHide={closeDetailsModal}>
          <p className="text-modal">{mainCommentBody}</p>
          <button className="text-modal-close-btn" onClick={closeDetailsModal}>بستن</button>
        </DeatailModal>
      )}

      {
        isShowDeleteModal && (
          <DeleteModal
            cancel={closeDeleteModal}
            submit={deleteComment}
          />
        )
      }
      {
        isShowEditModal && 
        <EditModal
        onClose={closeEditModal}
        onSubmit={updatComment}     
        >
          <textarea value={mainCommentBody} onChange={event => setMainCommentBody(event.target.value)}>
          </textarea>
        </EditModal>
      }
    </div>
  );
}
