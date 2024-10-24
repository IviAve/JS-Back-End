import express from 'express';

import cookieParser from 'cookie-parser';
import {userMiddleware} from '../middlewares/userMiddleware.js';

import session from 'express-session';
import { tempData } from '../middlewares/tempDataMiddleware.js';


export default function expressInit(app) {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static('static'));
    app.use(cookieParser());
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    }))
    app.use(userMiddleware)
    app.use(tempData);
    
};