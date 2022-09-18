import express from "express"
import { TakenModel } from "../model/taken";
import { CommentModel } from "../model/comment";
import { BookModel } from "../model/book";


export class CommentController {
    canComment = (req: express.Request, res: express.Response) => {
        CommentModel.find({ 'user': req.body.user.username, 'book': req.body.book._id }, (err, comm) => {
            if (err) {
                console.log(err);
            }
            else if (comm.length==0) {
                TakenModel.find({ 'user': req.body.user._id, 'book': req.body.book._id  }, (err, books) => {
                    if (err) console.log(err);
                    else {
                        if (books.length!=0){
                            res.json({ "message": "true" });
                        }
                        else {
                            res.json({ "message": "false" });
                        }
                    }})

            } else {
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
        comment.save().then(resp=>{
            BookModel.updateOne({ '_id': req.body.book._id }, { $inc: { 'review': 1 } }, (err, user) => {
                if (err) console.log(err);
            });
            BookModel.updateOne({ '_id': req.body.book._id }, { $inc: { 'score': req.body.grade } }, (err, user) => {
                if (err) console.log(err);
            });
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