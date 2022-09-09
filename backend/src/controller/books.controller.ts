import express, { response } from "express"
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
        TakenModel.find({ 'user': req.body.user._id, 'back': 'false', 'book':  req.body.book._id }, (err, data) =>{
            if (err) console.log(err);
            if (data != null) {
                res.json({ "message": "already taken" });
                return;
            } else {
            taken.save().then(resp => {
                BookModel.updateOne({ '_id': req.body.book }, { $inc: { 'borrowed': 1 } }, (err, user) => {
                    if (err) console.log(err);
                })
                UserModel.updateOne({ '_id': req.body.user }, { $inc: { 'taken': 1 } }, (err, user) => {
                    if (err) console.log(err);
                })
                res.json({ "message": "ok" });
            })
            }
        }).clone();;
            
    }

    borrowed = (req: express.Request, res: express.Response) => {
        TakenModel.find({ 'user': req.body.user._id, 'back': 'false' }, (err, books) => {
            if (err) console.log(err);
            else {
                let id = [];
                books.forEach(book => {
                    id.push(book.book);
                })
                BookModel.find({ _id: { $in: id } }, (err, current) => {
                    if (err) console.log(err);
                    else {
                        // console.log(current);
                        //tu mogu da spakujem to i datum vracanja nekako 
                        res.json(current);
                    }
                });
            }

        }).clone().catch(function (err) { console.log(err) });
    }


    taken = (req: express.Request, res: express.Response) => {
        // console.log("taken");
        TakenModel.find({ 'user': req.body.user._id, 'back': 'false' }, (err, books) => {
            if (err) console.log(err);
            else {
                // console.log(books);
                res.json(books);
            }
        });
    }

    back = (req: express.Request, res: express.Response) => {
        let now = Date.now();
        TakenModel.updateOne({ 'user': req.body.user._id, 'back': 'false', 'book':  req.body.book._id } , { $set: { 'back': 'true' }}, (err, user) => {
            if (err) console.log(err);
        });
        TakenModel.updateOne({ 'user': req.body.user._id, 'book':  req.body.book._id } , { $set: { 'dateBack': now }}, (err, user) => {
            if (err) console.log(err);
        });
        // console.log("Nadjena knjiga koju ocu da izbacim...");
        BookModel.updateOne({ '_id': req.body.book._id }, { $inc: { 'borrowed': -1 } }, (err, user) => {
            if (err) console.log(err);
        });
        UserModel.updateOne({ '_id': req.body.user._id }, { $inc: { 'taken': -1 } }, (err, user) => {
            if (err) console.log(err);
        });
        res.json({ "message": "ok" });
    }

    returned = (req: express.Request, res: express.Response) => {
        let now = Date.now();
        TakenModel.find({ 'user': req.body.user._id, 'back': 'true' },  (err, data) => {
            if (err) console.log(err);
            else res.json(data);
        });
    }

    returnedBooks = (req: express.Request, res: express.Response) => {
        TakenModel.find({ 'user': req.body.user._id, 'back': 'true' }, (err, books) => {
            if (err) console.log(err);
            else {
                let id = [];
                books.forEach(book => {
                    id.push(book.book);
                })
                BookModel.find({ _id: { $in: id } }, (err, current) => {
                    if (err) console.log(err);
                    else {
                        res.json(current);
                    }
                });
            }

        }).clone().catch(function (err) { console.log(err) });
    }


};
