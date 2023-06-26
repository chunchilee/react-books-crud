import React, { useState } from "react";
import useBooksContext from "../hooks/use-books-context";
import BookEdit from "./BookEdit";

const BookShow = ({ book }) => {
  const { handleDeleteBookById } = useBooksContext();
  const [showEdit, setShowEdit] = useState(false);

  const onEdit = () => {
    setShowEdit(!showEdit);
  };

  const onDelete = () => {
    handleDeleteBookById(book.id);
  };

  const onSubmit = () => {
    setShowEdit(false);
  };

  let content = <h3>{book.title}</h3>;
  if (showEdit) {
    content = <BookEdit onSubmit={onSubmit} book={book} />;
  }

  return (
    <div className="book-show">
      <img src={`https://picsum.photos/seed/${book.id}/300/200`} alt="books" />
      <div>{content}</div>
      <div className="actions">
        <button className="edit" onClick={onEdit}>
          Edit
        </button>
        <button className="delete" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default BookShow;
