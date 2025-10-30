import express from 'express'
import { login, register } from '../controller/BasicController.js';


const Router = express.Router()


Router.get('/home' , (req,res)=>{
    res.status(201).send("heelo hero");
    
})

Router.post('/login' , login)
Router.post('/register' , register)





export default Router