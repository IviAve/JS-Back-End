import Item from "../models/Item.js";

// TODO: Filter in db not in memory

const getAll = (query = {}) => {
    let items = Item.find();
    
    // if (query.search) {
    //     items.find({ title: { $regex: query.search, $options: 'i' } });
    //     // movies.regex('title', new RegExp(query.search, 'i'))
    // };

    // if (query.genre) {
    //     items.find({ genre: { $regex: query.genre, $options: 'i' } });
    //     // movies.where('genre').equals(query.genre.toLowerCase())
    // };

    // if (query.year) {
    //     items.find({ year: query.year });
    //      // movies.where('year').equals(query.year);
    // };

    //search type = name of 
    if (query.name) {
        items.find({ name: { $regex: query.name, $options: 'i' } });
    };

    if (query.paymentMethod) {
        items.find({ paymentMethod: query.paymentMethod });
    };


    return items;
};
// from author solve for last three results 
// exports.getTopThree = () => Devices.find().sort({createdAt: -1}).limit(3);
const create = (item, ownerId) => Item.create({...item, owner: ownerId});

const getById = (itemId) => Item.findById(itemId).populate('usersList.user'); //must change for every project from relation from item.js

// if is attach in project
// const attach = (movieId, castId, characterName) => {

//     // const movie = await Movie.findById(movieId);
//     // movie.casts.push(castId);
//     // return movie.save();

//     return Item.findByIdAndUpdate(movieId, { $push: { casts: { cast: castId, characterName } } });
// };

const remove = (itemId) => Item.findByIdAndDelete(itemId);

const edit = (itemId, data) => Item.findByIdAndUpdate(itemId, data, { runValidators: true }); // ,{runValidators: true}

const getMyItem = (userId) => Item.find({ owner: userId });

const like = (itemId, userId) => Item.findByIdAndUpdate(itemId, { $push: { usersList: { user: userId } } });

const checkIsLiked = (itemId, userId) => Item.findOne({ _id: itemId, usersList: { $elemMatch: { user: userId } } });

const getMyLikes = userId => Item.find({ usersList: { $elemMatch: { user: userId } } });

export default {
    getAll,
    create,
    getById,
    remove,
    edit,
    getMyItem,
    like,
    checkIsLiked,
    getMyLikes,
};