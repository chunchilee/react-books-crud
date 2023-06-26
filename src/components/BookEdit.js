import React, { useState } from "react";

import useBooksContext from "../hooks/use-books-context";

const BookEdit = ({ book, onSubmit }) => {
  const { handleEditBookById } = useBooksContext();
  const [title, setTitle] = useState(book.title);

  const onChange = (e) => {
    setTitle(e.target.value);
  };

  const onEditSubmit = (e) => {
    e.preventDefault();
    onSubmit();
    handleEditBookById(book.id, title);
  };

  return (
    <form className="book-edit" onSubmit={onEditSubmit}>
      <label>Title</label>
      <input type="text" className="input" value={title} onChange={onChange} />
      <button className="button is-primary">Save</button>
    </form>
  );
};

export default BookEdit;
