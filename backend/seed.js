// run `node seed.js` to populate sample data
import connectDB from './config/db.js';
import Book from './models/Book.js';
import dotenv from 'dotenv';

dotenv.config();

// Comprehensive book collection across multiple genres
const books = [
  // Fiction & Literature
  { title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', year: 1960 },
  { title: '1984', author: 'George Orwell', genre: 'Fiction', year: 1949 },
  { title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance', year: 1813 },
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', year: 1925 },
  { title: 'One Hundred Years of Solitude', author: 'Gabriel García Márquez', genre: 'Fiction', year: 1967 },
  { title: 'The Catcher in the Rye', author: 'J.D. Salinger', genre: 'Fiction', year: 1951 },
  { title: 'Lord of the Flies', author: 'William Golding', genre: 'Fiction', year: 1954 },
  { title: 'Jane Eyre', author: 'Charlotte Brontë', genre: 'Romance', year: 1847 },
  { title: 'The Kite Runner', author: 'Khaled Hosseini', genre: 'Fiction', year: 2003 },
  { title: 'Life of Pi', author: 'Yann Martel', genre: 'Adventure', year: 2001 },
  { title: 'The Book Thief', author: 'Markus Zusak', genre: 'Historical Fiction', year: 2005 },
  { title: 'Beloved', author: 'Toni Morrison', genre: 'Historical Fiction', year: 1987 },
  { title: 'The Handmaid\'s Tale', author: 'Margaret Atwood', genre: 'Dystopian', year: 1985 },
  { title: 'Brave New World', author: 'Aldous Huxley', genre: 'Science Fiction', year: 1932 },
  { title: 'The Lord of the Rings: Fellowship', author: 'J.R.R. Tolkien', genre: 'Fantasy', year: 1954 },

  // Fantasy & Sci-Fi
  { title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy', year: 1937 },
  { title: 'Game of Thrones', author: 'George R.R. Martin', genre: 'Fantasy', year: 1996 },
  { title: 'Harry Potter and the Philosopher\'s Stone', author: 'J.K. Rowling', genre: 'Fantasy', year: 1997 },
  { title: 'Dune', author: 'Frank Herbert', genre: 'Science Fiction', year: 1965 },
  { title: 'The Martian', author: 'Andy Weir', genre: 'Science Fiction', year: 2011 },
  { title: 'Foundation', author: 'Isaac Asimov', genre: 'Science Fiction', year: 1951 },
  { title: 'Ender\'s Game', author: 'Orson Scott Card', genre: 'Science Fiction', year: 1985 },
  { title: 'The Hitchhiker\'s Guide to the Galaxy', author: 'Douglas Adams', genre: 'Science Fiction', year: 1979 },
  { title: 'Neuromancer', author: 'William Gibson', genre: 'Cyberpunk', year: 1984 },
  { title: 'The Name of the Wind', author: 'Patrick Rothfuss', genre: 'Fantasy', year: 2007 },
  { title: 'The Way of Kings', author: 'Brandon Sanderson', genre: 'Fantasy', year: 2010 },
  { title: 'The Fifth Season', author: 'N.K. Jemisin', genre: 'Fantasy', year: 2015 },
  { title: 'The Left Hand of Darkness', author: 'Ursula K. Le Guin', genre: 'Science Fiction', year: 1969 },
  { title: 'Project Hail Mary', author: 'Andy Weir', genre: 'Science Fiction', year: 2021 },
  { title: 'The Time Machine', author: 'H.G. Wells', genre: 'Science Fiction', year: 1895 },

  // Mystery & Thriller
  { title: 'The Girl with the Dragon Tattoo', author: 'Stieg Larsson', genre: 'Mystery', year: 2005 },
  { title: 'Gone Girl', author: 'Gillian Flynn', genre: 'Thriller', year: 2012 },
  { title: 'The Da Vinci Code', author: 'Dan Brown', genre: 'Thriller', year: 2003 },
  { title: 'And Then There Were None', author: 'Agatha Christie', genre: 'Mystery', year: 1939 },
  { title: 'The Girl on the Train', author: 'Paula Hawkins', genre: 'Thriller', year: 2015 },
  { title: 'The Silence of the Lambs', author: 'Thomas Harris', genre: 'Thriller', year: 1988 },
  { title: 'In the Woods', author: 'Tana French', genre: 'Mystery', year: 2007 },
  { title: 'The Thursday Murder Club', author: 'Richard Osman', genre: 'Mystery', year: 2020 },
  { title: 'Big Little Lies', author: 'Liane Moriarty', genre: 'Mystery', year: 2014 },
  { title: 'The Woman in the Window', author: 'A.J. Finn', genre: 'Thriller', year: 2018 },

  // Romance
  { title: 'The Seven Husbands of Evelyn Hugo', author: 'Taylor Jenkins Reid', genre: 'Romance', year: 2017 },
  { title: 'Me Before You', author: 'Jojo Moyes', genre: 'Romance', year: 2012 },
  { title: 'The Fault in Our Stars', author: 'John Green', genre: 'Romance', year: 2012 },
  { title: 'Outlander', author: 'Diana Gabaldon', genre: 'Historical Romance', year: 1991 },
  { title: 'The Notebook', author: 'Nicholas Sparks', genre: 'Romance', year: 1996 },
  { title: 'It Ends with Us', author: 'Colleen Hoover', genre: 'Romance', year: 2016 },
  { title: 'The Hating Game', author: 'Sally Thorne', genre: 'Romance', year: 2016 },
  { title: 'Beach Read', author: 'Emily Henry', genre: 'Romance', year: 2020 },
  { title: 'Red, White & Royal Blue', author: 'Casey McQuiston', genre: 'Romance', year: 2019 },
  { title: 'The Kiss Quotient', author: 'Helen Hoang', genre: 'Romance', year: 2018 },

  // Non-Fiction & Self-Help
  { title: 'Sapiens', author: 'Yuval Noah Harari', genre: 'History', year: 2011 },
  { title: 'Educated', author: 'Tara Westover', genre: 'Memoir', year: 2018 },
  { title: 'Atomic Habits', author: 'James Clear', genre: 'Self-Help', year: 2018 },
  { title: 'The 7 Habits of Highly Effective People', author: 'Stephen Covey', genre: 'Self-Help', year: 1989 },
  { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', genre: 'Psychology', year: 2011 },
  { title: 'The Power of Habit', author: 'Charles Duhigg', genre: 'Psychology', year: 2012 },
  { title: 'Mindset', author: 'Carol Dweck', genre: 'Psychology', year: 2006 },
  { title: 'The Subtle Art of Not Giving a F*ck', author: 'Mark Manson', genre: 'Self-Help', year: 2016 },
  { title: 'Becoming', author: 'Michelle Obama', genre: 'Memoir', year: 2018 },
  { title: 'The Immortal Life of Henrietta Lacks', author: 'Rebecca Skloot', genre: 'Science', year: 2010 },

  // Business & Technology
  { title: 'The Lean Startup', author: 'Eric Ries', genre: 'Business', year: 2011 },
  { title: 'Good to Great', author: 'Jim Collins', genre: 'Business', year: 2001 },
  { title: 'The Innovator\'s Dilemma', author: 'Clayton Christensen', genre: 'Business', year: 1997 },
  { title: 'Zero to One', author: 'Peter Thiel', genre: 'Business', year: 2014 },
  { title: 'The Hard Thing About Hard Things', author: 'Ben Horowitz', genre: 'Business', year: 2014 },
  { title: 'Clean Code', author: 'Robert C. Martin', genre: 'Programming', year: 2008 },
  { title: 'The Pragmatic Programmer', author: 'Andrew Hunt, David Thomas', genre: 'Programming', year: 1999 },
  { title: 'Design Patterns', author: 'Gang of Four', genre: 'Programming', year: 1994 },
  { title: 'You Don\'t Know JS', author: 'Kyle Simpson', genre: 'Programming', year: 2014 },
  { title: 'Introduction to Algorithms', author: 'Cormen et al.', genre: 'Computer Science', year: 2009 },

  // Historical Fiction
  { title: 'All Quiet on the Western Front', author: 'Erich Maria Remarque', genre: 'Historical Fiction', year: 1929 },
  { title: 'The Pillars of the Earth', author: 'Ken Follett', genre: 'Historical Fiction', year: 1989 },
  { title: 'Gone with the Wind', author: 'Margaret Mitchell', genre: 'Historical Fiction', year: 1936 },
  { title: 'The Other Boleyn Girl', author: 'Philippa Gregory', genre: 'Historical Fiction', year: 2001 },
  { title: 'Cold Mountain', author: 'Charles Frazier', genre: 'Historical Fiction', year: 1997 },
  { title: 'The Help', author: 'Kathryn Stockett', genre: 'Historical Fiction', year: 2009 },
  { title: 'Memoirs of a Geisha', author: 'Arthur Golden', genre: 'Historical Fiction', year: 1997 },
  { title: 'The Nightingale', author: 'Kristin Hannah', genre: 'Historical Fiction', year: 2015 },
  { title: 'Water for Elephants', author: 'Sara Gruen', genre: 'Historical Fiction', year: 2006 },
  { title: 'The Tattooist of Auschwitz', author: 'Heather Morris', genre: 'Historical Fiction', year: 2018 },

  // Horror
  { title: 'The Shining', author: 'Stephen King', genre: 'Horror', year: 1977 },
  { title: 'Dracula', author: 'Bram Stoker', genre: 'Horror', year: 1897 },
  { title: 'Frankenstein', author: 'Mary Shelley', genre: 'Horror', year: 1818 },
  { title: 'The Exorcist', author: 'William Peter Blatty', genre: 'Horror', year: 1971 },
  { title: 'Pet Sematary', author: 'Stephen King', genre: 'Horror', year: 1983 },
  { title: 'The Haunting of Hill House', author: 'Shirley Jackson', genre: 'Horror', year: 1959 },
  { title: 'Interview with the Vampire', author: 'Anne Rice', genre: 'Horror', year: 1976 },
  { title: 'World War Z', author: 'Max Brooks', genre: 'Horror', year: 2006 },
  { title: 'The Stand', author: 'Stephen King', genre: 'Horror', year: 1978 },
  { title: 'Something Wicked This Way Comes', author: 'Ray Bradbury', genre: 'Horror', year: 1962 },

  // Young Adult
  { title: 'The Hunger Games', author: 'Suzanne Collins', genre: 'Young Adult', year: 2008 },
  { title: 'Divergent', author: 'Veronica Roth', genre: 'Young Adult', year: 2011 },
  { title: 'The Maze Runner', author: 'James Dashner', genre: 'Young Adult', year: 2009 },
  { title: 'Percy Jackson: The Lightning Thief', author: 'Rick Riordan', genre: 'Young Adult', year: 2005 },
  { title: 'The Perks of Being a Wallflower', author: 'Stephen Chbosky', genre: 'Young Adult', year: 1999 },
  { title: 'Thirteen Reasons Why', author: 'Jay Asher', genre: 'Young Adult', year: 2007 },
  { title: 'Looking for Alaska', author: 'John Green', genre: 'Young Adult', year: 2005 },
  { title: 'The Outsiders', author: 'S.E. Hinton', genre: 'Young Adult', year: 1967 },
  { title: 'Holes', author: 'Louis Sachar', genre: 'Young Adult', year: 1998 },
  { title: 'Wonder', author: 'R.J. Palacio', genre: 'Young Adult', year: 2012 },

  // Classics
  { title: 'Moby Dick', author: 'Herman Melville', genre: 'Classics', year: 1851 },
  { title: 'War and Peace', author: 'Leo Tolstoy', genre: 'Classics', year: 1869 },
  { title: 'Crime and Punishment', author: 'Fyodor Dostoevsky', genre: 'Classics', year: 1866 },
  { title: 'The Odyssey', author: 'Homer', genre: 'Classics', year: -800 },
  { title: 'Don Quixote', author: 'Miguel de Cervantes', genre: 'Classics', year: 1605 },
  { title: 'Wuthering Heights', author: 'Emily Brontë', genre: 'Classics', year: 1847 },
  { title: 'Great Expectations', author: 'Charles Dickens', genre: 'Classics', year: 1861 },
  { title: 'The Count of Monte Cristo', author: 'Alexandre Dumas', genre: 'Classics', year: 1844 },
  { title: 'Les Misérables', author: 'Victor Hugo', genre: 'Classics', year: 1862 },
  { title: 'Anna Karenina', author: 'Leo Tolstoy', genre: 'Classics', year: 1877 },

  // Biography
  { title: 'Steve Jobs', author: 'Walter Isaacson', genre: 'Biography', year: 2011 },
  { title: 'Einstein: His Life and Universe', author: 'Walter Isaacson', genre: 'Biography', year: 2007 },
  { title: 'The Autobiography of Malcolm X', author: 'Malcolm X, Alex Haley', genre: 'Biography', year: 1965 },
  { title: 'Long Walk to Freedom', author: 'Nelson Mandela', genre: 'Biography', year: 1994 },
  { title: 'My Story', author: 'Julia Gillard', genre: 'Biography', year: 2014 },
  { title: 'Open', author: 'Andre Agassi', genre: 'Biography', year: 2009 },
  { title: 'Kitchen Confidential', author: 'Anthony Bourdain', genre: 'Biography', year: 2000 },
  { title: 'Born a Crime', author: 'Trevor Noah', genre: 'Biography', year: 2016 },
  { title: 'The Glass Castle', author: 'Jeannette Walls', genre: 'Biography', year: 2005 },
  { title: 'Wild', author: 'Cheryl Strayed', genre: 'Biography', year: 2012 },

  // Philosophy & Religion
  { title: 'Meditations', author: 'Marcus Aurelius', genre: 'Philosophy', year: 180 },
  { title: 'The Republic', author: 'Plato', genre: 'Philosophy', year: -380 },
  { title: 'Thus Spoke Zarathustra', author: 'Friedrich Nietzsche', genre: 'Philosophy', year: 1883 },
  { title: 'Being and Time', author: 'Martin Heidegger', genre: 'Philosophy', year: 1927 },
  { title: 'The Art of War', author: 'Sun Tzu', genre: 'Philosophy', year: -500 },
  { title: 'The Tao of Physics', author: 'Fritjof Capra', genre: 'Philosophy', year: 1975 },
  { title: 'Siddhartha', author: 'Hermann Hesse', genre: 'Philosophy', year: 1922 },
  { title: 'The Alchemist', author: 'Paulo Coelho', genre: 'Philosophy', year: 1988 },
  { title: 'Man\'s Search for Meaning', author: 'Viktor Frankl', genre: 'Philosophy', year: 1946 },
  { title: 'The Power of Now', author: 'Eckhart Tolle', genre: 'Philosophy', year: 1997 },

  // Health & Fitness
  { title: 'The China Study', author: 'T. Colin Campbell', genre: 'Health', year: 2005 },
  { title: 'How Not to Die', author: 'Michael Greger', genre: 'Health', year: 2015 },
  { title: 'The 4-Hour Body', author: 'Tim Ferriss', genre: 'Health', year: 2010 },
  { title: 'Born to Run', author: 'Christopher McDougall', genre: 'Health', year: 2009 },
  { title: 'Grain Brain', author: 'David Perlmutter', genre: 'Health', year: 2013 },
  { title: 'The Blue Zones', author: 'Dan Buettner', genre: 'Health', year: 2008 },
  { title: 'Why We Sleep', author: 'Matthew Walker', genre: 'Health', year: 2017 },
  { title: 'The Obesity Code', author: 'Jason Fung', genre: 'Health', year: 2016 },
  { title: 'Mindful Eating', author: 'Jan Chozen Bays', genre: 'Health', year: 2009 },
  { title: 'The Complete Guide to Fasting', author: 'Jason Fung', genre: 'Health', year: 2016 },

  // Travel
  { title: 'On the Road', author: 'Jack Kerouac', genre: 'Travel', year: 1957 },
  { title: 'Into the Wild', author: 'Jon Krakauer', genre: 'Travel', year: 1996 },
  { title: 'A Walk in the Woods', author: 'Bill Bryson', genre: 'Travel', year: 1998 },
  { title: 'Eat, Pray, Love', author: 'Elizabeth Gilbert', genre: 'Travel', year: 2006 },
  { title: 'The Beach', author: 'Alex Garland', genre: 'Travel', year: 1996 },
  { title: 'In a Sunburned Country', author: 'Bill Bryson', genre: 'Travel', year: 2000 },
  { title: 'The Art of Travel', author: 'Alain de Botton', genre: 'Travel', year: 2002 },
  { title: 'Wild: From Lost to Found', author: 'Cheryl Strayed', genre: 'Travel', year: 2012 },
  { title: 'The Great Railway Bazaar', author: 'Paul Theroux', genre: 'Travel', year: 1975 },
  { title: 'Vagabonding', author: 'Rolf Potts', genre: 'Travel', year: 2003 },

  // Poetry
  { title: 'Leaves of Grass', author: 'Walt Whitman', genre: 'Poetry', year: 1855 },
  { title: 'The Waste Land', author: 'T.S. Eliot', genre: 'Poetry', year: 1922 },
  { title: 'Howl and Other Poems', author: 'Allen Ginsberg', genre: 'Poetry', year: 1956 },
  { title: 'The Road Not Taken', author: 'Robert Frost', genre: 'Poetry', year: 1916 },
  { title: 'Ariel', author: 'Sylvia Plath', genre: 'Poetry', year: 1965 },
  { title: 'The Sun Rising', author: 'John Donne', genre: 'Poetry', year: 1633 },
  { title: 'Songs of Innocence', author: 'William Blake', genre: 'Poetry', year: 1789 },
  { title: 'Paradise Lost', author: 'John Milton', genre: 'Poetry', year: 1667 },
  { title: 'The Raven', author: 'Edgar Allan Poe', genre: 'Poetry', year: 1845 },
  { title: 'Milk and Honey', author: 'Rupi Kaur', genre: 'Poetry', year: 2014 }
];

(async () => {
  try {
    console.log('🔗 Connecting to database...');
    await connectDB();
    
    console.log('🗑️ Clearing existing books...');
    await Book.deleteMany({});
    
    console.log(`📚 Adding ${books.length} books to database...`);
    await Book.insertMany(books);
    
    console.log('✅ Successfully seeded database with books!');
    console.log(`📊 Total books added: ${books.length}`);
    
    // Show genre breakdown
    const genres = [...new Set(books.map(book => book.genre))];
    console.log(`🏷️ Genres available: ${genres.length}`);
    genres.forEach(genre => {
      const count = books.filter(book => book.genre === genre).length;
      console.log(`  - ${genre}: ${count} books`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
});
