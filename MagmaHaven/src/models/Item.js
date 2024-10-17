import { Schema, model, Types } from 'mongoose';

const itemSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [2, 'Name should be at least 2 characters long!']
    },
    location: {
        type: String,
        required: [true, 'Location is required!'],
        minLength: [3, 'Location should be at least 2 characters long!']
        
    },
    elevation : {
        type: Number,
        required: [true, 'Elevation is required!'],
        min:[0, 'Elevation must be positive number']
    },
    lastEruption : {
        type: Number,
        required: [true, 'Last eruption is required!'],
        min: [0, 'Year of last eruption must start from zero!'],
        max: [2024, 'Year of last eruption should be between 0 and 2024!'],
        
    },
    imageUrl: {
        type: String,
        required: [true, 'Item image is required!'],
        validate: [/^https?:\/\//, 'Invalid image url!']
    },
    type : {
        type: String,
        required: [true, 'Type is required!'],
        enum: {
            values: ["Supervolcanoes", "Submarine", "Subglacial", "Mud", "Stratovolcanoes", "Shield"],
            message: [true, 'You can only use the ones listed!']
        }
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [10, 'Description should be at least 10 characters long! ']
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