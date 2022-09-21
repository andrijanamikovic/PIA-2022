import express from 'express'
import {BooksController} from '../controller/books.controller'

const bookRouter = express.Router();

bookRouter.route('/take').post(
    (req, res)=> new BooksController().take(req, res)
)


bookRouter.route('/borrowed').post(
    (req, res)=> new BooksController().borrowed(req, res)
)


bookRouter.route('/taken').post(
    (req, res)=> new BooksController().taken(req, res)
)

bookRouter.route('/back').post(
    (req, res)=> new BooksController().back(req, res)
)

bookRouter.route('/returned').post(
    (req, res)=> new BooksController().returned(req, res)
)


bookRouter.route('/returnedBooks').post(
    (req, res)=> new BooksController().returnedBooks(req, res)
)


bookRouter.route('/delete').post(
    (req, res)=> new BooksController().delete(req, res)
)

bookRouter.route('/addBook').post(
    (req, res)=> new BooksController().addBook(req, res)
)

bookRouter.route('/edit').post(
    (req, res)=> new BooksController().editBook(req, res)
)

bookRouter.route('/extend').post(
    (req, res)=> new BooksController().extend(req, res)
)


bookRouter.route('/addBookUser').post(
    (req, res)=> new BooksController().addBookUser(req, res)
)

bookRouter.route('/paddingRequest').get(
    (req, res)=> new BooksController().getAllPadding(req, res)
)

bookRouter.route('/approve').post(
    (req, res)=> new BooksController().approve(req, res)
)

bookRouter.route('/decline').post(
    (req, res)=> new BooksController().decline(req, res)
)

export default bookRouter;
