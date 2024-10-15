import { Router } from 'express';
import homeController from './controllers/homeController.js';
import itemControler from './controllers/itemController.js';
//import castController from './controllers/castController.js';
import userController from './controllers/userController.js'
//import { isAuth } from './middlewares/userMiddleware.js';

const router = Router();

router.use(homeController);
router.use('/items', itemControler);
//router.use('/casts',isAuth, castController);
router.use('/auth', userController)

router.use('*', (req, res) => {
    res.render('404', { title: '404 Page - Gaming Team'});
})

export default router;