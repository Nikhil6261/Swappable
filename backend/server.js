import App from './src/App.js'
import dotenv from 'dotenv'

import mysql from './src/model/db.js'
dotenv.config()

App.listen( process.env.PORT , ()=>{
    console.log(`server start on  ${process.env.PORT}`);
})