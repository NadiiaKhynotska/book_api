const express = require('express');
const fsService = require("../services/fs.service");
const router = express.Router();

// Отримання списку всіх книг
router.get('/', async (req, res) => {
    const books = await fsService.reader()
    return res.status(200).json(books);
});

// Отримання інформації про конкретну книгу
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const books = await fsService.reader()

        const book = books.find(book => book.id === Number(id))
        if (!book) {
           throw new Error('Book not found')
        }
        return res. status(200).json(book)
    } catch (e) {
        res.status(404).json(e.message)
    }
});

// Створення нової книги
router.post('/', async (req, res) => {
    try {
        const {title, author, year} = req.body
        if (!title || title.length <= 2) {
            throw new Error(`incorrect tittle = ${title}`);
        }
        if (!author || author.length <= 2) {
            throw new Error(`incorrect author = ${author}`);
        }
        if (!year || year > new Date().getFullYear()) {
            throw new Error(`invalid value of year = ${year}`);
        }

        const books = await fsService.reader();

        const lasId = books[books.length - 1].id

        const newBook = {id: lasId + 1, title, author, year}
        books.push(newBook)
        await fsService.writer(books)
        res.status(201).json(newBook)
    } catch (e) {
        res.status(400).json(e.message)
    }
})

// Видалення книги
router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;

        const books = await fsService.reader();

        const index = books.findIndex(book => book.id === Number(id))
        if (index === -1) {
            throw new Error('Book not found')
        }
        books.splice(index, 1);

        await fsService.writer(books);

        res.sendStatus(204);
    } catch (e) {
        res.status(404).json(e.message);
    }
});

module.exports = router;
