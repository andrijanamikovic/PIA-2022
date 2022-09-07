import express from "express"
import { TakenModel } from "../model/taken";
import { BookModel } from "../model/book";
import { UserModel } from "../model/user";


export class BooksController {

    getAllBooksSorted = (req: express.Request, res: express.Response) => {
        BookModel.find({}, (err, books) => {
            if (err) console.log(err);
            else {
                books.sort(function (a, b) {
                    return a.borrowed > b.borrowed;
                });
                // console.log(books);
                res.json(books);
            }
        })
    }

    take = (req: express.Request, res: express.Response) => {
        let taken = new TakenModel(req.body);
        //da proverim da li ima vec tri uzete
        if (req.body.user.taken >= 3) {
            res.json({ "message": "3 taken" });
            return;
        }
        taken.save().then(resp => {
            BookModel.updateOne({ '_id': req.body.book }, { $inc: { 'borrowed': 1 } }, (err, user) => {
                if (err) console.log(err);
            })
            UserModel.updateOne({ '_id': req.body.user }, { $inc: { 'taken': 1 } }, (err, user) => {
                if (err) console.log(err);
            })
            res.json({ "message": "ok" });
        }).catch(err => {
            console.log(err);
            res.json({ "message": "error" });
        })
    }

    borrowed = (req: express.Request, res: express.Response) => {
        TakenModel.find({ 'user': req.body.user._id, 'back':'false'}, (err, books) => {
            if (err) console.log(err);
            else {
                let id = [];
                books.forEach(book=>{
                    id.push(book.book);
                })
                    BookModel.find({ _id : { $in : id } }, (err, current) => {
                        if (err) console.log(err);
                        else {
                            // console.log(current);
                            //tu mogu da spakujem to i datum vracanja nekako 
                            res.json(current);
                        }
                    });
                }
                    
        }).clone().catch(function(err){ console.log(err)});
    }


};
