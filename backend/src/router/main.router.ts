import express from 'express'
import { AdminController } from '../controller/admin.controller';
import {BooksController} from '../controller/books.controller'

const mainRouter = express.Router();

mainRouter.route('/topThree').get(
    (req, res)=> new BooksController().getAllBooksSorted(req, res)
)

mainRouter.route('/days').get(
    (req, res)=> new AdminController().getDays(req, res)
)


export default mainRouter;
