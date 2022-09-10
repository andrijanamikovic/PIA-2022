import mongoose, { model } from "mongoose";

const Schema = mongoose.Schema;

let Days = new Schema({
   days:{
    type: Number,
    default: 14
   }
})

const DaysModel =mongoose.model('DaysModel', Days, 'days');

export  { DaysModel};