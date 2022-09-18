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
    },
    type: {
        type: Number,
        required: true
    },
    photo: {
        type: String
    },
    taken: {
        type: Number
    },
    blocked: {
        type: Boolean,
        // default: false
    }
})

const UserModel = mongoose.model('UserModel', User, 'users');
const ReviewModel = mongoose.model('ReviewModel', User, 'review')

export  { UserModel, ReviewModel};