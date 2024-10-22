import { Schema, model, Types } from 'mongoose';

const itemSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [2, 'Name should be at least 2 characters long!']
    },
    category: {
        type: String,
        required: [true, 'Category is required!'],
        minLength: [3, 'Category should be at least 3 characters long!']
        
    },
    color : {
        type: String,
        required: [true, 'Color is required!'],
        minLength:[2, 'Color should be at least 5 characters long!']
    },
    location : {
      type: String,
      required: [true, 'Location is required!'],
      minLength: [5, 'Location should be at least 5 characters long!'],
      maxLength: [15, 'Location should be between 5 and 15 characters long!'],
        
    },
    formula: {
      type: String,
      required: [true, 'Formula is required!'],
      minLength: [3, 'Formula should be at least 3 characters long!'],
      maxLength: [30, 'Formula should be between 3 and 30 characters long!'],
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [10, 'Description should be at least 10 characters long!'],
        //maxLength: [20, 'OperatingSystem should be between 5 and 20 characters long!']
      },
      // cpu: {
      //   type: String,
      //   required: [true, 'Cpu is required!'],
      //   minLength: [10, 'Cpu should be at least 10 characters long!'],
      //   maxLength: [50, 'Cpu should be between 10 and 50 characters long!']
      // },
      // gpu: {
      //   type: String,
      //   required: [true, 'Gpu is required!'],
      //   minLength: [10, 'Gpu should be at least 10 characters long!'],
      //   maxLength: [50, 'Gpu should be between 10 and 50 characters long!']
      // },
      // price: {
      //   type: Number,
      //   required: [true, 'Price is required!'],
      //   min: [0, 'Price must be positive number']
      // },
      // color: {
      //   type: String,
      //   required: [true, 'Color is required!'],
      //   minLength: [2, 'Color should be at least 2 characters long!'],
      //   maxLength: [10, 'Color should be no more than 10 characters long!']
    
      // },
      // weight: {
      //   type: String,
      //   required: [true, 'Weight is required!'],
      //   minLength: [1, 'Weight must be at least 1 character long!']
      // },

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