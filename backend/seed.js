// run `npm run seed` to populate sample data
const connectDB = require('./config/db');
const Book = require('./models/Book');


const data = [
    { title: 'The Pragmatic Programmer', author: 'Andrew Hunt, David Thomas', description: 'Practical advice and best practices for software developers.', genre: 'Programming', year: 1999, copies: 3 },
    { title: 'Clean Code', author: 'Robert C. Martin', description: 'A handbook of agile software craftsmanship focusing on writing readable code.', genre: 'Programming', year: 2008, copies: 2 },
    { title: 'Introduction to Algorithms', author: 'Cormen et al.', description: 'Comprehensive textbook covering a wide range of algorithms in depth.', genre: 'Computer Science', year: 2009, copies: 1 },
    { title: 'The Hobbit', author: 'J.R.R. Tolkien', description: 'A fantasy adventure about Bilbo Baggins and a group of dwarves.', genre: 'Fantasy', year: 1937, copies: 4 },
    { title: 'Atomic Habits', author: 'James Clear', description: 'Practical strategies to form good habits and break bad ones.', genre: 'Self-help', year: 2018, copies: 5 }
];


(async () => {
await connectDB();
await Book.deleteMany({});
await Book.insertMany(data);
console.log('Seeded');
process.exit(0);
})();