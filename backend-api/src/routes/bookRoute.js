const express = require('express')
const bookController = require('../controllers/bookController')

const router = express.Router()

module.exports.setup = (app) => {
    
    app.use('/api/v1/book', router)

    // Get user data api routes
    /**
     * @swagger
     * /book/{category}:
     *   get:
     *     summary: Get books by category
     *     description: Retrieve a list of books by category
     *     tags: 
     *       - Books
     *     parameters:
     *       - in: path
     *         name: category
     *         required: true
     *         schema:
     *           type: string
     *         description: The category of the books to retrieve
     *     responses:
     *       200:
     *         description: A list of books
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: integer
     *                   title:
     *                     type: string
     *                   author:
     *                     type: string
     *       404:
     *         description: Books not found
     */
    router.get('/:category', bookController.getBooksByCategory);
    
    /**
     * @swagger
     * /book/search/{name}:
     *   get:
     *     summary: Search books by name
     *     description: Search for books by a part of their name
     *     tags: 
     *       - Books
     *     parameters:
     *       - in: path
     *         name: name
     *         required: true
     *         schema:
     *           type: string
     *         description: The name of the book to search for
     *     responses:
     *       200:
     *         description: A list of books matching the search criteria
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: integer
     *                   title:
     *                     type: string
     *                   author:
     *                     type: string
     *       404:
     *         description: Books not found
     */
    router.get('/search/:name', bookController.searchBooksByName);
}
