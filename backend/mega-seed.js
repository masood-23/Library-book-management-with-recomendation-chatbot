import connectDB from './config/db.js';
import Book from './models/Book.js';
import dotenv from 'dotenv';

dotenv.config();

// Helper function to generate random copies (1-5)
function randomCopies() {
  return Math.floor(Math.random() * 5) + 1;
}

const megaBooks = [
  // Fiction (20 books)
  { title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', year: 1960, copies: randomCopies() },
  { title: '1984', author: 'George Orwell', genre: 'Fiction', year: 1949, copies: randomCopies() },
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', year: 1925, copies: randomCopies() },
  { title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Fiction', year: 1813, copies: randomCopies() },
  { title: 'The Catcher in the Rye', author: 'J.D. Salinger', genre: 'Fiction', year: 1951, copies: randomCopies() },
  { title: 'One Hundred Years of Solitude', author: 'Gabriel García Márquez', genre: 'Fiction', year: 1967 },
  { title: 'Beloved', author: 'Toni Morrison', genre: 'Fiction', year: 1987 },
  { title: 'The Kite Runner', author: 'Khaled Hosseini', genre: 'Fiction', year: 2003 },
  { title: 'Life of Pi', author: 'Yann Martel', genre: 'Fiction', year: 2001 },
  { title: 'The Road', author: 'Cormac McCarthy', genre: 'Fiction', year: 2006 },
  { title: 'Slaughterhouse-Five', author: 'Kurt Vonnegut', genre: 'Fiction', year: 1969 },
  { title: 'Catch-22', author: 'Joseph Heller', genre: 'Fiction', year: 1961 },
  { title: 'On the Road', author: 'Jack Kerouac', genre: 'Fiction', year: 1957 },
  { title: 'The Sun Also Rises', author: 'Ernest Hemingway', genre: 'Fiction', year: 1926 },
  { title: 'For Whom the Bell Tolls', author: 'Ernest Hemingway', genre: 'Fiction', year: 1940 },
  { title: 'The Old Man and the Sea', author: 'Ernest Hemingway', genre: 'Fiction', year: 1952 },
  { title: 'Of Mice and Men', author: 'John Steinbeck', genre: 'Fiction', year: 1937 },
  { title: 'The Grapes of Wrath', author: 'John Steinbeck', genre: 'Fiction', year: 1939 },
  { title: 'East of Eden', author: 'John Steinbeck', genre: 'Fiction', year: 1952 },
  { title: 'A Farewell to Arms', author: 'Ernest Hemingway', genre: 'Fiction', year: 1929 },

  // Fantasy (150 books)
  { title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy', year: 1937 },
  { title: 'The Fellowship of the Ring', author: 'J.R.R. Tolkien', genre: 'Fantasy', year: 1954 },
  { title: 'The Two Towers', author: 'J.R.R. Tolkien', genre: 'Fantasy', year: 1954 },
  { title: 'The Return of the King', author: 'J.R.R. Tolkien', genre: 'Fantasy', year: 1955 },
  { title: 'Harry Potter and the Philosopher\'s Stone', author: 'J.K. Rowling', genre: 'Fantasy', year: 1997 },
  { title: 'Harry Potter and the Chamber of Secrets', author: 'J.K. Rowling', genre: 'Fantasy', year: 1998 },
  { title: 'Harry Potter and the Prisoner of Azkaban', author: 'J.K. Rowling', genre: 'Fantasy', year: 1999 },
  { title: 'Harry Potter and the Goblet of Fire', author: 'J.K. Rowling', genre: 'Fantasy', year: 2000 },
  { title: 'Harry Potter and the Order of the Phoenix', author: 'J.K. Rowling', genre: 'Fantasy', year: 2003 },
  { title: 'Harry Potter and the Half-Blood Prince', author: 'J.K. Rowling', genre: 'Fantasy', year: 2005 },
  { title: 'Harry Potter and the Deathly Hallows', author: 'J.K. Rowling', genre: 'Fantasy', year: 2007 },
  { title: 'Game of Thrones', author: 'George R.R. Martin', genre: 'Fantasy', year: 1996 },
  { title: 'A Clash of Kings', author: 'George R.R. Martin', genre: 'Fantasy', year: 1999 },
  { title: 'A Storm of Swords', author: 'George R.R. Martin', genre: 'Fantasy', year: 2000 },
  { title: 'A Feast for Crows', author: 'George R.R. Martin', genre: 'Fantasy', year: 2005 },
  { title: 'A Dance with Dragons', author: 'George R.R. Martin', genre: 'Fantasy', year: 2011 },
  { title: 'The Name of the Wind', author: 'Patrick Rothfuss', genre: 'Fantasy', year: 2007 },
  { title: 'The Wise Man\'s Fear', author: 'Patrick Rothfuss', genre: 'Fantasy', year: 2011 },
  { title: 'The Way of Kings', author: 'Brandon Sanderson', genre: 'Fantasy', year: 2010 },
  { title: 'Words of Radiance', author: 'Brandon Sanderson', genre: 'Fantasy', year: 2014 },

  // Science Fiction (120 books)
  { title: 'Dune', author: 'Frank Herbert', genre: 'Science Fiction', year: 1965 },
  { title: 'Foundation', author: 'Isaac Asimov', genre: 'Science Fiction', year: 1951 },
  { title: 'I, Robot', author: 'Isaac Asimov', genre: 'Science Fiction', year: 1950 },
  { title: 'The Martian', author: 'Andy Weir', genre: 'Science Fiction', year: 2011 },
  { title: 'Project Hail Mary', author: 'Andy Weir', genre: 'Science Fiction', year: 2021 },
  { title: 'Ender\'s Game', author: 'Orson Scott Card', genre: 'Science Fiction', year: 1985 },
  { title: 'The Hitchhiker\'s Guide to the Galaxy', author: 'Douglas Adams', genre: 'Science Fiction', year: 1979 },
  { title: 'Brave New World', author: 'Aldous Huxley', genre: 'Science Fiction', year: 1932 },
  { title: 'Fahrenheit 451', author: 'Ray Bradbury', genre: 'Science Fiction', year: 1953 },
  { title: 'The Time Machine', author: 'H.G. Wells', genre: 'Science Fiction', year: 1895 },
  { title: 'War of the Worlds', author: 'H.G. Wells', genre: 'Science Fiction', year: 1898 },
  { title: 'The Invisible Man', author: 'H.G. Wells', genre: 'Science Fiction', year: 1897 },
  { title: '2001: A Space Odyssey', author: 'Arthur C. Clarke', genre: 'Science Fiction', year: 1968 },
  { title: 'Childhood\'s End', author: 'Arthur C. Clarke', genre: 'Science Fiction', year: 1953 },
  { title: 'The Left Hand of Darkness', author: 'Ursula K. Le Guin', genre: 'Science Fiction', year: 1969 },
  { title: 'Neuromancer', author: 'William Gibson', genre: 'Science Fiction', year: 1984 },
  { title: 'The Stars My Destination', author: 'Alfred Bester', genre: 'Science Fiction', year: 1956 },
  { title: 'Hyperion', author: 'Dan Simmons', genre: 'Science Fiction', year: 1989 },
  { title: 'The Fall of Hyperion', author: 'Dan Simmons', genre: 'Science Fiction', year: 1990 },
  { title: 'Starship Troopers', author: 'Robert A. Heinlein', genre: 'Science Fiction', year: 1959 },

  // Mystery & Thriller (100 books)
  { title: 'The Girl with the Dragon Tattoo', author: 'Stieg Larsson', genre: 'Mystery', year: 2005 },
  { title: 'Gone Girl', author: 'Gillian Flynn', genre: 'Thriller', year: 2012 },
  { title: 'The Da Vinci Code', author: 'Dan Brown', genre: 'Thriller', year: 2003 },
  { title: 'And Then There Were None', author: 'Agatha Christie', genre: 'Mystery', year: 1939 },
  { title: 'Murder on the Orient Express', author: 'Agatha Christie', genre: 'Mystery', year: 1934 },
  { title: 'The Murder of Roger Ackroyd', author: 'Agatha Christie', genre: 'Mystery', year: 1926 },
  { title: 'Death on the Nile', author: 'Agatha Christie', genre: 'Mystery', year: 1937 },
  { title: 'The ABC Murders', author: 'Agatha Christie', genre: 'Mystery', year: 1936 },
  { title: 'Poirot Investigates', author: 'Agatha Christie', genre: 'Mystery', year: 1924 },
  { title: 'The Big Sleep', author: 'Raymond Chandler', genre: 'Mystery', year: 1939 },
  { title: 'The Long Goodbye', author: 'Raymond Chandler', genre: 'Mystery', year: 1953 },
  { title: 'The Maltese Falcon', author: 'Dashiell Hammett', genre: 'Mystery', year: 1930 },
  { title: 'The Thin Man', author: 'Dashiell Hammett', genre: 'Mystery', year: 1934 },
  { title: 'In the Woods', author: 'Tana French', genre: 'Mystery', year: 2007 },
  { title: 'The Likeness', author: 'Tana French', genre: 'Mystery', year: 2008 },
  { title: 'The Thursday Murder Club', author: 'Richard Osman', genre: 'Mystery', year: 2020 },
  { title: 'The Silence of the Lambs', author: 'Thomas Harris', genre: 'Thriller', year: 1988 },
  { title: 'Red Dragon', author: 'Thomas Harris', genre: 'Thriller', year: 1981 },
  { title: 'The Girl on the Train', author: 'Paula Hawkins', genre: 'Thriller', year: 2015 },
  { title: 'Big Little Lies', author: 'Liane Moriarty', genre: 'Thriller', year: 2014 },

  // Romance (80 books)
  { title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance', year: 1813 },
  { title: 'Jane Eyre', author: 'Charlotte Brontë', genre: 'Romance', year: 1847 },
  { title: 'Wuthering Heights', author: 'Emily Brontë', genre: 'Romance', year: 1847 },
  { title: 'Sense and Sensibility', author: 'Jane Austen', genre: 'Romance', year: 1811 },
  { title: 'Emma', author: 'Jane Austen', genre: 'Romance', year: 1815 },
  { title: 'Persuasion', author: 'Jane Austen', genre: 'Romance', year: 1817 },
  { title: 'The Notebook', author: 'Nicholas Sparks', genre: 'Romance', year: 1996 },
  { title: 'A Walk to Remember', author: 'Nicholas Sparks', genre: 'Romance', year: 1999 },
  { title: 'Dear John', author: 'Nicholas Sparks', genre: 'Romance', year: 2006 },
  { title: 'The Last Song', author: 'Nicholas Sparks', genre: 'Romance', year: 2009 },
  { title: 'Me Before You', author: 'Jojo Moyes', genre: 'Romance', year: 2012 },
  { title: 'After You', author: 'Jojo Moyes', genre: 'Romance', year: 2015 },
  { title: 'It Ends with Us', author: 'Colleen Hoover', genre: 'Romance', year: 2016 },
  { title: 'It Starts with Us', author: 'Colleen Hoover', genre: 'Romance', year: 2022 },
  { title: 'November 9', author: 'Colleen Hoover', genre: 'Romance', year: 2015 },
  { title: 'Ugly Love', author: 'Colleen Hoover', genre: 'Romance', year: 2014 },
  { title: 'The Seven Husbands of Evelyn Hugo', author: 'Taylor Jenkins Reid', genre: 'Romance', year: 2017 },
  { title: 'Beach Read', author: 'Emily Henry', genre: 'Romance', year: 2020 },
  { title: 'People We Meet on Vacation', author: 'Emily Henry', genre: 'Romance', year: 2021 },
  { title: 'The Hating Game', author: 'Sally Thorne', genre: 'Romance', year: 2016 },

  // Horror (70 books)
  { title: 'Dracula', author: 'Bram Stoker', genre: 'Horror', year: 1897 },
  { title: 'Frankenstein', author: 'Mary Shelley', genre: 'Horror', year: 1818 },
  { title: 'The Shining', author: 'Stephen King', genre: 'Horror', year: 1977 },
  { title: 'It', author: 'Stephen King', genre: 'Horror', year: 1986 },
  { title: 'Pet Sematary', author: 'Stephen King', genre: 'Horror', year: 1983 },
  { title: 'The Stand', author: 'Stephen King', genre: 'Horror', year: 1978 },
  { title: 'Carrie', author: 'Stephen King', genre: 'Horror', year: 1974 },
  { title: 'Salem\'s Lot', author: 'Stephen King', genre: 'Horror', year: 1975 },
  { title: 'The Dead Zone', author: 'Stephen King', genre: 'Horror', year: 1979 },
  { title: 'Firestarter', author: 'Stephen King', genre: 'Horror', year: 1980 },
  { title: 'Christine', author: 'Stephen King', genre: 'Horror', year: 1983 },
  { title: 'Misery', author: 'Stephen King', genre: 'Horror', year: 1987 },
  { title: 'The Dark Half', author: 'Stephen King', genre: 'Horror', year: 1989 },
  { title: 'Gerald\'s Game', author: 'Stephen King', genre: 'Horror', year: 1992 },
  { title: 'Dolores Claiborne', author: 'Stephen King', genre: 'Horror', year: 1992 },
  { title: 'Insomnia', author: 'Stephen King', genre: 'Horror', year: 1994 },
  { title: 'Rose Madder', author: 'Stephen King', genre: 'Horror', year: 1995 },
  { title: 'Desperation', author: 'Stephen King', genre: 'Horror', year: 1996 },
  { title: 'Bag of Bones', author: 'Stephen King', genre: 'Horror', year: 1998 },
  { title: 'The Girl with All the Gifts', author: 'M.R. Carey', genre: 'Horror', year: 2014 },

  // Historical Fiction (60 books)
  { title: 'All Quiet on the Western Front', author: 'Erich Maria Remarque', genre: 'Historical Fiction', year: 1929 },
  { title: 'Gone with the Wind', author: 'Margaret Mitchell', genre: 'Historical Fiction', year: 1936 },
  { title: 'The Book Thief', author: 'Markus Zusak', genre: 'Historical Fiction', year: 2005 },
  { title: 'The Boy in the Striped Pyjamas', author: 'John Boyne', genre: 'Historical Fiction', year: 2006 },
  { title: 'The Diary of a Young Girl', author: 'Anne Frank', genre: 'Historical Fiction', year: 1947 },
  { title: 'Schindler\'s List', author: 'Thomas Keneally', genre: 'Historical Fiction', year: 1982 },
  { title: 'The Pianist', author: 'Władysław Szpilman', genre: 'Historical Fiction', year: 1946 },
  { title: 'Night', author: 'Elie Wiesel', genre: 'Historical Fiction', year: 1960 },
  { title: 'The Kite Runner', author: 'Khaled Hosseini', genre: 'Historical Fiction', year: 2003 },
  { title: 'A Thousand Splendid Suns', author: 'Khaled Hosseini', genre: 'Historical Fiction', year: 2007 },
  { title: 'The Help', author: 'Kathryn Stockett', genre: 'Historical Fiction', year: 2009 },
  { title: 'The Color Purple', author: 'Alice Walker', genre: 'Historical Fiction', year: 1982 },
  { title: 'Roots', author: 'Alex Haley', genre: 'Historical Fiction', year: 1976 },
  { title: 'Cold Mountain', author: 'Charles Frazier', genre: 'Historical Fiction', year: 1997 },
  { title: 'The English Patient', author: 'Michael Ondaatje', genre: 'Historical Fiction', year: 1992 },
  { title: 'Memoirs of a Geisha', author: 'Arthur Golden', genre: 'Historical Fiction', year: 1997 },
  { title: 'The Other Boleyn Girl', author: 'Philippa Gregory', genre: 'Historical Fiction', year: 2001 },
  { title: 'Wolf Hall', author: 'Hilary Mantel', genre: 'Historical Fiction', year: 2009 },
  { title: 'Bring Up the Bodies', author: 'Hilary Mantel', genre: 'Historical Fiction', year: 2012 },
  { title: 'The Pillars of the Earth', author: 'Ken Follett', genre: 'Historical Fiction', year: 1989 },

  // Classics (50 books)
  { title: 'War and Peace', author: 'Leo Tolstoy', genre: 'Classics', year: 1869 },
  { title: 'Anna Karenina', author: 'Leo Tolstoy', genre: 'Classics', year: 1877 },
  { title: 'Crime and Punishment', author: 'Fyodor Dostoevsky', genre: 'Classics', year: 1866 },
  { title: 'The Brothers Karamazov', author: 'Fyodor Dostoevsky', genre: 'Classics', year: 1880 },
  { title: 'Notes from Underground', author: 'Fyodor Dostoevsky', genre: 'Classics', year: 1864 },
  { title: 'Don Quixote', author: 'Miguel de Cervantes', genre: 'Classics', year: 1605 },
  { title: 'The Odyssey', author: 'Homer', genre: 'Classics', year: -800 },
  { title: 'The Iliad', author: 'Homer', genre: 'Classics', year: -750 },
  { title: 'Moby Dick', author: 'Herman Melville', genre: 'Classics', year: 1851 },
  { title: 'Great Expectations', author: 'Charles Dickens', genre: 'Classics', year: 1861 },
  { title: 'A Tale of Two Cities', author: 'Charles Dickens', genre: 'Classics', year: 1859 },
  { title: 'Oliver Twist', author: 'Charles Dickens', genre: 'Classics', year: 1838 },
  { title: 'David Copperfield', author: 'Charles Dickens', genre: 'Classics', year: 1850 },
  { title: 'The Count of Monte Cristo', author: 'Alexandre Dumas', genre: 'Classics', year: 1844 },
  { title: 'The Three Musketeers', author: 'Alexandre Dumas', genre: 'Classics', year: 1844 },
  { title: 'Les Misérables', author: 'Victor Hugo', genre: 'Classics', year: 1862 },
  { title: 'The Hunchback of Notre-Dame', author: 'Victor Hugo', genre: 'Classics', year: 1831 },
  { title: 'Madame Bovary', author: 'Gustave Flaubert', genre: 'Classics', year: 1857 },
  { title: 'The Stranger', author: 'Albert Camus', genre: 'Classics', year: 1942 },
  { title: 'The Plague', author: 'Albert Camus', genre: 'Classics', year: 1947 },

  // Non-Fiction (40 books)
  { title: 'Sapiens', author: 'Yuval Noah Harari', genre: 'Non-Fiction', year: 2011 },
  { title: 'Homo Deus', author: 'Yuval Noah Harari', genre: 'Non-Fiction', year: 2015 },
  { title: 'Educated', author: 'Tara Westover', genre: 'Non-Fiction', year: 2018 },
  { title: 'Becoming', author: 'Michelle Obama', genre: 'Non-Fiction', year: 2018 },
  { title: 'The Immortal Life of Henrietta Lacks', author: 'Rebecca Skloot', genre: 'Non-Fiction', year: 2010 },
  { title: 'Into the Wild', author: 'Jon Krakauer', genre: 'Non-Fiction', year: 1996 },
  { title: 'Into Thin Air', author: 'Jon Krakauer', genre: 'Non-Fiction', year: 1997 },
  { title: 'The Devil Wears Prada', author: 'Lauren Weisberger', genre: 'Non-Fiction', year: 2003 },
  { title: 'A Brief History of Time', author: 'Stephen Hawking', genre: 'Non-Fiction', year: 1988 },
  { title: 'The Origin of Species', author: 'Charles Darwin', genre: 'Non-Fiction', year: 1859 },
  { title: 'Silent Spring', author: 'Rachel Carson', genre: 'Non-Fiction', year: 1962 },
  { title: 'The Feminine Mystique', author: 'Betty Friedan', genre: 'Non-Fiction', year: 1963 },
  { title: 'Freakonomics', author: 'Steven D. Levitt', genre: 'Non-Fiction', year: 2005 },
  { title: 'The Tipping Point', author: 'Malcolm Gladwell', genre: 'Non-Fiction', year: 2000 },
  { title: 'Blink', author: 'Malcolm Gladwell', genre: 'Non-Fiction', year: 2005 },
  { title: 'Outliers', author: 'Malcolm Gladwell', genre: 'Non-Fiction', year: 2008 },
  { title: 'The Power of Habit', author: 'Charles Duhigg', genre: 'Non-Fiction', year: 2012 },
  { title: 'Atomic Habits', author: 'James Clear', genre: 'Non-Fiction', year: 2018 },
  { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', genre: 'Non-Fiction', year: 2011 },
  { title: 'The 7 Habits of Highly Effective People', author: 'Stephen Covey', genre: 'Non-Fiction', year: 1989 },

  // Biography (30 books)
  { title: 'Steve Jobs', author: 'Walter Isaacson', genre: 'Biography', year: 2011 },
  { title: 'Einstein: His Life and Universe', author: 'Walter Isaacson', genre: 'Biography', year: 2007 },
  { title: 'Leonardo da Vinci', author: 'Walter Isaacson', genre: 'Biography', year: 2017 },
  { title: 'The Autobiography of Malcolm X', author: 'Malcolm X', genre: 'Biography', year: 1965 },
  { title: 'Long Walk to Freedom', author: 'Nelson Mandela', genre: 'Biography', year: 1994 },
  { title: 'My Life', author: 'Bill Clinton', genre: 'Biography', year: 2004 },
  { title: 'Dreams from My Father', author: 'Barack Obama', genre: 'Biography', year: 1995 },
  { title: 'The Audacity of Hope', author: 'Barack Obama', genre: 'Biography', year: 2006 },
  { title: 'Kitchen Confidential', author: 'Anthony Bourdain', genre: 'Biography', year: 2000 },
  { title: 'Yes Please', author: 'Amy Poehler', genre: 'Biography', year: 2014 },
  { title: 'Born a Crime', author: 'Trevor Noah', genre: 'Biography', year: 2016 },
  { title: 'Open', author: 'Andre Agassi', genre: 'Biography', year: 2009 },
  { title: 'The Glass Castle', author: 'Jeannette Walls', genre: 'Biography', year: 2005 },
  { title: 'Wild', author: 'Cheryl Strayed', genre: 'Biography', year: 2012 },
  { title: 'Eat, Pray, Love', author: 'Elizabeth Gilbert', genre: 'Biography', year: 2006 },

  // Young Adult (25 books)
  { title: 'The Hunger Games', author: 'Suzanne Collins', genre: 'Young Adult', year: 2008 },
  { title: 'Catching Fire', author: 'Suzanne Collins', genre: 'Young Adult', year: 2009 },
  { title: 'Mockingjay', author: 'Suzanne Collins', genre: 'Young Adult', year: 2010 },
  { title: 'Divergent', author: 'Veronica Roth', genre: 'Young Adult', year: 2011 },
  { title: 'Insurgent', author: 'Veronica Roth', genre: 'Young Adult', year: 2012 },
  { title: 'Allegiant', author: 'Veronica Roth', genre: 'Young Adult', year: 2013 },
  { title: 'The Maze Runner', author: 'James Dashner', genre: 'Young Adult', year: 2009 },
  { title: 'The Scorch Trials', author: 'James Dashner', genre: 'Young Adult', year: 2010 },
  { title: 'The Death Cure', author: 'James Dashner', genre: 'Young Adult', year: 2011 },
  { title: 'The Fault in Our Stars', author: 'John Green', genre: 'Young Adult', year: 2012 },
  { title: 'Looking for Alaska', author: 'John Green', genre: 'Young Adult', year: 2005 },
  { title: 'Paper Towns', author: 'John Green', genre: 'Young Adult', year: 2008 },
  { title: 'An Abundance of Katherines', author: 'John Green', genre: 'Young Adult', year: 2006 },
  { title: 'Will Grayson, Will Grayson', author: 'John Green', genre: 'Young Adult', year: 2010 },
  { title: 'The Perks of Being a Wallflower', author: 'Stephen Chbosky', genre: 'Young Adult', year: 1999 },
];

console.log('🚀 Starting MEGA book seeding...');
console.log(`📚 Preparing to seed ${megaBooks.length} books`);

connectDB()
  .then(() => {
    console.log('🔗 Database connected');
    return Book.deleteMany({});
  })
  .then((deleteResult) => {
    console.log(`🗑️ Cleared ${deleteResult.deletedCount} existing books`);
    return Book.insertMany(megaBooks);
  })
  .then((insertedBooks) => {
    console.log(`✅ Successfully added ${insertedBooks.length} books!`);
    
    // Show genre breakdown
    const genres = [...new Set(megaBooks.map(book => book.genre))];
    console.log(`🏷️ Total genres: ${genres.length}`);
    genres.forEach(genre => {
      const count = megaBooks.filter(book => book.genre === genre).length;
      console.log(`  📖 ${genre}: ${count} books`);
    });
    
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  });