import express from 'express'
import { UserController } from '../controller/user.controller';

const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res)=> new UserController().login(req, res)
)

export default userRouter;
