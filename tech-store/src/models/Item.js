import { Schema, model, Types } from 'mongoose';

const itemSchema = new Schema({
    brand: {
        type: String,
        required: [true, 'Brand is required!'],
        minLength: [2, 'Brand should be at least 2 characters long!']
    },
    model: {
        type: String,
        required: [true, 'Model is required!'],
        minLength: [5, 'Model should be at least 5 characters long!']
        
    },
    hardDisk : {
        type: String,
        required: [true, 'Harddisk is required!'],
        minLength:[5, 'Harddisk shuld be at least 5 characters long!']
    },
    screenSize : {
      type: String,
      required: [true, 'Screen size is required!'],
      minLength: [1, 'Screen size should be at least 1 characters long!']
        
    },
    ram: {
      type: String,
      required: [true, 'Ram is required!'],
      minLength: [2, 'Ram should be at least 2 characters long!']
    },
    operatingSystem: {
        type: String,
        required: [true, 'OperatingSystem is required!'],
        minLength: [5, 'OperatingSystem should be at least 5 characters long!'],
        maxLength: [20, 'OperatingSystem should be between 5 and 20 characters long!']
      },
      cpu: {
        type: String,
        required: [true, 'Cpu is required!'],
        minLength: [10, 'Cpu should be at least 10 characters long!'],
        maxLength: [50, 'Cpu should be between 10 and 50 characters long!']
      },
      gpu: {
        type: String,
        required: [true, 'Gpu is required!'],
        minLength: [10, 'Gpu should be at least 10 characters long!'],
        maxLength: [50, 'Gpu should be between 10 and 50 characters long!']
      },
      price: {
        type: Number,
        required: [true, 'Price is required!'],
        min: [0, 'Price must be positive number']
      },
      color: {
        type: String,
        required: [true, 'Color is required!'],
        minLength: [2, 'Color should be at least 2 characters long!'],
        maxLength: [10, 'Color should be no more than 10 characters long!']
    
      },
      weight: {
        type: String,
        required: [true, 'Weight is required!'],
        minLength: [1, 'Weight must be at least 1 character long!']
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