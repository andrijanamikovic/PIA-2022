import express from "express"
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
    //let user = new UserModel(req.body) samo ako su polja isto nazvana u bazi u body
    message: string;
    register = (req: express.Request, res: express.Response) => {
       
        let user = new UserModel(req.body);
        //check if someone already have that username or email
        UserModel.findOne({'username': user.username}, (err, user2) => {
            if (err){
                console.log(err);
            } else if (user2){
                res.json({"message":"username"})
            }
        })

        UserModel.findOne({'email': user.username}, (err, user2) => {
            if (err){
                console.log(err);
            } else if (user2){
                res.json({"message":"email"})
            }
        })
        // I don't need to save just to send admin to review 
        let review  = new ReviewModel(req.body);
        review.save().then(resp=>{
            res.json({"message": "ok"});
        }).catch(err=>{
            console.log(err);
            res.json({"message": "ok"});
        })
    }
}