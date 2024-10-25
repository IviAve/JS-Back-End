import { Router } from "express";
import itemService from "../services/itemService.js";
//import castService from "../services/castService.js";
import { isAuth } from "../middlewares/userMiddleware.js";
import { checkOwner, checkNotOwner} from '../middlewares/ownerMiddleware.js'
import { getErrorMessage } from "../utils/errorUtil.js";

const router = Router();

//from author
router.get('/catalog', async (req, res) => {
    const  items = await itemService.getAll().lean();
    res.render('items/catalog', { items ,title: 'Catalog Page'});  // title must be change for every project
});

router.get('/create', isAuth, (req, res) => {
    res.render('items/create', {title: 'Create Page '}) // title must be change for every project 
});

router.post('/create',isAuth, async (req, res) => {
    const itemData = req.body;
    const ownerId = req.user?._id;

    try{
        await itemService.create(itemData, ownerId);
    } catch (err) {
        const errorMessage = getErrorMessage(err);

        return res.render('items/create', { error: errorMessage, item: itemData ,title: 'Create Page'}); // title must be change for every project
    }
    

    res.redirect('/items/catalog');
});

// router.get('/search', async (req, res) => {
//     const query = req.query; //in papzov demo query == filter
//     const items = await itemService.getAll(query).sort({ year: "desc" }).lean();
//     //const movies = await movieService.getAll(query).lean(); Papazov demo

//     res.render('home', { isSearch: true, items, query , title: 'Search Page});  // title must be change for every project
// });
router.get('/search', async (req, res) => {
    const query = req.query;

    try {
        const items = await itemService.getAll(query).lean();
    
        res.render('items/search', { items, query, title: 'Search Page' });  // title must be change for every project
    } catch (error) {
        return res.render('items/search', { error: getErrorMessage(error), title: 'Search Page'});  // title must be change for every project
    }
});
//try catch 
// router.get('/search', async (req, res) => {
//     const query = req.query;

//     try {
//         const items = await itemService.getAll(query).lean();
    
//         res.render('item/search', { items, query, title: 'Search Page' });  // title must be change for every project
//     } catch (error) {
//         return res.render('item/search', { error: createErrorMsg(error), title: 'Search Page'});   // title must be change for every project
//     }
// });

// router.get('/:itemId/details', async (req, res) => {
//     const itemId = req.params.itemId;

//     const item = await itemService.getById(itemId).lean();

//     const isOwner = item.owner && item.owner.toString() === req.user?._id;

//     res.render('items/details', { item, isOwner ,title: 'Details Page'});    //title must be change for every project
// });

//with try catch 
router.get('/:itemId/details', async (req, res) => {
    const itemId = req.params.itemId;
    const userId = req.user?._id;

    try {
        const item = await itemService.getById(itemId).lean();
        const isOwner = item.owner && item.owner == req.user?._id;
        const isLiked = !!(await itemService.checkIsLiked(itemId, userId));
    
        res.render('items/details', { item, isOwner, isLiked, title: 'Details Page' });   // title must be change for every project
    } catch (error) {
        return res.render('items/details',  { error: getErrorMessage(error), title: 'Details Page' });   // title must be change for every project
    }
});



router.get('/:itemId/delete', isAuth,checkOwner, async (req, res) => {
    const itemId = req.params.itemId;

    const item = await itemService.remove(itemId).lean();
if(item.owner?.toString() !== req.user._id) {
     // return res.render('items/details', { movie, title: 'Details Page', isOwner: false, error: 'You cannot delete this item!' });  // title must be change for every project
     res.setError('You cannot delete this item!');
     return res.redirect('/404');
}

await itemService.remove(itemId);

    res.redirect('/items/catalog');
});

//with try catch 
// router.get('/:itemId/delete', isAuth, checkOwner, async (req, res) => {
//     const itemId = req.params.itemId;

//     try {
//         await itemService.remove(itemId);
    
//         res.redirect('/items/catalog');
//     } catch (error) {
//         return res.render('items/details', { error: getErrorMessage(error), title: 'Details Page' });  //title  must be change for every project
//     }
// });





// router.get('/:itemId/edit', isAuth, async (req, res) => {
//     const itemId = req.params.itemId;
//     const item = await itemService.getById(itemId).lean();

//     res.render('items/edit', { item, title: 'Edit Page' });  //title  must be change for every project
// });

//try catch 
router.get('/:itemId/edit', isAuth, checkOwner, async (req, res) => {
    const itemId = req.params.itemId;

    try {
        const item = await itemService.getById(itemId).lean();
    
        res.render('items/edit', { item, title: 'Edit Page' });  // title must be change for every project
    } catch (error) {
        return res.render('items/edit', { error: getErrorMessage(error),title: 'Edit Page' });  // title must be change for every project
    }
});

router.post('/:itemId/edit', isAuth,checkOwner, async (req, res) => {
    const itemData = req.body;
    const itemId = req.params.itemId;

    try{
        await itemService.edit(itemId, itemData);
    }catch (err){
        const errMsg = getErrorMessage(err)

        return res.render('items/edit', { error: errMsg, item: itemData ,title: 'Edit Page'}) // title must be change for every project
    }
    

    res.redirect(`/items/${itemId}/details`);
});

//by Ts
// router.post('/:itemId/edit', isAuth, checkOwner, async (req, res) => {
//     const itemId = req.params.itemId;
//     const item = req.body;

//     try {
//         await itemService.edit(itemId, item);
    
//         res.redirect(`/items/${itemId}/details`);
//     } catch (error) {
//         return res.render('items/edit',  { item, error: getErrorMessage(error) , title: 'Edit Page' }); // title must be change for every project
//     }
// });


// Deprecated  form papazov demo
// function toArray(documents) {
//     return documents.map(document => document.toObject());
// }

router.get('/:itemId/like', isAuth, checkNotOwner, async (req, res) => {
    const itemId = req.params.itemId;
    const userId = req.user?._id;

    try {
        await itemService.like(itemId, userId);

        res.redirect(`/items/${itemId}/details`);
    } catch (error) {
        return res.render(`items/details`, { error: getErrorMessage(error), title: 'Details Page' }); // title must be change for every project
    }
});

export default router;