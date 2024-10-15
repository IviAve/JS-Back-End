import { Schema, model, Types } from 'mongoose';

const itemSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [4, 'Name should be at least 4 characters long!']
    },
    price: {
        type: Number,
        required: [true, 'Price is required!'],
        min: [0, 'Price must be a positive number!']
    },
    description : {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [10, 'Description should be at least 10 characters long!']
    },
    genre : {
        type: String,
        required: [true, 'Genre is required!'],
        minLength: [2, 'Genre should be at least 2 characters long!']
    },
    platform : {
        type: String,
        required: [true, 'Platform is required!'],
        enum: {
            values: ["PC", "Nintendo", "PS4", "PS5", "XBOX"],
            message: [true, 'You can only use the ones listed!']
        }
    },
    imageUrl: {
        type: String,
        required: [true, 'Game image is required!'],
        validate: [/^https?:\/\//, 'Invalid image url!']
    },
    usersList: [{
        user: {
            type: Types.ObjectId,
            ref: 'User'
        }
    }],
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

const Item = model('Item', itemSchema);

export default Item;