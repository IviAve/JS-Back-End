import { Router } from 'express';
import itemService from '../services/itemService.js';
import {getErrorMessage} from '../utils/errorUtil.js'

const router = Router();

//for all items to show in home page

// router.get('/', async (req, res) => {
//     const items = await itemService.getAll().sort({ year: 'desc'}).lean();
//     //const items = await movieService.getAll().lean();  Papazov demo

//     res.render('home', { items });
// });



//for about page if is in project

// router.get('/about', (req, res) => {
//     res.render('home/about', {title: 'About Us'});
// });



// for last 3 in home page by ts
router.get('/', async (req, res) => {

    try {
        const items = await itemService.getAll().sort({ dateCreated: -1 }).limit(3).lean();
    
        res.render('home', { items, title: 'Home Page' });  // to change for every project
    } catch (error) {
        return res.render('home', { title: 'Home Page', error: getErrorMessage(error) }); // to change for every project
    }
});

// for simple home page without items
// router.get('/', async (req, res) => {

//     res.render('home', { title: 'Home Page' });  
    
// });

// for profile page if is in project from Ts
// router.get('/profile', async (req, res) => {
//     const userId = req.user?._id;
    
//     try {
//         const createdItems = await itemService.getMyItem(userId).lean();
//         const preferedItems = await itemService.getMyLikes(userId).lean();
        
//         res.render('home/profile', { createdItems, preferedItems, title: 'Profile Page' });
//     } catch (error) {
//         return res.render('home/profile', { error: getErrorMessage(error) });
//     }
// });



export default router;