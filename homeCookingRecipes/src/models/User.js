import { Schema, model } from "mongoose";
import bcript from 'bcrypt';

import { SALT_ROUNDS } from "../config/constants.js";



const userSchema = new Schema({
    username: {
        type:String,
        required: [true, 'Name is required!'],
        minLength: [2, 'Name should be at least 2 characters long!'],
        maxLength: [20, 'Name should be between 2 and 20 characters long!'],
    },
    email: {
        type:String,
        unique: true,
        required: [true, 'Email is required!'],
        minLength: [10, 'Email should be at least 10 characters long!']
    },
    password: {
        type:String,
        required: [true, 'Password is required!'],
        minLength: [4, 'Password should be at least 4 characters long!']
    }
});

// userSchema.virtual('rePassword')
//     .set(function(value) {
//         if (value !== this.password) {
//             throw new Error('Password missmatch!');
//         }
//     });
    
// hash password before save
userSchema.pre ('save', async function () {
    const hash = await bcript.hash(this.password, SALT_ROUNDS);

    this.password = hash;
});

const User = model('User', userSchema);

export default User;