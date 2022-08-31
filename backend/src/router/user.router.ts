import express from 'express'
import { UserController } from '../controller/user.controller';

const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res)=> new UserController().login(req, res)
)

userRouter.route('/adminlogin').post(
    (req, res)=> new UserController().login(req, res)
)

userRouter.route('/register').post(
    (req, res)=> new UserController().register(req, res)
)
export default userRouter;
