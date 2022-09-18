import mongoose, { model } from "mongoose";
import { BookModel } from "./book";
import { UserModel } from "./user";

const Schema = mongoose.Schema;

let taken = new Schema({
    //sta treba da imam za uzete knjige??? 
    book: {
        type: String,
        required: true
    },

    user: {
        type: String,
        required: true
    },
    from: {
        type: Number,
        required: true
    },

    to: {
        type: Number,
        required: true
    },
    back: {
        type: Boolean,
        required: true
    },
    dateBack: {
        type: Number,
        required: true
    },
    extended: {
        type: Boolean,
        required: true
    }

})


const TakenModel =mongoose.model('TakenModel', taken, 'taken');

export  { TakenModel};