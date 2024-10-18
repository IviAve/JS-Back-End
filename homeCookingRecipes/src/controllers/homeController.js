import { Router } from 'express';
import { getErrorMessage } from '../utils/errorUtil.js';
import itemService from '../services/itemService.js';

const router = Router();

//for all items to show in home page

// router.get('/', async (req, res) => {
//     const items = await itemService.getAll().sort({ year: 'desc'}).lean();
//     //const items = await movieService.getAll().lean();  Papazov demo

//     res.render('home', { items });
// });

//for last three results from db from author solve

// from author solve for last three results 
// exports.getTopThree = () => Devices.find().sort({createdAt: -1}).limit(3);
//for last 3 items in home page by ts
// router.get('/', async (req, res) => {
//     let getTop = await devicesServices.getTopThree().lean();
//     res.render('home', { getTop });
// });






//for about page if is in project

// router.get('/about', (req, res) => {
//     res.render('home/about');
// });

// for clear home page by ts
// router.get('/', async (req, res) => {

//     res.render('home', { title: 'Home Page' });  
    
// });


// for last 3 in home page by ts
router.get('/', async (req, res) => {

    try {
        const items = await itemService.getAll().sort({ dateCreated: -1 }).limit(3).lean();
    
        res.render('home', { items, title: 'Home Cooking Recipes' });  
    } catch (error) {
        return res.render('home', { title: 'Home Cooking Recipes', error: getErrorMessage(error) });
    }
});

export default router;