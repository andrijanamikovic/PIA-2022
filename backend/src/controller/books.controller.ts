import express from "express"
import { TakenModel } from "../model/taken";
import {BookModel } from "../model/book";


export class BooksController {

    getAllBooksSorted =  (req: express.Request, res: express.Response)=>{
        BookModel.find({}, (err, books)=>{
            if (err) console.log(err);
            else{
                books.sort (function(a,b) {
                    return a.borrowed > b.borrowed;
                });
                // console.log(books);
                res.json(books);
            } 
        })
    }

    take = (req: express.Request, res: express.Response)=>{
        let taken = new TakenModel(req.body);
        taken.save().then(resp=>{
            BookModel.updateOne({ '_id': req.body.book}, {$inc: {'borrowed': 1}}, (err, user) => {
                if (err) console.log(err);
            })
            res.json({"message": "ok"});
        }).catch(err=>{
            console.log(err);
            res.json({"message": "ok"});
        }) 
        
       
    }
};