const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const booksRouter = require('./routes/books');
const recommendRouter = require('./routes/recommend');


const app = express();
app.use(cors());
app.use(bodyParser.json());


const PORT = process.env.PORT || 5000;


connectDB();


app.use('/api/books', booksRouter);
app.use('/api/recommend', recommendRouter);


app.get('/', (req, res) => res.json({ ok: true, msg: 'MERN Library Backend' }));


app.listen(PORT, () => console.log('Server listening on port', PORT));