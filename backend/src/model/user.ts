import mongoose, { model } from "mongoose";

const Schema = mongoose.Schema;

let User = new Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        // unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }, 
    phone: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        // unique: true,
        // dropDups: true
    },
    type: {
        type: Number,
        required: true
    },
    photo: {
        data:Buffer,
        type: String
    },
    taken: {
        type: Number
    }
    // ,
    // days: {
    //     type: Number
    // }
    // what to do with photo???
})

const UserModel = mongoose.model('UserModel', User, 'users');
const ReviewModel = mongoose.model('ReviewModel', User, 'review')

export  { UserModel, ReviewModel};