import express from "express"
import { imageModel } from "../model/image";
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
        
        // var imgModel = new imageModel();
        // var fs = require('fs');
        // var path = require('path');
        // var newImg = fs.readFileSync(req.body.photo);
        // // encode the file as a base64 string.
        // var encImg = newImg.toString('base64');
        // // define your new document
        // var newItem = {
        //     description: req.body.description,
        //     contentType: String,
        //     size: req.body.photo.size,
        //     img: new Buffer(encImg, 'base64')
        // };
    
        // imgModel.insert(newItem)
        //     .then(function() {
        //         console.log('image inserted!');
        //     });
        
        let review  = new ReviewModel(req.body);

        // res.send('yo');
        review.save().then(resp=>{
            res.json({"message": "ok"});
        }).catch(err=>{
            console.log(err);
            res.json({"message": "ok"});
        })
    }

    changePassword = (req: express.Request, res: express.Response) => {
        console.log(req.body.User.username);
        console.log( req.body.newPassoword);

        UserModel.updateOne({ 'username': req.body.User.username}, {$set: {'password': req.body.newPassoword}}, (err, user) => {
            if (err) console.log(err);
            else res.json({'message':'updated'});
        })
    }

}