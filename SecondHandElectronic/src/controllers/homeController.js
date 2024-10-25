import { Router } from 'express';
import itemService from '../services/itemService.js';
import {getErrorMessage} from '../utils/errorUtil.js'

const router = Router();

//for all items to show in home page

// router.get('/', async (req, res) => {
//     const items = await itemService.getAll().sort({ year: 'desc'}).lean();
//     //const items = await movieService.getAll().lean();  Papazov demo

//     res.render('home', { items, title: 'Home Page' });  //title  must be change for every project
// });



//for about page if is in project

// router.get('/about', (req, res) => {
//     res.render('home/about', {title: 'About Us'});  // title must be change for every project
// });



// for last 3 in home page by ts
router.get('/', async (req, res) => {

    try {
        const items = await itemService.getAll().sort({ dateCreated: -1 }).limit(3).lean();
    
        res.render('home', { items, title: 'Home Page' });  // title must to change for every project
    } catch (error) {
        return res.render('home', { title: 'Home Page', error: getErrorMessage(error) }); //  title must to change for every project
    }
});

// for simple home page without items
// router.get('/', async (req, res) => {

//     res.render('home', { title: 'Home Page' });   // must be change for every project
    
// });

// for profile page if is in project from Ts
// router.get('/profile', async (req, res) => {
//     const userId = req.user?._id;
    
//     try {
//         const createdItems = await itemService.getMyItem(userId).lean();
//         const preferedItems = await itemService.getMyLikes(userId).lean();
        
//         res.render('home/profile', { createdItems, preferedItems, title: 'Profile Page' });   // title  must be change for every project
//     } catch (error) {
//         return res.render('home/profile', { error: getErrorMessage(error), title: 'Profile Page' });  // title must be change for every project
//     }
// });



export default router;