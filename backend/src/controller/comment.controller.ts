import express from "express"
import { TakenModel } from "../model/taken";
import { CommentModel } from "../model/comment";


export class CommentController {
    canComment = (req: express.Request, res: express.Response) => {
        CommentModel.find({ 'user': req.body.user.username, 'book': req.body.book._id }, (err, comm) => {
            if (err) {
                console.log(err);
            }
            else if (comm.length==0) {
                // console.log(comm);
                TakenModel.find({ 'user': req.body.user._id, 'book': req.body.book._id  }, (err, books) => {
                    if (err) console.log(err);
                    else {
                        // console.log(books);
                        if (books.length!=0){
                            // console.log("can");
                            res.json({ "message": "true" });
                        }
                        else {
                            res.json({ "message": "false" });
                        }
                    }})

            } else {
                // console.log(comm);
                // console.log("else can't");
                res.json({ "message": "false" });
            }
        })
    }



    addComment = (req: express.Request, res: express.Response)=>{
        let data = {
            book: req.body.book._id,
            user: req.body.user.username,
            date: Date.now(),
            comment:  req.body.comment,
            grade: req.body.grade
        }
        let comment = new CommentModel(data);
        //setujem sve polako
        
        comment.save().then(resp=>{
            res.json({"message": "ok"});
        }).catch(err=>{
            console.log(err);
            res.json({"message": "error"});
        })
    }

    getAll = (req: express.Request, res: express.Response) => {
        CommentModel.find({'book': req.body.book._id }, (err, comm) => {
            if (err) {
                console.log(err);
            } else {
                res.json(comm);
            }
        })
    }
}