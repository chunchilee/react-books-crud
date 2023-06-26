import axios from "axios";
import React, { createContext, useCallback, useState } from "react";
const BooksContext = createContext();

const Provider = ({ children }) => {
  const [books, setBooks] = useState([]);

  const fetchBooks = useCallback(async () => {
    const response = await axios.get("http://localhost:3001/books");
    setBooks(response.data);
  }, []);

  const handleEditBookById = async (id, newTitle) => {
    const response = await axios.put(`http://localhost:3001/books/${id}`, {
      title: newTitle,
    });
    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        // 單選項的更新title，但如果有其他選項被其他user更改，發出更改title請求的用戶，回傳給他response的數據是不完整的
        // return {...book,title:newTitle}

        // 某用戶發出請求更新book.title，API Server會連同其他更新的數據一起回傳response給這個發出更改請求的用戶
        // ...response.data 因爲只有更改title的選項，若有加入其他選項並且這些選項在其他用戶發送更改請求
        // API Server在回傳response時，會立刻的回傳最新的 database
        return { ...book, ...response.data };
      }
      return book;
    });
    setBooks(updatedBooks);
  };

  const handleDeleteBookById = async (id) => {
    await axios.delete(`http://localhost:3001/books/${id}`);
    const updateBooks = books.filter((book) => {
      return book.id !== id;
    });

    setBooks(updateBooks);
  };

  const createBook = async (newTitle) => {
    const response = await axios.post("http://localhost:3001/books", {
      title: newTitle,
    });
    const updatedBooks = [...books, response.data];
    setBooks(updatedBooks);
  };

  const valueProps = {
    books,
    fetchBooks,
    handleDeleteBookById,
    handleEditBookById,
    createBook,
  };
  return (
    <BooksContext.Provider value={valueProps}>{children}</BooksContext.Provider>
  );
};

export { Provider };
export { BooksContext };
