import handlebars from 'express-handlebars';
import rating from '../helpers/helpers.js';

export default function handlebarsInit (app) {
    app.engine('hbs', handlebars.engine({
        extname: 'hbs',
        helpers: rating
    }));
    app.set('view engine', 'hbs');
    app.set('views', './src/views');
};