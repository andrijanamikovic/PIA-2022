import express from "express"
import UserModel from "../model/user";

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
    //let user = new UserModel(req.body) samo ako su polja isto nazvana u bazi u body

    // register = (req: express.Request, res: express.Response) => {
    //     let user = new UserModel({
    //         firstname: req.body.firstname,
    //         lastname: req.body.lastname,
    //         username: req.body.username,
    //         password: req.body.password,
    //         type: req.body.type
    //     })
    //     user.save().then(resp=>{
    //         res.json({"message": "ok"});
    //     }).catch(err=>{
    //         console.log(err);
    //         res.status(400).json({"message": "ok"});
    //     })
    // }
}