import express, { response } from "express"
import { UserModel, ReviewModel } from "../model/user";

export class UserController {
    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;
        UserModel.findOne({ 'username': username, 'password': password }, (err, user) => {
            if (err) {
                console.log(err);
            }
            else res.json(user);
        })
    }
    message: string;
    register = (req: express.Request, res: express.Response) => {

        let user = new UserModel(req.body);
        console.log("files? ", req);
        //check if someone already have that username or email
        UserModel.findOne({ 'username': user.username }, (err, user2) => {
            if (err) {
                console.log(err);
            } else if (user2) {
                res.json({ "message": "username" })
            }
        })

        UserModel.findOne({ 'email': user.username }, (err, user2) => {
            if (err) {
                console.log(err);
            } else if (user2) {
                res.json({ "message": "email" })
            }
        })

        let review = new ReviewModel(req.body);

        review.save().then(resp => {
            res.json({ "message": "ok" });
        }).catch(err => {
            console.log(err);
            res.json({ "message": "ok" });
        })
    }

    changePassword = (req: express.Request, res: express.Response) => {
        UserModel.updateOne({ 'username': req.body.User.username }, { $set: { 'password': req.body.newPassoword } }, (err, user) => {
            if (err) console.log(err);
            else res.json({ 'message': 'updated' });
        })
    }

    getAll = (req: express.Request, res: express.Response) => {
        UserModel.find({}, (err, news) => {
            if (err) console.log(err);
            else res.json(news);
        })
    }

    delete = (req: express.Request, res: express.Response) => {
        UserModel.deleteOne({ 'username': req.body.username }, (err, userData) => {
            if (err) console.log(err);
            else res.json("ok");
        })
    }

    edit = (req: express.Request, res: express.Response) => {
        UserModel.updateOne({ 'username': req.body.username }, {
            $set: {
                'firstname': req.body.firstname, 'lastname': req.body.lastname,
                'phone': req.body.phone, 'email': req.body.email, 'address': req.body.address, 'photo': req.body.photo,
                'type': req.body.type
            }
        }, (err, user) => {
            if (err) console.log(err);
            else res.json({ 'message': 'ok' });
        })
    }

    block = (req: express.Request, res: express.Response) => {
        UserModel.updateOne({ 'username': req.body.username }, {
            $set: {
                'blocked': req.body.block
            }
        }, (err, user) => {
            if (err) console.log(err);
            else res.json({ 'message': 'ok' });
        })
    }

}