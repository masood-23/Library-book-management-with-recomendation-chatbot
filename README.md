# Library Book Management with AI Recommendation Chatbot 📚🤖

A full-stack library management system with an intelligent chatbot that provides personalized book recommendations using Google Gemini AI and a comprehensive book database.

## Features

### 📚 **Book Management**
- Complete CRUD operations for books
- 90+ books across 27+ genres pre-loaded
- Search and filter functionality
- Book details including title, author, genre, and year

### 🤖 **AI-Powered Chatbot**
- Intelligent book recommendations based on genres and preferences
- Search functionality for books by title, author, or genre
- Real-time responses using Google Gemini AI with fallback responses
- Conversation history tracking
- Interactive UI with typing indicators

### 🎯 **Smart Features**
- Genre-based recommendations
- Advanced search capabilities
- Library information and hours
- Book statistics and collection overview
- Responsive web design

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **Google Gemini AI** for chatbot responses
- **CORS** enabled for cross-origin requests
- **ES Modules** for modern JavaScript

### Frontend
- **React 18** with functional components
- **React Bootstrap** for UI components
- **Axios** for API communication
- **React Router** for navigation
- **Modern CSS** with responsive design

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally)
- Google Gemini AI API key (optional - fallback responses available)

### Installation

1. **Clone and Setup Backend**
   ```bash
   cd backend
   npm install
   ```

2. **Configure Environment**
   ```bash
   # Backend .env file is already configured:
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/mern_library
   GEMINI_API_KEY=your_api_key_here  # Optional
   ```

3. **Seed the Database**
   ```bash
   node seed-books.js
   ```
   This adds 90 books across 27 genres to your database.

4. **Start Backend Server**
   ```bash
   node server.js
   # or for development:
   npm run dev
   ```

5. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   npm start
   ```

### API Endpoints

#### Books Management
- `GET /api/books` - Get all books
- `POST /api/books` - Create a new book
- `GET /api/books/:id` - Get book by ID
- `PUT /api/books/:id` - Update book
- `DELETE /api/books/:id` - Delete book

#### Chatbot
- `POST /api/chatbot` - Send message to chatbot
  ```json
  {
    "message": "Recommend me some fantasy books"
  }
  ```

#### Recommendations
- `POST /api/recommend` - Get book recommendations
  ```json
  {
    "text": "fantasy"
  }
  ```

## Chatbot Usage Examples

### Getting Recommendations
- "Recommend me some fantasy books"
- "Suggest thriller novels"
- "I want to read science fiction"

### Searching Books
- "Find books by Stephen King"
- "Search for programming books"
- "Show me horror novels"

### General Queries
- "What genres do you have?"
- "How many books are in your collection?"
- "What are your library hours?"

### Sample Conversation
```
User: Hello!
Bot: Hello! 👋 Welcome to our library chatbot. I'm here to help you explore our collection of 90 books across 27 genres.

I can help you:
• Get book recommendations
• Search for specific books or authors
• Browse different genres
• Answer questions about library services

What are you looking to read today?

User: Recommend me some fantasy books
Bot: Here are some great book recommendations in Fantasy:

📚 The Fifth Season by N.K. Jemisin (2015)
📚 The Way of Kings by Brandon Sanderson (2010)
📚 The Name of the Wind by Patrick Rothfuss (2007)
📚 Harry Potter and the Philosopher's Stone by J.K. Rowling (1997)

Would you like more recommendations in a specific genre?
```

## Available Genres

Our library includes books in 27 different genres:
- Adventure, Biography, Business, Classics
- Computer Science, Cyberpunk, Dystopian, Fantasy
- Fiction, Health, Historical Fiction, Historical Romance
- History, Horror, Memoir, Mystery
- Philosophy, Poetry, Programming, Psychology
- Romance, Science, Science Fiction, Self-Help
- Thriller, Travel, Young Adult

## Database Schema

### Book Model
```javascript
{
  title: String (required),
  author: String,
  genre: String,
  year: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### User History Model
```javascript
{
  query: String (required),
  response: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running locally
   - Check connection string in `.env`

2. **Chatbot Not Responding**
   - API key issues are handled with fallback responses
   - Check backend logs for errors

3. **Frontend Can't Connect**
   - Ensure backend is running on port 5000
   - Check CORS configuration

4. **No Books Showing**
   - Run the seed script: `node seed-books.js`
   - Check MongoDB for data

### Development Tips

- Use `npm run dev` for backend development with nodemon
- Frontend runs on port 3000, backend on port 5000
- Check browser console and backend logs for errors
- API responses include detailed error messages in development mode




