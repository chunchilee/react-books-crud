import React from "react";
import useBooksContext from "../hooks/use-books-context";
import BookShow from "./BookShow";

const BookList = () => {
  const { books } = useBooksContext();
  const renderBooks = books.map((book) => {
    return <BookShow key={book.id} book={book} />;
  });
  return <div className="book-list">{renderBooks}</div>;
};

export default BookList;
