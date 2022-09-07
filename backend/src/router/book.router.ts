import express from 'express'
import {BooksController} from '../controller/books.controller'

const bookRouter = express.Router();

bookRouter.route('/take').post(
    (req, res)=> new BooksController().take(req, res)
)


export default bookRouter;
