import { connect } from 'mongoose';

import {LocalDB_URL} from './constants.js'




export default async function mongooseInit() {
    try {
        
        await connect(LocalDB_URL, { dbName: 'magma-haven'});
    
        console.log('Successfully connect to DB!');
        
    } catch (error) {
        console.log("Failed to connect to DB!");
        console.log(error.message);

        try {
            await connect(CloudDB_URL, { dbName: 'magma-haven'});
    
            console.log('Successfully connect to cloud DB!');
        } catch (error) {
            console.log("Failed to connect to cloud DB!");
            console.log(error.message);
        }

    };
};
