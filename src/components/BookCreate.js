import React, {  useState } from "react";
import useBooksContext from "../hooks/use-books-context";

const BookCreate = () => {
  const { createBook} = useBooksContext();
  const [title, setTitle] = useState("");
  console.log(useBooksContext())
  const onChange = (e) => {
    setTitle(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createBook(title);
    setTitle("");
  };
  return (
    <div className="book-create">
      <h3>Add a Book</h3>
      <form onSubmit={onSubmit}>
        <label>Title</label>
        <input
          type="text"
          className="input"
          value={title}
          onChange={onChange} 
        />
        <button className="button">Create!</button>
      </form>
    </div>
  );
};

export default BookCreate;
