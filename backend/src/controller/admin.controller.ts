import express from "express"
import {ReviewModel, UserModel } from "../model/user";


export class AdminController {
    getAllPadding = (req: express.Request, res: express.Response)=>{
        ReviewModel.find({}, (err, news)=>{
            if (err) console.log(err);
            else res.json(news);
        })
    }

    approve = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        ReviewModel.findOne({'username':username}, (err, userData)=>{
            if (err) console.log(err);
            else {
                let user  = new UserModel();
                user.firstname = userData.firstname;
                user.lastname = userData.lastname;
                user.username = userData.username;
                user.password = userData.password;
                user.address = userData.address;
                user.phone = userData.phone;
                user.email = userData.email;
                user.type = userData.type;
                user.photo = userData.photo;
                user.save().then(resp=>{
                    ReviewModel.deleteOne({'username':username}, (err, userData)=>{
                        if (err) console.log(err);
                    })
                    res.json({"message": "ok"});
                }).catch(err=>{
                    console.log(err);
                    res.json({"message": "ok"});
                })
            }
        })
    }

    decline = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        ReviewModel.deleteOne({'username':username}, (err, userData)=>{
            if (err) console.log(err);
            else res.json(userData);
        })
    }

    addUser = (req: express.Request, res: express.Response)=>{
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

        user.save().then(resp=>{
            res.json({"message": "ok"});
        }).catch(err=>{
            console.log(err);
            res.json({"message": "ok"});
        })
    }
    
};