import mongoose, { model } from "mongoose";

const Schema = mongoose.Schema;

let Book = new Schema({
    title:{
        type: String,
        required: true
    },
    subtitle: {
        type: String
    },
    author: {
        type: String,
        // unique: true,
        required: true
    },
    published: {
        type: String
    },
    publisher: {
        type: String
    }, 
    pages: {
        type: Number,
        required: true
    },
    description:{
        type: String
    },
    website: {
        type: String
    },
    borrowed: {
       type: Number
    },
    score: {
        type:Number
    }
})

const BookModel =mongoose.model('BookModel', Book, 'books');

export  { BookModel};