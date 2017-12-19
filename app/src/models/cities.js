import mongoose from 'mongoose';
import { Schema } from 'mongoose';
 
 const CitySchema = new Schema({
     name: {
         type: String
     },
     country: String,
     capital: Boolean,
     location: {
         lat: Number,
         long: Number
     }
 });
 
 export default mongoose.model('City', CitySchema);