import mongoose from "mongoose";

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
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
        //treba mi i potvrda da bude dobar format? to mozda ne ovde
    },
    address: {
        type: String,
        required: true
    }, 
    phone: {
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    type: {
        type: Number,
        required: true
    },
    photo: {
        data:Buffer,
        contentType: String
    }
    //what to do with photo???
})

export default mongoose.model('UserModel', User, 'users');