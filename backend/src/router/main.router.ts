import express from 'express'
import {BooksController} from '../controller/books.controller'

const mainRouter = express.Router();

mainRouter.route('/topThree').get(
    (req, res)=> new BooksController().getAllBooksSorted(req, res)
)


export default mainRouter;
