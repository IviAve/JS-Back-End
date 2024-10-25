import { Router } from "express";


import userService from "../services/userService.js";
import { getErrorMessage } from '../utils/errorUtil.js';

import {isGuest, isAuth} from "../middlewares/userMiddleware.js"

const router = Router();

router.get('/register', isGuest, (req,res) => {
    res.render('auth/register', { title: 'Register Page' });

});

router.post ('/register', isGuest, async (req, res) => {
    const {username, email, password, rePassword} = req.body;

     // Validate email format using validator library
    // if (!validator.isEmail(email)) {
    //     return res.status(400).end();
    // }

    // Validate if repassword is the same
    // if (password !== rePassword) {
    //     return res.status(400).end();
    // }

    if (rePassword !== password) {
        return res.render('auth/register', {username, email, error: 'Password missmatch!' });
    }
// from papazov
// try{
//     await userService.register(username, email, password, rePassword);
// } catch (error){
//     return res.render('auth/register', {username, email,  error: getErrorMessage(error),  });
// }
    
//     const token = await userService.login(email, password);

//     res.cookie ('auth', token, { httpOnly: true});

//     res.redirect('/');

try {
    await userService.register(username, email, password);

    const token = await userService.login(email, password);
    res.cookie('auth', token, { httpOnly: true });

    res.redirect('/');
} catch (error) {
    return res.render('auth/register', { username, email, error: getErrorMessage(error) });
}

});

router.get('/login', isGuest, (req, res) => {
    res.render('auth/login', {title: 'Login Page'});

});

router.post('/login',isGuest, async (req, res) =>{
    const { email, password} = req.body;
try{
    const token = await userService.login(email, password);

    res.cookie('auth', token, {httpOnly: true });
}catch (error){
    return res.render('auth/login', { email, error: getErrorMessage(error) });
}
    

    res.redirect('/');

});

router.get('/logout',isAuth, (req, res) => {
    res.clearCookie('auth');

    res.redirect('/');

});

export default router;