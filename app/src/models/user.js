import mongoose from 'mongoose';
import { Schema } from 'mongoose';
 
 const UserSchema = new Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    lastModifiedDate: Date
 });
 
 export default mongoose.model('User', UserSchema);