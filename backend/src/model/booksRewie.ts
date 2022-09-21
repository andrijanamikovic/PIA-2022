import mongoose, { model } from "mongoose";

const Schema = mongoose.Schema;

let BookReview = new Schema({
    user: {
        type:String
    },
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
    // pages: {
    //     type: Number,
    //     required: true
    // },
    genre:{
        type: String
    },
    language: {
        type: String
    },
    borrowed: {
       type: Number,
       default: 0
    },
    score: {
        type:Number
    },
    amount: {
        type: Number
    },
    review: {
        type: Number,
        default: 0
    }, 
    photo: {
        type: String,
        default: ""
    }
})

// const BookModel =mongoose.model('BookModel', Book, 'books');
const ReviewBookModel =mongoose.model('BookReview', BookReview, 'reviewBooks');

export  { ReviewBookModel };