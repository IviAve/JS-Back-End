import { Router } from 'express';
//import itemService from '../services/itemService.js';

const router = Router();

//for all items to show in home page

// router.get('/', async (req, res) => {
//     const items = await itemService.getAll().sort({ year: 'desc'}).lean();
//     //const movies = await movieService.getAll().lean();  Papazov demo

//     res.render('home', { items });
// });

//for last three results from db from author solve

// router.get('/', async (req, res) => {
//     let getTop = await devicesServices.getTopThree().lean();
//     res.render('home', { getTop });
// });



//how to catch error in get with promise from gpt

// router.get('/', async (req, res) => {
//     try {
//         // Attempt to fetch movies and sort them by year in descending order
//         const movies = await movieService.getAll().sort({ year: 'desc' }).lean();

//         // Render the home page with the fetched movies
//         res.render('home', { movies });
//     } catch (error) {
//         // Log the error for debugging
//         console.error('Error fetching movies or rendering home page:', error);

//         // Send an appropriate error response
//         res.status(500).send('An error occurred while loading the home page.');
//     }
// });


//for about page if is in project

// router.get('/about', (req, res) => {
//     res.render('home/about');
// });

router.get('/', async (req, res) => {

    res.render('home', { title: 'Home Page' });  
    
});

export default router;