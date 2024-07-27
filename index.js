const express = require('express');
const dotenv = require('dotenv');
const booksRouter = require('./routes/books');

dotenv.config();
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use('/books', booksRouter);

console.log(process.env.PORT)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
