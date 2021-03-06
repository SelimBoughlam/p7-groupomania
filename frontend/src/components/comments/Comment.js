import React from "react";
import DeleteComment from "./DeleteComment";
import { IconContext } from "react-icons/lib";
import dayjs from "dayjs";
import "dayjs/locale/fr";

const Comment = ({ message }) => {
  const commentArray = message.Comments;

  return (
    <div className="comment">
      {commentArray.map((comment) => (
        <div key={comment.id}>
          <div className="comment-container">
            <div className="comment-profile">
              <h5>{comment.User.firstName + " " + comment.User.lastName}</h5>

              <span>
                {dayjs(comment.createdAt)
                  .locale("fr")
                  .format(`le DD/MM/YY à HH[h]mm`)}
              </span>
            </div>
            <div className="comment-content">
              <p>{comment.comment}</p>
            </div>
            <IconContext.Provider value={{ color: "red" }}>
              <div className="delete-comment">
                <DeleteComment comment={comment} />
              </div>
            </IconContext.Provider>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comment;
