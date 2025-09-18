import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// Books
export const getBooks = () => API.get("/books");
export const createBook = (book) => API.post("/books", book);
export const updateBook = (id, book) => API.put(`/books/${id}`, book);
export const deleteBook = (id) => API.delete(`/books/${id}`);

// Chatbot
export const fetchRecommendByText = async (query) => {
  const res = await API.post("/chatbot", { query });
  return res.data;
};
