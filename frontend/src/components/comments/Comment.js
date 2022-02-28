import React from "react";

const Comment = ({ message }) => {
  const commentArray = message.Comments;

  return (
    <div className="comment">
      {commentArray.map((comment) => (
        <div key={comment.id}>
          <div className="comment-container">
            <div className="comment-profile">
              <h5>{comment.User.firstName + " " + comment.User.lastName}</h5>
              <span>{comment.createdAt}</span>
            </div>
            <div className="comment-content">
              <p>{comment.comment}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comment;
