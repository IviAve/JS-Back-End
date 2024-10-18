import { Schema, model, Types } from 'mongoose';

const itemSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required!'],
        minLength: [2, 'Title should be at least 2 characters long!']
    },
    ingredients: {
        type: String,
        required: [true, 'Ingredients is required!'],
        minLength: [10, 'Ingredients should be at least 10 characters long!'],
        maxLength: [200, 'Ingredients should be between 10 and 200 characters!'],
    },
    instructions : {
        type: String,
        required: [true, 'Instructions is required!'],
        minLength:[10, 'Instructions should be at least 10 characters long!']
    },
    description : {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [10, 'Description must start from 10 characters!'],
        maxLength: [100, 'Descriptions should be between 10 and 100 characters!'],
        
    },
    imageUrl: {
        type: String,
        required: [true, 'Item image is required!'],
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