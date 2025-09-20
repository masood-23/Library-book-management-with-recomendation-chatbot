import { GoogleGenerativeAI } from "@google/generative-ai";
import UserHistory from "../models/UserHistory.js";
import Book from "../models/Book.js";

// Initialize Google Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Helper function to get book recommendations from database
const getBookRecommendations = async (genre = null, limit = 5) => {
  try {
    let query = {};
    if (genre) {
      query = { genre: { $regex: new RegExp(genre, 'i') } };
    }
    
    const books = await Book.find(query)
      .sort({ year: -1 }) // Sort by newest first
      .limit(limit);
    
    return books;
  } catch (error) {
    console.error('Error fetching book recommendations:', error);
    return [];
  }
};

// Helper function to search books by keyword
const searchBooks = async (keyword, limit = 5) => {
  try {
    const searchRegex = new RegExp(keyword, 'i');
    const books = await Book.find({
      $or: [
        { title: searchRegex },
        { author: searchRegex },
        { genre: searchRegex }
      ]
    }).limit(limit);
    
    return books;
  } catch (error) {
    console.error('Error searching books:', error);
    return [];
  }
};

// Helper function to get available genres
const getAvailableGenres = async () => {
  try {
    const genres = await Book.distinct('genre');
    return genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    return [];
  }
};

// @desc    Enhanced chatbot handler with book database integration
export const chatbotReply = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    let reply;
    const lowerMessage = message.toLowerCase();
    
    // Try Gemini API first, fallback to enhanced responses with book database
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      // Get some context from our book database
      const totalBooks = await Book.countDocuments();
      const genres = await getAvailableGenres();
      
      const bookPrompt = `You are a helpful library assistant. Our library has ${totalBooks} books across genres like ${genres.slice(0, 10).join(', ')}. The user asked: "${message}". Please provide a helpful and personalized response about books, reading recommendations, or library services. Keep responses concise but helpful.`;
      
      const result = await model.generateContent(bookPrompt);
      reply = result.response.text();
    } catch (apiError) {
      console.warn("Gemini API failed, using enhanced database responses:", apiError.message);
      
      // Enhanced responses using book database
      if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest')) {
        // Extract genre if mentioned
        let targetGenre = null;
        const genres = await getAvailableGenres();
        for (const genre of genres) {
          if (lowerMessage.includes(genre.toLowerCase())) {
            targetGenre = genre;
            break;
          }
        }
        
        const recommendations = await getBookRecommendations(targetGenre, 4);
        
        if (recommendations.length > 0) {
          reply = `Here are some great book recommendations${targetGenre ? ` in ${targetGenre}` : ''}:\n\n`;
          recommendations.forEach(book => {
            const availabilityStatus = book.copies > 0 ? `✅ ${book.copies} copies available` : '❌ Currently out of stock';
            reply += `📚 **${book.title}** by ${book.author} (${book.year}) - ${availabilityStatus}\n`;
          });
          reply += `\nWould you like more recommendations in a specific genre? We have books in: ${genres.slice(0, 8).join(', ')}, and more!`;
        } else {
          reply = `I'd love to help you find the perfect book! We have ${await Book.countDocuments()} books in our collection. Could you tell me what genre or type of book you're interested in?`;
        }
      } else if (lowerMessage.includes('search') || lowerMessage.includes('find')) {
        // Extract search term
        const searchTerms = message.split(' ').filter(word => 
          !['search', 'find', 'book', 'for', 'a', 'an', 'the', 'by'].includes(word.toLowerCase())
        );
        
        if (searchTerms.length > 0) {
          const searchTerm = searchTerms.join(' ');
          const results = await searchBooks(searchTerm, 5);
          
          if (results.length > 0) {
            reply = `I found these books related to "${searchTerm}":\n\n`;
            results.forEach(book => {
              const availabilityStatus = book.copies > 0 ? `✅ ${book.copies} copies` : '❌ Out of stock';
              reply += `📚 **${book.title}** by ${book.author} (${book.genre}, ${book.year}) - ${availabilityStatus}\n`;
            });
          } else {
            reply = `I couldn't find any books matching "${searchTerm}". Try searching by title, author, or genre. You can also ask for recommendations!`;
          }
        } else {
          reply = `What would you like to search for? You can search by book title, author name, or genre.`;
        }
      } else if (lowerMessage.includes('genre') || lowerMessage.includes('categories')) {
        const genres = await getAvailableGenres();
        reply = `We have books in ${genres.length} different genres:\n\n`;
        genres.forEach(genre => {
          reply += `• ${genre}\n`;
        });
        reply += `\nJust ask me for recommendations in any of these genres!`;
      } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        const totalBooks = await Book.countDocuments();
        reply = `Hello! 👋 Welcome to our library chatbot. I'm here to help you explore our collection of ${totalBooks} books across ${(await getAvailableGenres()).length} genres.\n\nI can help you:\n• Get book recommendations\n• Search for specific books or authors\n• Browse different genres\n• Answer questions about library services\n\nWhat are you looking to read today?`;
      } else if (lowerMessage.includes('hours') || lowerMessage.includes('open')) {
        reply = `Our library hours are:\n\n🕒 Monday-Friday: 9:00 AM - 8:00 PM\n🕒 Saturday: 9:00 AM - 5:00 PM\n🕒 Sunday: 1:00 PM - 5:00 PM\n\nWe're closed on major holidays. Need help finding a book while you're here?`;
      } else if (lowerMessage.includes('how many') || lowerMessage.includes('count') || lowerMessage.includes('copies') || lowerMessage.includes('available')) {
        const totalBooks = await Book.countDocuments();
        const availableBooks = await Book.countDocuments({ copies: { $gt: 0 } });
        const genres = await getAvailableGenres();
        
        // Get total copies count
        const totalCopiesResult = await Book.aggregate([
          { $group: { _id: null, total: { $sum: "$copies" } } }
        ]);
        const totalCopies = totalCopiesResult[0]?.total || 0;
        
        reply = `Our library currently has:\n\n📚 **${totalBooks} unique books** across **${genres.length} genres**\n📎 **${totalCopies} total copies** available\n✅ **${availableBooks} books** currently in stock\n\nWe're always adding more to our collection. Would you like to see what's available in a particular genre?`;
      } else {
        reply = `I'm here to help you discover great books! 📚\n\nYou can ask me to:\n• "Recommend fantasy books"\n• "Search for books by Stephen King"\n• "What genres do you have?"\n• "Find books about programming"\n\nWhat interests you today?`;
      }
    }

    // Save history (with error handling)
    try {
      const history = new UserHistory({ query: message, response: reply });
      await history.save();
    } catch (historyError) {
      console.warn("History save failed:", historyError.message);
      // Continue anyway - don't fail the whole request
    }

    res.json({ reply });
  } catch (err) {
    console.error("Chatbot error:", err);
    res.status(500).json({ 
      message: "Chatbot API error", 
      error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
  }
};
