import express from 'express'
import {AdminController} from '../controller/admin.controller'

const adminRouter = express.Router();

adminRouter.route('/paddingRequest').get(
    (req, res)=> new AdminController().getAllPadding(req, res)
)

adminRouter.route('/approve').post(
    (req, res)=> new AdminController().approve(req, res)
)

adminRouter.route('/decline').post(
    (req, res)=> new AdminController().decline(req, res)
)

adminRouter.route('/addUser').post(
    (req, res)=> new AdminController().addUser(req, res)
)
adminRouter.route('/changeDays').post(
    (req, res)=> new AdminController().changeDays(req, res)
)
adminRouter.route('/extendDays').post(
    (req, res)=> new AdminController().extendDays(req, res)
)

export default adminRouter;
