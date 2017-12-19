import mongoose from 'mongoose';
import { Schema } from 'mongoose';
 
 const ProductSchema = new Schema({
    name: String,
    brand: String,
    price: Number,
    reviews: Number,
    lastModifiedDate: Date
 });
 
 export default mongoose.model('Product', ProductSchema);