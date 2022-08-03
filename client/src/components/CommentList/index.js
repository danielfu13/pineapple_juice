import React from 'react';

const CommentList = ({ comments = [] }) => {
  if (!comments.length) {
    return <h3>No suggestions yet</h3>;
  }

  return (
    <div className="col-24">
      <h3
        className="p-5 display-inline-block"
         >
        Suggestions
      </h3>
      <div className="flex-row my-4">
        {comments &&
          comments.map((comment) => (
            <div key={comment._id} className="col-12 mb-3 pb-3">
              <div className="p-3 bg-new text-light">
                <h5 className="card-header">
                  {comment.commentAuthor} wrote{' '}
                  <span style={{ fontSize: '0.825rem' }}>
                     {comment.createdAt}
                  </span>
                </h5>
                <p className="card-body">{comment.commentText}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CommentList;
