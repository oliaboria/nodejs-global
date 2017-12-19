import mongoose from 'mongoose';
import { Schema } from 'mongoose';
 
 const CitySchema = new Schema({
     name: {
         type: String
     },
     country: String,
     capital: {
         type: Boolean,
         required: true
     },
     location: {
         lat: Number,
         long: Number
     },
     lastModifiedDate: Date
 });
 
 export default mongoose.model('City', CitySchema);