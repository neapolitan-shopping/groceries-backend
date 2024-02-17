import { Schema, model } from "mongoose";
import * as mongoose from 'mongoose'


const listSchema = new Schema({
   name: {type: String, required: true},
   items: [{
      itemName: {type: String, required: true},
      checked: {type: Boolean, required: true, default: false},
      price: Number
   }],
   shareId: {type: String, required: true}
});


export const List = model('List', listSchema);
export type List = mongoose.InferSchemaType<typeof listSchema>;