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

userRouter.route('/changePassword').post(
    (req, res)=> new UserController().changePassword(req, res)
)

userRouter.route('/getAll').get(
    (req, res)=> new UserController().getAll(req, res)
)

userRouter.route('/delete').post(
    (req, res)=> new UserController().delete(req, res)
)


userRouter.route('/edit').post(
    (req, res)=> new UserController().edit(req, res)
)

userRouter.route('/block').post(
    (req, res)=> new UserController().block(req, res)
)


export default userRouter;
