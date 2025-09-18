import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000/api';

export const fetchBooks = () => axios.get(`${API_BASE}/books`).then(res => res.data);
export const fetchRecommendByText = (text) =>
  axios.post(`${API_BASE}/recommend/by-text`, { text }).then(res => res.data);
export const fetchRecommendByBook = (id) =>
  axios.get(`${API_BASE}/recommend/by-book/${id}`).then(res => res.data);

export const createBook = (book) => axios.post(`${API_BASE}/books`, book).then(res => res.data);
export const updateBook = (id, book) => axios.put(`${API_BASE}/books/${id}`, book).then(res => res.data);
export const deleteBook = (id) => axios.delete(`${API_BASE}/books/${id}`).then(res => res.data);
