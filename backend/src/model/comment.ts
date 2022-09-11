import mongoose, { model } from "mongoose";


const Schema = mongoose.Schema;

let comment = new Schema({
    //sta treba da imam za uzete knjige??? 
    book: {
        type: String,
        required: true
    },

    user: {
        type: String,
        required: true
    },
    date: {
        type: Number,
        required: true
    },

    comment: {
        type: String,
        required: true
    },
    grade: {
        type: Number,
        required: true
    }
})


const CommentModel =mongoose.model('CommentModel', comment, 'comments');

export  {CommentModel};