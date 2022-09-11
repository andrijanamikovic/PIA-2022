import express from 'express'
import { CommentController } from '../controller/comment.controller';


const commentRouter = express.Router();


commentRouter.route('/canComment').post(
    (req, res)=> new CommentController().canComment(req, res)
)


commentRouter.route('/addComment').post(
    (req, res)=> new CommentController().addComment(req, res)
)


commentRouter.route('/getAll').post(
    (req, res)=> new CommentController().getAll(req, res)
)



export default commentRouter;
