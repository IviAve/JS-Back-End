import itemService from "../services/itemService.js";

const checkOwner = async (req, res, next) => {
    const itemId = req.params.itemId;
    const item = await itemService.getById(itemId);

    if (item.owner == req.user?._id) {
        return next();
    } else {
        return res.render('404', { error: 'You are not authorized for this action!' });
    }
};

const checkNotOwner = async (req, res, next) => {
    const itemId = req.params.itemId;
    const item = await itemService.getById(itemId);

    if (item.owner != req.user?._id) {
        return next();
    } else {
        return res.render('404', { error: 'You are not authorized for this action!' });
    }
};

export {
    checkOwner,
    checkNotOwner
}