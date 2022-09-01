import express from "express"
import {BookModel } from "../model/book";


export class BooksController {
    getAllBooksSorted = (req: express.Request, res: express.Response)=>{
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
};